<?php
// backend/logout.php corrigir pra uso futuro
session_start();
session_destroy();
header('Content-Type: application/json');
echo json_encode(["status" => "sucesso", "mensagem" => "Logout realizado com sucesso!"]);
exit;
?>