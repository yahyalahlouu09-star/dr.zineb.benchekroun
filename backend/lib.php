<?php
declare(strict_types=1);

function env(string $k, ?string $d = null): ?string {
    static $e = null;
    if ($e === null) {
        $e = [];
        $f = __DIR__ . '/.env';
        if (is_file($f)) {
            foreach (file($f, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $l) {
                $l = trim($l);
                if ($l === '' || $l[0] === '#' || !str_contains($l, '=')) continue;
                [$a, $b] = explode('=', $l, 2);
                $e[trim($a)] = trim($b, " \"'");
            }
        }
    }
    return $e[$k] ?? (getenv($k) ?: $d);
}

function db(): PDO {
    static $p = null;
    if ($p) return $p;
    $p = new PDO(
        sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', env('DB_HOST', '127.0.0.1'), env('DB_PORT', '3306'), env('DB_NAME', 'benchekroun')),
        env('DB_USER', 'root'), env('DB_PASS', ''),
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false]
    );
    return $p;
}

function out(int $code, array $d): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($d, JSON_UNESCAPED_UNICODE);
    exit;
}

function cors(): void {
    $o = $_SERVER['HTTP_ORIGIN'] ?? '';
    $ok = array_map('trim', explode(',', env('ALLOWED_ORIGINS', 'http://localhost:5173')));
    if ($o && in_array($o, $ok, true)) { header("Access-Control-Allow-Origin: $o"); header('Vary: Origin'); }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }
}

function start_admin_session(): void {
    session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict', 'secure' => !empty($_SERVER['HTTPS'])]);
    session_start();
}
