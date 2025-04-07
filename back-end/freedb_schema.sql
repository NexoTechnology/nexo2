

CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    avaliacao INT NOT NULL,
    comentario TEXT NOT NULL,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    nivel_acesso ENUM('usuario', 'admin') DEFAULT 'usuario',
    secret_2fa VARCHAR(255)
);

CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id INT,
    data_publicacao DATETIME,
    tags VARCHAR(255),
    imagem_destaque VARCHAR(255),
    status ENUM('rascunho', 'publicado', 'agendado') DEFAULT 'rascunho',
    FULLTEXT INDEX idx_blog_posts_titulo_conteudo (titulo, conteudo),
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
);

CREATE TABLE faq_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    ordem INT
);

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    usuario_id INT,
    nome_usuario VARCHAR(255),
    email_usuario VARCHAR(255),
    texto_comentario TEXT NOT NULL,
    data_comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
    FOREIGN KEY (post_id) REFERENCES blog_posts(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2),
    categoria_id INT,
    imagem_principal VARCHAR(255),
    imagens_adicionais TEXT,
    estoque INT,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    FULLTEXT INDEX idx_produtos_nome_descricao (nome, descricao),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(255) NOT NULL,
    slug_categoria VARCHAR(255) UNIQUE
);

CREATE TABLE push_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    assinatura_json TEXT NOT NULL,
    data_assinatura DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo_atividade VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_usuario VARCHAR(45),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);