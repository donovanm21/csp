<?php

// Use the Users class
require __DIR__ . '/../classes/class.users.php';

if(isset($_POST['email'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        // User signin via login method
        Users::login($email, $password);
    } catch(Exception $e) {
        echo 'Message: ' .$e->getMessage();
    }
}
