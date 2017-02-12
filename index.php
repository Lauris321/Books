<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="./public/styles.css">
    </head>
    <body>
        <header id = 'header'>
            <div id = 'banner'>Fancy Books</div>
            <input type="text" id="search_field" placeholder="Book title">
            <button id = "search_button">Search</button>
            
            &#160; sort by <select id = "select_sort" onchange="getBooks()">
                <option value="name">Title</option>
                <option value="author">Author</option>
                <option value="year">Year</option>
                <option value="genre">Genre</option>
            </select>
        </header>
        <content id = 'content'></content>
    </body>
    <script src = "./public/js.js"></script>
    <script src = "./public/search.js"></script>
</html>