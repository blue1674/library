const addButton = document.getElementById("addButton");
const submitButton = document.getElementById("submitButton");
const container = document.getElementsByClassName("container")[0];
const form = document.getElementById("addBookForm");
const closeIcon = document.getElementById('closeIcon');

addButton.addEventListener("click", showForm);


closeIcon.addEventListener('click', hideForm);


function Book(author, title, noOfPages, isRead) {
    this.author = author,
        this.title = title,
        this.noOfPages = noOfPages,
        this.isRead = isRead,
        this.info = function () {
            return `${title} by ${author}, ${noOfPages}, ${isRead}.`;
        }
}


function display(doc) {
    const div = document.createElement("div");
    const book = doc.data();
    div.innerHTML = `<p>Title: ${book.title}</p><p>Author: ${book.author}</p><p>Pages:  ${book.noOfPages}</p><p>Read?  ${book.isRead}</p>`;
    div.classList.add('card');
    div.setAttribute('data-id', doc.id);
    container.appendChild(div);
    const deleteBook = document.createElement('img');
    deleteBook.src = "images/delete-book.png";
    deleteBook.classList.add('deleteBook');
    deleteBook.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('books').doc(id).delete();
    });
    div.prepend(deleteBook);
}


function showForm() {
    form.style.display = "flex";
}




function hideForm() {
    document.getElementById("addBookForm").style.display = "none";
}



