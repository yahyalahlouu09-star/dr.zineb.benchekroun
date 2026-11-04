<?php
declare(strict_types=1);
require __DIR__ . '/../../lib.php';
start_admin_session();
header('X-Frame-Options: DENY'); header('Cache-Control: no-store');
$h = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
$ST = ['pending' => 'En attente', 'contacted' => 'Contacté', 'confirmed' => 'Confirmé', 'cancelled' => 'Annulé'];
$err = '';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $a = $_POST['a'] ?? '';
    if ($a === 'login') {
        $q = db()->prepare('SELECT * FROM admins WHERE email = ?'); $q->execute([trim($_POST['email'] ?? '')]); $u = $q->fetch();
        if ($u && password_verify($_POST['password'] ?? '', $u['password_hash'])) {
            session_regenerate_id(true); $_SESSION['admin'] = (int)$u['id']; $_SESSION['csrf'] = bin2hex(random_bytes(16));
            header('Location: ./'); exit;
        }
        sleep(1); $err = 'Identifiants invalides';
    } elseif (!empty($_SESSION['admin']) && hash_equals($_SESSION['csrf'], $_POST['csrf'] ?? '')) {
        if ($a === 'logout') { session_destroy(); header('Location: ./'); exit; }
        if ($a === 'update' && isset($ST[$_POST['status'] ?? ''])) {
            $note = mb_substr(trim($_POST['note'] ?? ''), 0, 1000);
            db()->prepare('UPDATE appointment_requests SET status = ?, staff_note = ? WHERE id = ?')->execute([$_POST['status'], $note !== '' ? $note : null, (int)($_POST['id'] ?? 0)]);
            header('Location: ./'); exit;
        }
    }
}
$logged = !empty($_SESSION['admin']);
?><!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin — Centre Benchekroun</title>
<style>body{font:15px/1.5 system-ui,sans-serif;background:#0b0f0d;color:#ece6da;margin:0;padding:24px}h1{font-weight:300;font-size:28px}
.c{border:1px solid #ece6da33;padding:16px;margin:12px 0;max-width:860px}.m{opacity:.6;font-size:12px;letter-spacing:.1em;text-transform:uppercase}
input,select,textarea,button{font:inherit;background:#ffffff10;color:inherit;border:1px solid #ece6da44;padding:8px;border-radius:0}button{cursor:pointer;background:#7fb08a;color:#0b0f0d;border:0;font-weight:600}
a{color:#7fb08a}.p{white-space:pre-wrap}.e{color:#f88}</style></head><body>
<?php if (!$logged): ?>
<h1>Administration</h1>
<form method="post" class="c" style="max-width:340px"><input type="hidden" name="a" value="login">
<p><input name="email" type="email" placeholder="E-mail" required style="width:100%"></p>
<p><input name="password" type="password" placeholder="Mot de passe" required style="width:100%"></p>
<?php if ($err): ?><p class="e"><?= $h($err) ?></p><?php endif; ?><button>Connexion</button></form>
<?php else:
$rows = db()->query('SELECT * FROM appointment_requests ORDER BY created_at DESC LIMIT 200')->fetchAll(); ?>
<form method="post" style="float:right"><input type="hidden" name="a" value="logout"><input type="hidden" name="csrf" value="<?= $h($_SESSION['csrf']) ?>"><button>Déconnexion</button></form>
<h1>Demandes de rendez-vous (<?= count($rows) ?>)</h1>
<p class="m">Ce sont des demandes : rien n'est confirmé tant que le centre n'a pas contacté le patient.</p>
<?php foreach ($rows as $r): ?>
<div class="c"><div class="m">#<?= $h($r['ref']) ?> · <?= $h($r['created_at']) ?> · <?= $h($ST[$r['status']]) ?> · langue : <?= $h($r['contact_lang']) ?></div>
<h2 style="margin:6px 0"><?= $h($r['name']) ?> — <a href="tel:<?= $h($r['phone']) ?>"><?= $h($r['phone']) ?></a></h2>
<?php if ($r['email']): ?><div><?= $h($r['email']) ?></div><?php endif; ?>
<div><b>Examen :</b> <?= $h($r['exam']) ?> · ordonnance : <?= $r['has_prescription'] ? 'oui' : 'non' ?> · déjà fait : <?= $r['had_before'] ? 'oui' : 'non' ?></div>
<div><b>Souhait :</b> <?= $h($r['pref_date'] ?: '—') ?> <?= $h(substr((string)$r['pref_time'], 0, 5)) ?></div>
<p class="p"><?= $h($r['case_text']) ?></p>
<?php if ($r['comments']): ?><p class="p"><i><?= $h($r['comments']) ?></i></p><?php endif; ?>
<?php if ($r['file_stored']): ?><p><a href="file.php?id=<?= (int)$r['id'] ?>">Document : <?= $h($r['file_original']) ?></a></p><?php endif; ?>
<form method="post"><input type="hidden" name="a" value="update"><input type="hidden" name="id" value="<?= (int)$r['id'] ?>"><input type="hidden" name="csrf" value="<?= $h($_SESSION['csrf']) ?>">
<select name="status"><?php foreach ($ST as $k => $v): ?><option value="<?= $k ?>"<?= $k === $r['status'] ? ' selected' : '' ?>><?= $h($v) ?></option><?php endforeach; ?></select>
<input name="note" placeholder="Note interne" value="<?= $h($r['staff_note']) ?>" style="width:50%"> <button>Enregistrer</button></form></div>
<?php endforeach; endif; ?></body></html>
