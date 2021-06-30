<?php

// Use the DB class
require __DIR__ . '/../config/db.php';
// Include helpers
require __DIR__ . '/../config/helpers.php';

// Users Class
class Users {

    // User Signin
    public static function login($email, $password) {
        $db = new DB();
        $conn = $db->connect();

        $sql = "SELECT * FROM users WHERE email = :email LIMIT 1";
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
                
        // Check if row is returned
        if($stmt->rowCount() != 0){
            // Loop through each entry
            foreach ($stmt as $row) {
                $id = $row['id'];
                $firstname = $row['firstname'];
                $lastname = $row['lastname'];
                $password_hash = $row['password_hash'];
                $points = $row['points'];
            }
            if(password_verify($password, $password_hash)) {
                session_start();
                // Store data in session variables
                $_SESSION["loggedin"] = true;
                $_SESSION["id"] = $id;
                $_SESSION["firstname"] = $firstname;
                $_SESSION["lastname"] = $lastname;
                $_SESSION["username"] = $email;
                $_SESSION["points"] = $points;

                // Set Cookies
                createCookie('isloggedin', True);
                createCookie('UID', $id);
                createCookie('userDoesNotExist', 0);
                createCookie('passDoesNotExist', 0);
                // redirect
                redirect('index.html');

            } else {
                redirect('login.html');
                // Create Cookie
                createCookie('userDoesNotExist', 0);
                createCookie('passDoesNotExist', 1);
                // redirect
            }
        } else {
            redirect('login.html');
            // Create Cookie
            createCookie('userDoesNotExist', 1);
            // redirect
        }
        $db = null;
        
    }

    // Register User
    public static function register($firstname, $lastname, $email, $password, $points) {
        $db = new DB();
        $conn = $db->connect();

        $sql = "INSERT INTO users (firstname, lastname, email, password_hash, points) VALUE (:firstname, :lastname, :email, :password, :points)";
        $password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':firstname', $firstname);
        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':points', $points);

        $result = $stmt->execute();

        $db = null;

        // redirect
        redirect('login.html');
    }
}