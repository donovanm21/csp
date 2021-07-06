<?php
// Include Mail
include('mail.inc.php');
// Include helpers
require __DIR__ . '/../config/helpers.php';

// Contact Form
if($_POST['contact_form'] == 1) {
    $contact_name = $_POST['contact-name'];
    $contact_number = $_POST['contact-number'];
    $contact_email = $_POST['contact-email'];
    $contact_suburb = $_POST['contact-suburb'];
    $contact_query = $_POST['contact-query'];
    $contact_description = $_POST['contact-description'];
    try {
        //Recipients
        $mail->addAddress($contact_email, $contact_name);
    
        //Content
        $mail->isHTML(true);
        $mail->Subject = 'Mail From Codespace Shop';
        $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
        $mail->send();
        echo 'Message has been sent';
        // redirect
        redirect('index.html');
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        // redirect
        redirect('index.html');
    }
}