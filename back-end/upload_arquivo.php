<?php
// backend/upload_arquivo.php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["arquivo"])) {
    $arquivo = $_FILES["arquivo"];

    if ($arquivo["error"] == UPLOAD_ERR_OK) {
        $tipo_permitido = ['image/jpeg', 'image/png', 'application/pdf'];
        $extensoes_permitidas = ['jpg', 'jpeg', 'png', 'pdf'];
        $tamanho_maximo = 2 * 1024 * 1024; // 2MB

        $tipo_arquivo = mime_content_type($arquivo["tmp_name"]);
        $extensao_arquivo = strtolower(pathinfo($arquivo["name"], PATHINFO_EXTENSION));

        if (!in_array($tipo_arquivo, $tipo_permitido) || !in_array($extensao_arquivo, $extensoes_permitidas)) {
            echo json_encode(["status" => "erro", "mensagem" => "Tipo de arquivo não permitido."]);
            exit;
        }

        if ($arquivo["size"] > $tamanho_maximo) {
            echo json_encode(["status" => "erro", "mensagem" => "Arquivo muito grande. Máximo 2MB."]);
            exit;
        }

        $diretorio_upload = "uploads/"; // lembrar de Garantir que este diretório exista e tenha permissões corretas
        $nome_arquivo_unico = uniqid() . "_" . basename($arquivo["name"]);
        $caminho_destino = $diretorio_upload . $nome_arquivo_unico;

        if (move_uploaded_file($arquivo["tmp_name"], $caminho_destino)) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Arquivo enviado com sucesso!", "caminho_arquivo" => $caminho_destino]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => "Erro ao mover o arquivo."]);
        }

    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro no upload do arquivo."]);
    }

} else {
    echo json_encode(["status" => "erro", "mensagem" => "Requisição inválida."]);
}
?>