<?php
// Usage : php create_admin.php email@exemple.com "mot de passe (10 caractères min.)"
if (PHP_SAPI !== 'cli') exit;
require __DIR__ . '/lib.php';
[$_, $e, $p] = $argv + [null, null, null];
if (!$e || !$p || strlen($p) < 10) { fwrite(STDERR, "Usage: php create_admin.php email motdepasse(10+ caractères)\n"); exit(1); }
db()->prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)')->execute([$e, password_hash($p, PASSWORD_DEFAULT)]);
echo "Admin créé.\n";
