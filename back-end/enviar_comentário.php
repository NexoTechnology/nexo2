<?php
// backend/enviar_comentario.php mais do msm
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $post_id = $_POST["post_id"] ?? '';
    $nome_usuario = $_POST["nome_usuario"] ?? '';
    $email_usuario = $_POST["email_usuario"] ?? '';
    $texto_comentario = $_POST["texto_comentario"] ?? '';

    if (empty($texto_comentario)) {
        echo json_encode(["status" => "erro", "mensagem" => "O comentário não pode ser vazio."]);
        exit;
    }

    $post_id = intval($post_id);
    $nome_usuario = htmlspecialchars($nome_usuario);
    $email_usuario = filter_var($email_usuario, FILTER_VALIDATE_EMAIL) ? htmlspecialchars($email_usuario) : null;
    $texto_comentario = htmlspecialchars($texto_comentario);

    $host = "localhost";
    $dbname = "seu_banco_de_dados";
    $username = "seu_usuario";
    $password = "sua_senha";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO comentarios (post_id, nome_usuario, email_usuario, texto_comentario) VALUES (?, ?, ?, ?)");
        $stmt->execute([$post_id, $nome_usuario, $email_usuario, $texto_comentario]);

        echo json_encode(["status" => "sucesso", "mensagem" => "Comentário enviado para moderação."]);

    } catch (PDOException $e) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao enviar comentário: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["status" => "erro", "mensagem" => "Requisição inválida."]);
}
?>