<?php
declare(strict_types=1);
require __DIR__ . '/../../lib.php';
start_admin_session();
if (empty($_SESSION['admin'])) { http_response_code(403); exit; }
$q = db()->prepare('SELECT file_stored, file_original FROM appointment_requests WHERE id = ?');
$q->execute([(int)($_GET['id'] ?? 0)]); $r = $q->fetch();
if (!$r || !$r['file_stored']) { http_response_code(404); exit; }
$p = __DIR__ . '/../../storage/uploads/' . basename($r['file_stored']);
if (!is_file($p)) { http_response_code(404); exit; }
header('Content-Type: ' . (new finfo(FILEINFO_MIME_TYPE))->file($p));
header('X-Content-Type-Options: nosniff'); header('Cache-Control: no-store');
header('Content-Disposition: attachment; filename="' . addslashes(basename($r['file_original'] ?: 'document')) . '"');
readfile($p);
