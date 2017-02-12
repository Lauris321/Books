var booksArray = [];
var page = 0;
var pageSize = 10;
var searchPhrase = "";
var sort = "name";

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

    var pagesNav = document.createElement('div');
    pagesNav.setAttribute('id', 'pages_nav');
    
    var next = document.createElement('button');
    next.setAttribute('id', 'pages_nav_next');
    next.innerText = 'Next page'

    next.onclick = () => {
        page += 1;
        getBooks();
    }
    
    pagesNav.innerHTML += page;
    pagesNav.appendChild(next);
    content.appendChild(booksListContainer);
    content.appendChild(pagesNav);
}

var showBookPage = (bookInfo) => {
    var content = document.getElementById('content');
    content.innerHTML = '';

    var bookContainer = document.createElement('div');
    bookContainer.setAttribute('id', 'book_container');

    var bookHeader = document.createElement('h1');
    bookHeader.setAttribute('id', 'book_header');
    bookHeader.innerText = bookInfo.name;

    var bookAuthor = document.createElement('div');
    bookAuthor.setAttribute('id', 'book_author');
    bookAuthor.innerHTML = `Written by: <b>${bookInfo.author}</b>`;

    var bookYear = document.createElement('div');
    bookYear.setAttribute('id', 'book_year');
    bookYear.innerHTML = `Publishing year: <b>${bookInfo.year}</b>`;

    var bookGenre = document.createElement('div');
    bookGenre.setAttribute('id', 'book_genre');
    bookGenre.innerText = bookInfo.genre;

    var backButton = document.createElement('button');
    backButton.setAttribute('id', 'back_button');
    backButton.innerText = 'Back';

    backButton.onclick = () => {
        getBooks();
    }

    bookContainer.appendChild(bookHeader);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookYear);
    bookContainer.appendChild(bookGenre);
    bookContainer.appendChild(backButton);
    content.appendChild(bookContainer);
}

var getBooks = () => {
    sort = document.getElementById('select_sort').value;
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
    xmlhttp.open('GET', `./services/booksService.php?page=${page}&size=${pageSize}&sort=${sort}`, true);
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
            }
        }
    }
    xmlhttp.open('GET', `./services/booksService.php?book=${id}`, true);
    xmlhttp.send();
}

getBooks();