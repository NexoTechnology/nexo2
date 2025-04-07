<?php
// backend/login.php o msm do resto 
session_start();
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_usuario = $_POST["nome_usuario"] ?? '';
    $senha = $_POST["senha"] ?? '';

    if (empty($nome_usuario) || empty($senha)) {
        echo json_encode(["status" => "erro", "mensagem" => "Nome de usuário e senha são obrigatórios."]);
        exit;
    }

    $host = "localhost";
    $dbname = "seu_banco_de_dados";
    $username = "seu_usuario";
    $password = "sua_senha";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("SELECT id, nome_usuario, senha_hash, nivel_acesso FROM usuarios WHERE nome_usuario = ?");
        $stmt->execute([$nome_usuario]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($senha, $usuario['senha_hash'])) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['nome_usuario'] = $usuario['nome_usuario'];
            $_SESSION['nivel_acesso'] = $usuario['nivel_acesso'];
            echo json_encode(["status" => "sucesso", "mensagem" => "Login realizado com sucesso!"]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => "Credenciais inválidas."]);
        }

    } catch (PDOException $e) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao logar: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["status" => "erro", "mensagem" => "Requisição inválida."]);
}
?>