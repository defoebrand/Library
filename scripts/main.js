let myLibrary = []

if (localStorage.myLibrary) {
  let storage = JSON.parse(localStorage.myLibrary)
  let length = storage.length;
  for (let i = 0; i <= length - 1; i++) {
    myLibrary[i] = storage[i];
  }
}

const bookShelf = document.querySelector('.bookShelf');

const addForm = document.querySelector('.add-book');

const newBookButton = document.getElementById('newBookButton');
newBookButton.onclick = () => {
  addForm.classList.toggle('show');
};

const submitForm = document.querySelector('.submitForm')
submitForm.onclick = () => {
  title = addForm.firstElementChild.value;
  author = addForm.firstElementChild.nextElementSibling.value;
  pages = addForm.firstElementChild.nextElementSibling.nextElementSibling.value;
  read = checkIfRead(addForm.lastElementChild.previousElementSibling.lastElementChild.checked);
  addBookToLibrary(title, author, pages, read)
  shelveTheBook(myLibrary.length - 1);
}

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function checkIfRead(checked) {
  if (checked == true) {
    return 'Read It'
  } else {
    return "Haven't Read It"
  }
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  newBook.index = myLibrary.length
  myLibrary.push(newBook);
  localStorage.myLibrary = JSON.stringify(myLibrary)
}

function shelveTheBook(spot) {
  let bookToShelve = document.createElement('li');
  bookToShelve.innerText = myLibrary[spot].title + " by " + myLibrary[spot].author + ", " + myLibrary[spot].pages + " pages "

  let deleteBook = document.createElement('span');
  deleteBook.innerText = " - Delete From Library - "
  deleteBook.onclick = function() {
    myLibrary.splice(bookToShelve.index, 1);
    bookShelf.removeChild(bookToShelve);
  }

  let readBox = document.createElement('input')
  readBox.type = 'checkbox'

  let readBook = document.createElement('span');
  readBook.innerText = myLibrary[spot].read;

  if (readBook.innerText == "Read It") {
    readBook.classList.add('text-green');
    readBox.checked = true;
  } else {
    readBook.classList.add('text-red');
    readBox.checked = false;
  }

  readBox.onchange = () => {
    if (readBox.checked == true) {
      readBook.innerText = "Read It"
      readBook.classList.remove('text-red')
      readBook.classList.add('text-green')
    } else {
      readBook.innerText = "Haven't Read It"
      readBook.classList.remove('text-green')
      readBook.classList.add('text-red')
    }
  }

  bookToShelve.appendChild(deleteBook);
  bookToShelve.appendChild(readBox);
  bookToShelve.appendChild(readBook);
  bookShelf.appendChild(bookToShelve);

}

function putBooksOnTheShelf() {
  for (let i = 0; i <= myLibrary.length - 1; i++) {
    shelveTheBook(i);
  }
}

putBooksOnTheShelf();