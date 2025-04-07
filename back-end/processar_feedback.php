<?php
// backend/processar_feedback.php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["feedback-name"] ?? '';
    $avaliacao = $_POST["feedback-rating"] ?? '';
    $comentario = $_POST["feedback-comment"] ?? '';

    if (empty($nome) || empty($comentario)) {
        echo json_encode(["status" => "erro", "mensagem" => "Nome e comentário são obrigatórios."]);
        exit;
    }

    $nome = htmlspecialchars($nome);
    $comentario = htmlspecialchars($comentario);
    $avaliacao = intval($avaliacao);

    $host = "localhost";
    $dbname = "seu_banco_de_dados";
    $username = "seu_usuario";
    $password = "sua_senha";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO feedback (nome, avaliacao, comentario) VALUES (?, ?, ?)");
        $stmt->execute([$nome, $avaliacao, $comentario]);

        echo json_encode(["status" => "sucesso", "mensagem" => "Feedback enviado com sucesso!"]);

    } catch (PDOException $e) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao salvar o feedback: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["status" => "erro", "mensagem" => "Requisição inválida."]);
}
?>