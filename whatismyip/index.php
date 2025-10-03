<?php
function get_client_ip() {
    $keys = ['HTTP_X_FORWARDED_FOR','HTTP_CLIENT_IP','REMOTE_ADDR'];
    foreach ($keys as $k) {
        if (!empty($_SERVER[$k])) {
            // X_FORWARDED_FOR may contain a list
            $ip = explode(',', $_SERVER[$k])[0];
            return trim($ip);
        }
    }
    return 'unknown';
}
$ip = htmlspecialchars(get_client_ip(), ENT_QUOTES, 'UTF-8');

if (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false) {
    header('Content-Type: application/json');
    echo json_encode(['ip' => $ip]);
    exit;
}
header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Your IP</title></head>
<body>
  <h1>Your IP address</h1>
  <p><strong><?php echo $ip; ?></strong></p>
  <p>Raw: <code><?php echo $ip; ?></code></p>
</body>
</html>
