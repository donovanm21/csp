<?php
// Include Mail
include('mail.inc.php');
// Use the Users class
require __DIR__ . '/../classes/class.users.php';

if(isset($_POST['register_firstname']) && isset($_POST['register_lastname']) && isset($_POST['register_email']) && isset($_POST['register_password1']) && isset($_POST['register_password2'])) {
    $register_firstname = $_POST['register_firstname'];
    $register_lastname = $_POST['register_lastname'];
    $register_email = $_POST['register_email'];
    $register_password1 = $_POST['register_password1'];
    $register_password2 = $_POST['register_password2'];
    $register_points = 10000;

    if($register_password1 == $register_password2) {
        try {
            try {
                //Recipients
                $mail->addAddress($register_email, $register_firstname);

                //Content
                $mail->isHTML(true);
                $mail->Subject = 'Mail From Codespace Shop';
                $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
                $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

                $mail->send();
                echo 'Message has been sent';
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
            // Register user via static method
            Users::register($register_firstname, $register_lastname, $register_email, $register_password1, $register_points);
        } catch(Exception $e) {
            echo 'Message: ' .$e->getMessage();
        }
    } else {
        // redirect
        redirect('register.html');
    }
} else {
    // redirect
    redirect('register.html');
}

