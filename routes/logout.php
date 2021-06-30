<?php

// Include helpers
require __DIR__ . '/../config/helpers.php';

// Initialize the session
session_start();
 
// Unset all of the session variables
$_SESSION = array();
 
// Destroy the session.
session_destroy();

// Unset Cookies
createCookie('UID', '');
createCookie('isloggedin', False);
createCookie('userDoesNotExist',  '');
 
// Redirect to login page
header("location: ../index.html");
exit;
?>
