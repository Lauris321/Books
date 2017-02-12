<?php
include("databaseService.php");
global $database;

$page = null;
$size = null;
$bookId = null;

if (isset($_REQUEST["page"]) && isset($_REQUEST["size"])) {
    $page = intval($_REQUEST["page"]);
    $size = intval($_REQUEST["size"]);
} else if (isset($_REQUEST["book"])) {
    $bookId = intval($_REQUEST["book"]);
}
$books = null;

if ($page !== null || $size !== null) {
    $from = $page * $size;
    $books = $database->getSomeBooks($from, $size);
    echo $books === null ? "No books found!" : json_encode($books);
} else if ($bookId !== null) {
    $book = $database->getBookInfo($bookId);
    echo $book === null ? "Book was not found!" : json_encode($book);
} else {
    $books = $database->getAllBooks();
    echo $books === null ? "No books found!" : json_encode($books);
}


?>
