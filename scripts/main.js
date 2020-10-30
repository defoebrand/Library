const myLibrary = [];

if (localStorage.myLibrary) {
  const storage = JSON.parse(localStorage.myLibrary);
  const {
    length,
  } = storage;
  for (let i = 0; i <= length - 1; i += 1) {
    myLibrary[i] = storage[i];
  }
}

const bookShelf = document.querySelector('.bookShelf');

const addForm = document.querySelector('.add-book');

const newBookButton = document.getElementById('newBookButton');
newBookButton.onclick = () => {
  addForm.classList.toggle('show');
};

const submitForm = document.querySelector('.submitForm');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function checkIfRead(checked) {
  if (checked === true) {
    return 'Read It';
  }
  return "Haven't Read It";
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  newBook.index = myLibrary.length;
  myLibrary.push(newBook);
  localStorage.myLibrary = JSON.stringify(myLibrary);
}

function shelveTheBook(spot) {
  const bookToShelve = document.createElement('li');
  bookToShelve.innerText = `${myLibrary[spot].title} by ${myLibrary[spot].author}, ${myLibrary[spot].pages} pages `;

  const deleteBook = document.createElement('span');
  deleteBook.innerText = ' - Delete From Library - ';
  deleteBook.onclick = () => {
    myLibrary.splice(bookToShelve.index, 1);
    bookShelf.removeChild(bookToShelve);
  };

  const readBox = document.createElement('input');
  readBox.type = 'checkbox';

  const readBook = document.createElement('span');
  readBook.innerText = myLibrary[spot].read;

  if (readBook.innerText === 'Read It') {
    readBook.classList.add('text-green');
    readBox.checked = true;
  } else {
    readBook.classList.add('text-red');
    readBox.checked = false;
  }

  readBox.onchange = () => {
    if (readBox.checked === true) {
      readBook.innerText = 'Read It';
      readBook.classList.remove('text-red');
      readBook.classList.add('text-green');
    } else {
      readBook.innerText = "Haven't Read It";
      readBook.classList.remove('text-green');
      readBook.classList.add('text-red');
    }
  };

  bookToShelve.appendChild(deleteBook);
  bookToShelve.appendChild(readBox);
  bookToShelve.appendChild(readBook);
  bookShelf.appendChild(bookToShelve);
}

submitForm.onclick = () => {
  const title = addForm.firstElementChild.value;
  const author = addForm.firstElementChild.nextElementSibling.value;
  const pages = addForm.firstElementChild.nextElementSibling.nextElementSibling.value;
  const checkbox = addForm.lastElementChild.previousElementSibling.lastElementChild;
  const read = checkIfRead(checkbox.checked);
  addBookToLibrary(title, author, pages, read);
  shelveTheBook(myLibrary.length - 1);
};

function putBooksOnTheShelf() {
  for (let i = 0; i <= myLibrary.length - 1; i += 1) {
    shelveTheBook(i);
  }
}

putBooksOnTheShelf();