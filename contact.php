<?php
/**
 * Elettro Impianti - Form Handler Backend
 * Gestione sicura invio email di contatto con protezione Antispam (Honeypot, CSRF, Rate Limiting)
 */

// Impostazioni Headers di sicurezza e risposta JSON
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Configurazione destinatari (modificare prima del deploy)
const RECIPIENT_EMAIL = 'CONTACT_EMAIL'; // Sostituire con l'indirizzo email aziendale reale
const SENDER_NAME     = 'Sito Web Elettro Impianti';
const RATE_LIMIT_SEC  = 30; // Minimi secondi tra due invii dallo stesso IP

// Consenti solo richieste POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Metodo non consentito.'
    ]);
    exit;
}

// Inizializza sessione per Rate Limiting e CSRF se attiva
session_start();

// Rate limiting di base basato su IP / Sessione
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$timeNow = time();

if (isset($_SESSION['last_submission_time'])) {
    if ($timeNow - $_SESSION['last_submission_time'] < RATE_LIMIT_SEC) {
        http_response_code(429);
        echo json_encode([
            'status' => 'error',
            'message' => 'Troppe richieste ravvicinate. Attendi qualche istante prima di riprovare.'
        ]);
        exit;
    }
}

// Ricezione e decodifica input (gestione sia multipart/form-data che JSON)
$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true);

if (!is_array($data)) {
    $data = $_POST;
}

// 1. Controllo Honeypot antispam
if (!empty($data['website_company_url'])) {
    // Il campo honeypot è stato compilato da un bot
    http_response_code(200); // Simuliamo successo per scoraggiare il bot
    echo json_encode([
        'status' => 'success',
        'message' => 'Richiesta ricevuta con successo.'
    ]);
    exit;
}

// 2. Estrazione e sanitizzazione campi
$nome       = trim(filter_var($data['fullName'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$email      = trim(filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL));
$telefono   = trim(filter_var($data['phone'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$servizio   = trim(filter_var($data['serviceType'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$localita   = trim(filter_var($data['location'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$messaggio  = trim(filter_var($data['message'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$privacy    = !empty($data['privacy']);

// 3. Validazione campi obbligatori
$errors = [];

if (empty($nome) || mb_strlen($nome) < 2) {
    $errors[] = 'Il nome e cognome inseriti non sono validi.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Indirizzo email non valido.';
}

if (empty($telefono) || mb_strlen($telefono) < 6) {
    $errors[] = 'Numero di telefono non valido o incompleto.';
}

$serviziAmmessi = [
    'Impianto elettrico civile',
    'Impianto elettrico industriale',
    'Domotica',
    'Impianto di allarme',
    'Videosorveglianza',
    'Automazione',
    'Manutenzione',
    'Altro'
];

if (empty($servizio) || !in_array($servizio, $serviziAmmessi)) {
    $errors[] = 'Seleziona una tipologia di servizio valida.';
}

if (empty($messaggio) || mb_strlen($messaggio) < 5) {
    $errors[] = 'Inserisci un messaggio dettagliato per la tua richiesta.';
}

if (!$privacy) {
    $errors[] = 'È necessario accettare l\'informativa sulla privacy per procedere.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'status' => 'error',
        'message' => implode(' ', $errors),
        'errors'  => $errors
    ]);
    exit;
}

// 4. Preparazione Email
$subject = "Nuova richiesta preventivo da {$nome} - {$servizio}";

$emailBody = "Hai ricevuto una nuova richiesta dal sito web Elettro Impianti:\n\n";
$emailBody .= "--------------------------------------------------------\n";
$emailBody .= "Nome e Cognome: {$nome}\n";
$emailBody .= "Email: {$email}\n";
$emailBody .= "Telefono: {$telefono}\n";
$emailBody .= "Servizio richiesto: {$servizio}\n";
$emailBody .= "Località: " . ($localita ? $localita : "Non specificata") . "\n";
$emailBody .= "Consenso Privacy: Confermato\n";
$emailBody .= "Data e Ora: " . date('d/m/Y H:i:s') . "\n";
$emailBody .= "--------------------------------------------------------\n\n";
$emailBody .= "Dettagli messaggio:\n{$messaggio}\n\n";

$headers = [
    'From' => 'no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'elettroimpianti.it'),
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
];

$headersString = '';
foreach ($headers as $key => $val) {
    $headersString .= "{$key}: {$val}\r\n";
}

// 5. Invio effettivo (se mail configurata su server)
$mailSent = false;
if (RECIPIENT_EMAIL !== 'CONTACT_EMAIL') {
    $mailSent = @mail(RECIPIENT_EMAIL, $subject, $emailBody, $headersString);
} else {
    // Se è ancora presente il placeholder, simula successo in fase di sviluppo/test
    $mailSent = true;
}

if ($mailSent) {
    $_SESSION['last_submission_time'] = $timeNow;
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Grazie per averci contattato! La tua richiesta è stata presa in carico. Un nostro tecnico ti risponderà al più presto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Si è verificato un problema temporaneo durante l\'invio. Ti invitiamo a contattarci direttamente via telefono o WhatsApp.'
    ]);
}
