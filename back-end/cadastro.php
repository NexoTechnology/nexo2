<?php
// backend/cadastro.php salvar pra uso futuro
session_start();
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_usuario = $_POST["nome_usuario"] ?? '';
    $email = $_POST["email"] ?? '';
    $senha = $_POST["senha"] ?? '';

    if (empty($nome_usuario) || empty($email) || empty($senha)) {
        echo json_encode(["status" => "erro", "mensagem" => "Todos os campos são obrigatórios."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "erro", "mensagem" => "Email inválido."]);
        exit;
    }

    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    $host = "localhost";
    $dbname = "seu_banco_de_dados";
    $username = "seu_usuario";
    $password = "sua_senha";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt_check = $pdo->prepare("SELECT id FROM usuarios WHERE nome_usuario = ? OR email = ?");
        $stmt_check->execute([$nome_usuario, $email]);
        if ($stmt_check->rowCount() > 0) {
            echo json_encode(["status" => "erro", "mensagem" => "Nome de usuário ou email já cadastrados."]);
            exit;
        }

        $stmt_insert = $pdo->prepare("INSERT INTO usuarios (nome_usuario, email, senha_hash) VALUES (?, ?, ?)");
        $stmt_insert->execute([$nome_usuario, $email, $senha_hash]);

        echo json_encode(["status" => "sucesso", "mensagem" => "Cadastro realizado com sucesso!"]);

    } catch (PDOException $e) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["status" => "erro", "mensagem" => "Requisição inválida."]);
}
?>