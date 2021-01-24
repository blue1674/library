let myLibrary = [];
const addIcon = document.getElementById("addButton");
const signUpIcon = document.getElementById('signUpButton');

const container = document.getElementsByClassName("container")[0];

const bookForm = document.getElementById("addBookForm");
const signUpForm = document.getElementById('signUpForm');

const closeIcons = document.getElementsByClassName('closeFormButton');

Array.from(closeIcons).forEach(closeIcon => {
    closeIcon.addEventListener('click', (e) => hideForm(e, bookForm));
});

addIcon.addEventListener("click", (e) => showForm(e, bookForm));
signUpIcon.addEventListener("click", (e) => showForm(e, signUpForm));



bookForm.addEventListener('submit', e => addBook(e));
signUpForm.addEventListener('submit', e => signUp(e))





function addBook(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById('author').value;
    const noOfPages = document.getElementById('noOfPages').value;
    const read = document.querySelector('input[name="isRead"]:checked').value;
    const book = new Book(author, title, noOfPages, read);
    addBookToLibrary(book);
    hideForm(event, bookForm);
    bookForm.reset();
    displayRecent();
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
    myLibrary.push(book);
}

function display(book) {
    const div = document.createElement("div");
    div.innerHTML = `<p>Title: ${book.title}</p><p>Author: ${book.author}</p><p>Pages:  ${book.noOfPages}</p><p>Read?  ${book.isRead}</p>`;
    div.classList.add('card');
    container.appendChild(div);
    const deleteBook = document.createElement('img');
    deleteBook.src = "images/delete-book.png";
    deleteBook.classList.add('deleteBook');
    deleteBook.addEventListener('click', () => {
        let parent = deleteBook.parentNode;
        let grand_father = parent.parentNode;
        grand_father.removeChild(parent);
        const index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1);
    });
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

function showForm(e, form) {
    form.style.display = "flex";
}

function signUp(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email);
    console.log(password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log(user);
            window.alert(errorMessage)
        });
    hideForm(e, signUpForm);
}

function hideForm(e, form) {
    form.style.display = "none";
}