<?php
// Include Mail
include('mail.inc.php');
// Include helpers
require __DIR__ . '/../config/helpers.php';

// Contact Form
if($_POST['contact-email'] != '' && $_POST['contact-name'] != '') {
    $contact_name = $_POST['contact-name'];
    $contact_email = $_POST['contact-email'];
    try {
        //Recipients
        $mail->addAddress($contact_email, $contact_name);
    
        //Content
        $mail->isHTML(true);
        $mail->Subject = 'Mail From Codespace Shop';
        $mail->Body    = 'Thanks for submitting the web contact form. This is a test mail to show it is working.';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
        $mail->send();
        // redirect
        redirect('index.html');
    } catch (Exception $e) {
        // redirect
        redirect('index.html');
    }
}