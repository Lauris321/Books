var booksArray = [];

var showBooksList = () => {
    var booksListContainer = document.getElementById("books_list");
    booksListContainer.innerHTML = '';
    booksArray.forEach(function(element) {
        var line = document.createElement('div');
        line.setAttribute('id', element.id);
        line.setAttribute('class', "books_list_line");
        line.innerText = element.name;
        booksListContainer.appendChild(line);
    });
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
    xmlhttp.open("GET", `./services/booksService.php?page=${page}&size=${size}?`, true);
    xmlhttp.send();
}

getBooks(0, 10);

