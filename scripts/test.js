let myLibrary = []

const bookShelf = document.querySelector('.bookShelf');

const addForm = document.querySelector('.add-book');

const submitForm = document.querySelector('.submitForm')
submitForm.onclick = () => {
  title = addForm.firstElementChild.value;
  author = addForm.firstElementChild.nextElementSibling.value;
  pages = addForm.firstElementChild.nextElementSibling.nextElementSibling.value;
  read = checkIfRead();
  addBookToLibrary(title, author, pages, read)
  addBookToShelf();
}

const newBookButton = document.getElementById('newBookButton');

newBookButton.onclick = () => {
  addForm.classList.toggle('hide');
};

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.info = function() {
    return (title + " by " + author + ", " + pages + " pages, ")
  }
}

function checkIfRead() {
  if (addForm.lastElementChild.previousElementSibling.lastElementChild.checked == true) {
    return 'Read It'
  } else {
    return "Haven't Read It"
  }
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  newBook.index = myLibrary.length
  myLibrary.push(newBook);
}

function addBookToShelf() {
  let bookToShelve = document.createElement('li');
  bookToShelve.innerText = myLibrary[myLibrary.length - 1].info();

  let deleteBook = document.createElement('span');
  deleteBook.innerText = " - Delete From Library"
  deleteBook.onclick = function() {
    myLibrary.splice(bookToShelve.index, 1);
    bookShelf.removeChild(bookToShelve);
  }
  bookToShelve.appendChild(deleteBook);
  bookShelf.appendChild(bookToShelve)
}

function putBooksOnTheShelf() {
  for (let i = 0; i <= myLibrary.length - 1; i++) {
    let shelvedBook = document.createElement('li');
    shelvedBook.innerText = myLibrary[i].info();

    let deleteBook = document.createElement('span');
    deleteBook.innerText = " - Delete From Library"
    deleteBook.onclick = function() {
      myLibrary.splice(shelvedBook.index, 1);
      bookShelf.removeChild(shelvedBook);
    }
    shelvedBook.read;
    shelvedBook.appendChild(deleteBook);
    bookShelf.appendChild(shelvedBook);
  }
}

function deleteBook(index) {
 myLibrary.splice(index, 1);
}

const ul = document.querySelector('.bookShelf')
ul.addEventListener('click',deleteBook)




addBookToLibrary('Test_title', 'Me', 213, 'Read It');
addBookToLibrary('Test_title2', 'Me', 213, 'Read It');
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, "Haven't Read It");
putBooksOnTheShelf();
