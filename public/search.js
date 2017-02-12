var searchButton = document.getElementById('search_button');
var searchField = document.getElementById('search_field');

var search = (phrase) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === 'No books found!') {
                alert(this.responseText);
            } else {
                console.log(this.responseText);
                booksArray = JSON.parse(this.responseText);
                showBooksList();
            }
        }
    }
    xmlhttp.open('GET', `./services/booksService.php?search=${phrase}`, true);
    xmlhttp.send();
}

searchButton.onclick = function() {
    search(searchField.value);
}