let myLibrary = [];
const addButton = document.getElementById("addButton");
const submitButton = document.getElementById("submitButton");
const container = document.getElementsByClassName("container")[0];
const form = document.getElementById("addBookForm");
const closeIcon = document.getElementById('closeIcon'); 
const deleteIcon = document.getElementById("deleteBook"); 
let id = 0; 

deleteIcon.addEventListener('click', deleteBook);
addButton.addEventListener("click", showForm);
submitButton.addEventListener('click', submitForm);
form.addEventListener('submit', handleForm);
closeIcon.addEventListener('click', hideForm);

function handleForm(event) { event.preventDefault(); }

function deleteBook(){
    
}

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
    book["id"] = id++; 
    myLibrary.push(book);
}

function display(book) {
    const div = document.createElement("div");
    div.innerHTML = `<p> Title: ${book.title}</p><p>Author: ${book.author}</p><p>Pages:  ${book.noOfPages}</p><p>Read?  ${book.isRead}</p>`;
    div.classList.add('card');
    container.appendChild(div);
    const deleteBook = document.createElement('img'); 
    deleteBook.src = "images/delete-book.png"; 
    deleteBook.classList.add('deleteBook');
    div.prepend(deleteBook);
}

function displayStored() {
    myLibrary.forEach(book => {
        display(book);
    });
}
for (let i = 1; i < 11; i++)
    addBookToLibrary(new Book("JRR Tolkien", "The Hobbit", "295", "No"));// "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
displayStored();

function displayRecent() {
    display(myLibrary[myLibrary.length - 1]);

}

function showForm() {
    form.style.display = "flex";
}

function submitForm() {
    const title = document.getElementById("title").value;
    const author = document.getElementById('author').value;
    const noOfPages = document.getElementById('noOfPages').value;
    const read = document.querySelector('input[name="isRead"]:checked').value;
    const book = new Book(author, title, noOfPages, read);
    addBookToLibrary(book);
    hideForm();
    form.reset();
    displayRecent();
}



function hideForm() {
    document.getElementById("addBookForm").style.display = "none";
}