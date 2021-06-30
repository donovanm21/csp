<?php 

// Include site config
require __DIR__ . '/config.php';

class DB {
    private $DBHOST = DBHOST;
    private $DBUSER = DBUSER;
    private $DBPASS = DBPASS;
    private $DBNAME = DBNAME;

    public function connect() {
        $conn_str = "mysql:host=$this->DBHOST;dbname=$this->DBNAME";
        $conn = new PDO($conn_str, $this->DBUSER, $this->DBPASS);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conn;
    }
}

?>