<?php
// backend/admin/usuarios.php mais do msm so que mais
session_start();
if (!isset($_SESSION['nivel_acesso']) || $_SESSION['nivel_acesso'] !== 'admin') {
    header('HTTP/1.1 403 Forbidden');
    echo "Acesso negado.";
    exit;
}

$host = "localhost";
$dbname = "seu_banco_de_dados";
$username = "seu_usuario";
$password = "sua_senha";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro de conexão com o banco de dados: " . $e->getMessage();
    exit;
}

// ex básico de listagem de usuários (eu vou precisar completar com CRUD e interface HTML)
$stmt = $pdo->query("SELECT id, nome_usuario, email, data_cadastro, nivel_acesso FROM usuarios");
$usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($usuarios); // Retorna lista de usuários como JSON para o frontend admin
exit;

// ... (Restante do código para CRUD de usuários no painel admin - criar, editar, deletar, formulários HTML, processamento de requisições, etc.) ...
?>