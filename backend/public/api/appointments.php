<?php
declare(strict_types=1);
require __DIR__ . '/../../lib.php';
cors();
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') out(405, ['error' => 'method']);

try {
    $d = json_decode($_POST['data'] ?? '', true);
    if (!is_array($d)) out(400, ['error' => 'invalid']);
    $s = fn(string $k, int $m): string => mb_substr(trim((string)($d[$k] ?? '')), 0, $m);

    $name = $s('name', 120); $phone = $s('phone', 30); $email = $s('email', 190);
    $exam = $s('exam', 60); $case = $s('caseText', 4000); $comments = $s('comments', 1000);
    $lang = in_array($d['contactLang'] ?? '', ['fr', 'ar', 'en'], true) ? $d['contactLang'] : 'fr';
    $date = preg_match('/^\d{4}-\d{2}-\d{2}$/', $s('date', 10)) ? $s('date', 10) : null;
    $time = preg_match('/^\d{2}:\d{2}$/', $s('time', 5)) ? $s('time', 5) : null;

    if ($name === '' || !preg_match('/^[+\d\s().-]{8,30}$/', $phone) || $exam === '' || $case === '' || empty($d['consent'])) out(422, ['error' => 'validation']);
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) out(422, ['error' => 'validation']);

    // Anti-abus : 5 demandes / heure / IP (l'IP n'est jamais stockée en clair)
    $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . env('APP_SALT', 'change-me'));
    $c = db()->prepare('SELECT COUNT(*) FROM appointment_requests WHERE ip_hash = ? AND created_at > (NOW() - INTERVAL 1 HOUR)');
    $c->execute([$ip]);
    if ((int)$c->fetchColumn() >= 5) out(429, ['error' => 'rate']);

    // Pièce jointe : PDF/JPG/PNG, 5 Mo max, type vérifié, nom aléatoire, stockée hors du dossier public
    $stored = null; $orig = null;
    if (!empty($_FILES['file']) && $_FILES['file']['error'] !== UPLOAD_ERR_NO_FILE) {
        $f = $_FILES['file'];
        if ($f['error'] !== UPLOAD_ERR_OK || $f['size'] > 5 * 1024 * 1024) out(422, ['error' => 'file']);
        $mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
        $ext = ['application/pdf' => 'pdf', 'image/jpeg' => 'jpg', 'image/png' => 'png'][$mime] ?? null;
        if (!$ext) out(422, ['error' => 'file']);
        $dir = __DIR__ . '/../../storage/uploads';
        if (!is_dir($dir)) mkdir($dir, 0750, true);
        $stored = bin2hex(random_bytes(16)) . '.' . $ext;
        if (!move_uploaded_file($f['tmp_name'], "$dir/$stored")) out(500, ['error' => 'server']);
        $orig = mb_substr((string)preg_replace('/[^\w.\- ]/u', '_', $f['name']), 0, 120);
    }

    $ref = strtoupper(bin2hex(random_bytes(4)));
    db()->prepare('INSERT INTO appointment_requests
        (ref,name,phone,email,contact_lang,exam,case_text,has_prescription,had_before,pref_date,pref_time,comments,file_stored,file_original,consent_at,ip_hash)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),?)')
      ->execute([$ref, $name, $phone, $email ?: null, $lang, $exam, $case, !empty($d['hasPrescription']) ? 1 : 0, !empty($d['hadBefore']) ? 1 : 0, $date, $time, $comments ?: null, $stored, $orig, $ip]);

    // TODO notifications : e-mail / WhatsApp au centre (brancher ici, sans y mettre de données médicales)
    out(201, ['ref' => $ref, 'status' => 'pending']);
} catch (Throwable $e) {
    error_log('appointments: ' . get_class($e)); // pas de données patient dans les logs
    out(500, ['error' => 'server']);
}
