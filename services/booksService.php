<?php
include("databaseService.php");
global $database;

$page = null;
$size = null;

if(isset($_REQUEST["page"]) && isset($_REQUEST["size"])) {
    $page = intval($_REQUEST["page"]);
    $size = intval($_REQUEST["size"]);
}
$books = null;

if ($page !== null || $size !== null) {
    $from = $page * $size;
    $books = $database->getSomeBooks($from, $size);
} else {
    $books = $database->getAllBooks();
}

echo $books === null ? "No books found" : json_encode($books);
?>
