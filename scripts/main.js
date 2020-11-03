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

const title = document.getElementById('addTitle');
const author = document.getElementById('addAuthor');
const pages = document.getElementById('addPages');
const checkbox = document.getElementById('haveRead');

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// const bookFactory = (title, author, pages, read) => {
//   return {
//     title,
//     author,
//     pages,
//     read
//   };
// }

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function checkIfRead(checked) {
  if (checked === true) {
    return 'Read It';
  }
  return "Haven't Read It";
}

function addDeleteButton(bookToShelve) {
  const deleteBook = document.createElement('span');
  deleteBook.innerText = ' - Delete From Library - ';
  deleteBook.onclick = () => {
    localStorage.clear();
    // console.log(localStorage);
    myLibrary.splice(bookToShelve.index, 1);
    // console.log(myLibrary);
    bookShelf.removeChild(bookToShelve);
    localStorage.myLibrary = JSON.stringify(myLibrary);
    window.location.reload();
  };
  bookToShelve.appendChild(deleteBook);
}

function addReadButton(bookToShelve, spot) {
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

  bookToShelve.appendChild(readBox);
  bookToShelve.appendChild(readBook);
}

function shelveTheBook(spot) {
  const bookToShelve = document.createElement('li');
  bookToShelve.index = spot;
  bookToShelve.innerText = `${myLibrary[spot].title} by ${myLibrary[spot].author}, ${myLibrary[spot].pages} pages `;

  addDeleteButton(bookToShelve);
  addReadButton(bookToShelve, spot);

  bookShelf.appendChild(bookToShelve);
}


function addBookToLibrary(title, author, pages, checkbox) {
  const read = checkIfRead(checkbox.checked);
  const newBook = new Book(title.value, author.value, pages.value, read);
  newBook.index = myLibrary.length;
  myLibrary.push(newBook);
  localStorage.myLibrary = JSON.stringify(myLibrary);
  shelveTheBook(myLibrary.length - 1);
  title.value = '';
  author.value = '';
  pages.value = '';
  checkbox.checked = false;
}

function validateFields(input) {
  if (input.value.trim() === '') {
    input.focus();
    return false;
  }
  return true;
}

function validateInput() {
  return [
    title,
    author,
    pages,
  ].every(validateFields);
}

function putBooksOnTheShelf() {
  for (let i = 0; i <= myLibrary.length - 1; i += 1) {
    shelveTheBook(i);
  }
  submitForm.onclick = () => {
    if (validateInput() === true) {
      addBookToLibrary(title, author, pages, checkbox);
    }
  };
}

putBooksOnTheShelf();