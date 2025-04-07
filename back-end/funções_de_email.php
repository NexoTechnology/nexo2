<?php
// includes/email_functions.php corrigir erros 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

function enviarEmailConfirmacaoCadastro($emailDestinatario, $nomeUsuario, $linkConfirmacao) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.seuprovedor.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'seu_email@seuprovedor.com';
        $mail->Password   = 'sua_senha_email';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('noreply@seusite.com', 'Nexo Assistência Técnica');
        $mail->addAddress($emailDestinatario, $nomeUsuario);

        $mail->isHTML(true);
        $mail->Subject = 'Confirmação de Cadastro - Nexo Assistência Técnica';
        $mail->Body    = 'Olá ' . $nomeUsuario . ',<br><br>Obrigado por se cadastrar em nosso site!<br><br>Por favor, clique no link abaixo para confirmar seu cadastro:<br><a href="' . $linkConfirmacao . '">' . $linkConfirmacao . '</a><br><br>Atenciosamente,<br>Equipe Nexo Assistência Técnica';
        $mail->AltBody = 'Olá ' . $nomeUsuario . ',\n\nObrigado por se cadastrar em nosso site!\n\nPor favor, copie e cole o link abaixo no seu navegador para confirmar seu cadastro:\n' . $linkConfirmacao . '\n\nAtenciosamente,\nEquipe Nexo Assistência Técnica';

        $mail->send();
        return true;

    } catch (Exception $e) {
        error_log("Erro ao enviar e-mail de confirmação: {$mail->ErrorInfo}");
        return false;
    }
}
