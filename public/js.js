var booksArray = [];

var showBooksList = () => {
    var content = document.getElementById('content');
    content.innerHTML = '';

    var booksListContainer = document.createElement('div');
    booksListContainer.setAttribute('id', 'books_list');

    booksArray.forEach((element) => {
        var line = document.createElement('div');
        line.setAttribute('id', element.id);
        line.setAttribute('class', 'books_list_line');
        line.addEventListener('click', () => { getBookDesc(element.id); });

        var lineName = document.createElement('div');
        lineName.setAttribute('class', 'books_list_line_name');
        lineName.innerText = element.name;

        var lineYear = document.createElement('div');
        lineYear.setAttribute('class', 'books_list_line_year');
        lineYear.innerText = element.year;

        var lineAuthor = document.createElement('div');
        lineAuthor.setAttribute('class', 'books_list_line_author');
        lineAuthor.innerHTML = `by <b>${element.author}</b>`;

        var lineGenre = document.createElement('div');
        lineGenre.setAttribute('class', 'books_list_line_genre');
        lineGenre.innerText = element.genre;

        line.appendChild(lineName);
        line.appendChild(lineYear);
        line.appendChild(lineAuthor);
        line.appendChild(lineGenre);
        booksListContainer.appendChild(line);
    });
    content.appendChild(booksListContainer);
}

var showBookPage = (bookInfo) => {
    var content = document.getElementById('content');
    content.innerHTML = '';

    var bookContainer = document.createElement('div');
    bookContainer.setAttribute('id', 'book_container');

    var bookHeader = document.createElement('h1');
    bookHeader.setAttribute('id', 'book_header');
    bookHeader.innerText = bookInfo.name;

    var bookYear = document.createElement('div');
    bookYear.setAttribute('id', 'book_year');
    bookYear.innerText = bookInfo.year;

    var bookAuthor = document.createElement('div');
    bookAuthor.setAttribute('id', 'book_author');
    bookAuthor.innerText = bookInfo.author;

    var bookGenre = document.createElement('div');
    bookGenre.setAttribute('id', 'book_genre');
    bookGenre.innerText = bookInfo.genre;

    bookContainer.appendChild(bookHeader);
    bookContainer.appendChild(bookYear);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookGenre);
    content.appendChild(bookContainer);
}

var getBooks = (page, size) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === 'No books found') {
                alert(this.responseText);
            } else {
                booksArray = JSON.parse(this.responseText);
                showBooksList();
            }
        }
    }
    xmlhttp.open('GET', `./services/booksService.php?page=${page}&size=${size}`, true);
    xmlhttp.send();
}

var getBookDesc = (id) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === 'Book was not found!') {
                alert(this.responseText);
            } else {
                var bookInfo = JSON.parse(this.responseText);
                showBookPage(bookInfo);
                // document.getElementById('books_list').innerText = this.responseText;
            }
        }
    }
    xmlhttp.open('GET', `./services/booksService.php?book=${id}`, true);
    xmlhttp.send();
}

getBooks(0, 10);