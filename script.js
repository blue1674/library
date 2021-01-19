let myLibrary = [];
const addButton = document.getElementById("addButton"); 
const submitButton = document.getElementById("submitButton");
const container = document.getElementsByClassName("container")[0]; 
function Book(author, title, noOfPages, isRead) {
    this.author = author,
        this.title = title,
        this.noOfPages = noOfPages,
        this.isRead = isRead,
        this.info = function () {
            return `${title} by ${author}, ${noOfPages}, ${isRead}.`;
        }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function display() {
    myLibrary.forEach(book => {
        const div = document.createElement("div"); 
        div.innerText = `Title: ${book.title}\nAuthor: ${book.author}\nPages: ${book.noOfPages} \nRead?: ${book.isRead}`;
        container.insertBefore(div, container.lastElementChild); 
    });
}
addBookToLibrary(new Book("JRR Tolkien", "The Hobbit", "295", "not read yet"));// "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
addButton.addEventListener("click", showForm);
submitButton.addEventListener('click', submitForm); 
display();

function showForm(){
    document.getElementById("addBookForm").style.display = "block";
    
}

function submitForm(){
    const title = document.getElementById("title").value;
    const author = document.getElementById('author').value;
    const noOfPages = document.getElementById('noOfPages').value;
    const book = new Book(author, title, noOfPages, "Yes"); 
    myLibrary.push(book); 
    hideForm();
    display();
}

function hideForm(){
    document.getElementById("addBookForm").style.display = "none";
}