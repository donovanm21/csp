<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require __DIR__ . '/../vendor/autoload.php';

//Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

//Server settings
//$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->isSMTP();
$mail->Host       = 'localhost';
$mail->SMTPAuth   = true;
$mail->Username   = 'user@localhost.co.za';
$mail->Password   = 'password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port       = 587;

//Recipients
$mail->setFrom('user@localhost.co.za', 'Codespace Shop');