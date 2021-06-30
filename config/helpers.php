<?php

// Include site config
require __DIR__ . '/config.php';

// Redirect Function
function redirect($path) {
    header('location: ' . ROOT . $path);
}

function createCookie($cname, $cvalue) {
    // Set Cookies
    $cookie_name = $cname;
    $cookie_value = $cvalue;
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
}