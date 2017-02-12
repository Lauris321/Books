<?php
define("DB_SERVER", "sql11.freemysqlhosting.net");
define("DB_USER", "sql11158468");
define("DB_PASS", "DWDv9wPGxI");
define("DB_NAME", "sql11158468");

define("TBL_BOOKS", "books");

class MySQLDB {
    var $connection;

    function MySQLDB() {
        $this->connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME)
                or die(mysql_error() . '<br><h1>Failed to connect to the database</h1>');
    }

    function getBookInfo($id) {
        $q = "SELECT * FROM " . TBL_BOOKS . " WHERE id = " . $id;
        $result = mysqli_query($this->connection, $q);
        if (!$result || (mysqli_num_rows($result) < 1)) {
            return NULL;
        }
        
        $dbarray = mysqli_fetch_array($result);
        return $dbarray;
    }

    function getSomeBooks($row, $amount, $phrase, $sorting) {
        $q = "SELECT * FROM " . TBL_BOOKS;

        if($sorting !== null) {
            $q .= " ORDER BY $sorting";
        }
        if ($phrase !== null) {
            $q .= " WHERE name = '" . $phrase . "'";
        }
        if ($row !== null && $amount !== null) {
            $q .= " LIMIT " . $row . " , ". $amount;
        }
        
        mysqli_set_charset($this->connection, "utf8");
        $result = mysqli_query($this->connection, $q);
        
        if (!$result || (mysqli_num_rows($result) < 1)) {
            return NULL;
        }
        
        $array = array();
        while($row = mysqli_fetch_assoc($result)){
            $array[] = $row;
        }
        return $array;
    }
}
    
$database = new MySQLDB;
?>