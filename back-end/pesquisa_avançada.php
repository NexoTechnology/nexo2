<?php
// backend/buscar_avancado.php usar futuramente tlg
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['termo_busca'])) {
    $termo_busca = $_GET['termo_busca'];
    $termo_busca = htmlspecialchars($termo_busca);

    $host = "localhost";
    $dbname = "seu_banco_de_dados";
    $username = "seu_usuario";
    $password = "sua_senha";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("SELECT id, titulo, conteudo FROM blog_posts WHERE MATCH (titulo, conteudo) AGAINST (? IN BOOLEAN MODE)");
        $stmt->execute([$termo_busca]);
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => "sucesso", "resultados" => $resultados]);

    } catch (PDOException $e) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na busca: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["status" => "erro", "mensagem" => "Requisição inválida."]);
}
?>