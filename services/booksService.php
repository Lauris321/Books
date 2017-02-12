<?php
include("databaseService.php");
global $database;

$page = null;
$from = null;
$size = null;
$bookId = null;
$searchPhrase = null;

if (isset($_REQUEST["page"]) && isset($_REQUEST["size"])) {
    $page = intval($_REQUEST["page"]);
    $size = intval($_REQUEST["size"]);
    $from = $page * $size;
}
if (isset($_REQUEST["book"])) {
    $bookId = intval($_REQUEST["book"]);
}
if (isset($_REQUEST["search"])) {
    $searchPhrase = $_REQUEST["search"];
}
if (isset($_REQUEST["sort"])) {
    $sort = $_REQUEST["sort"];
}

$books = null;
if ($bookId === null) {
    $books = $database->getSomeBooks($from, $size, $searchPhrase, $sort);
    echo $books === null ? "No books found!" : json_encode($books);
} else {
    $book = $database->getBookInfo($bookId);
    echo $book === null ? "Book was not found!" : json_encode($book);
}
?>
