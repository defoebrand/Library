let myLibrary = []

const bookShelf = document.querySelector('.bookShelf');

const addForm = document.querySelector('.add-book');

const newBookButton = document.getElementById('newBookButton');

newBookButton.onclick = () => {
  addForm.classList.toggle('hide');
};

const submitForm = document.querySelector('.submitForm')
submitForm.onclick = () => {
  title = addForm.firstElementChild.value;
  author = addForm.firstElementChild.nextElementSibling.value;
  pages = addForm.firstElementChild.nextElementSibling.nextElementSibling.value;
  read = checkIfRead(addForm.lastElementChild.previousElementSibling.lastElementChild.checked);
  addBookToLibrary(title, author, pages, read)
  addBookToShelf();
}

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return (title + " by " + author + ", " + pages + " pages ")
  }
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
}

function addBookToShelf() {
  let bookToShelve = document.createElement('li');
  bookToShelve.innerText = myLibrary[myLibrary.length - 1].info();

  let deleteBook = document.createElement('span');
  deleteBook.innerText = " - Delete From Library - "
  deleteBook.onclick = function() {
    myLibrary.splice(bookToShelve.index, 1);
    bookShelf.removeChild(bookToShelve);
  }
      //
      let readBox = document.createElement('input')
      readBox.type = 'checkbox'
      let readBook = document.createElement('span');
      readBook.innerText = myLibrary[myLibrary.length - 1].read;
      if (readBook.innerText == "Read It"){
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
            }else{
                 readBook.innerText = "Haven't Read It"
                 readBook.classList.remove('text-green')
                 readBook.classList.add('text-red')
            }
      }


  bookToShelve.appendChild(deleteBook);
  bookToShelve.appendChild(readBox);
  bookToShelve.appendChild(readBook);

  bookShelf.appendChild(bookToShelve)

}

function putBooksOnTheShelf() {
  for (let i = 0; i <= myLibrary.length - 1; i++) {
    let shelvedBook = document.createElement('li');
    shelvedBook.innerText = myLibrary[i].info();


    let deleteBook = document.createElement('span');
    deleteBook.innerText = " - Delete From Library - "
    deleteBook.onclick = function() {
      myLibrary.splice(shelvedBook.index, 1);
      bookShelf.removeChild(shelvedBook);
    }

    let readBox = document.createElement('input')
    readBox.type = 'checkbox'

    readBox.onchange = () => {
      if (readBox.checked){
        readBook.innerText = "Read It"
        readBook.classList.remove('text-red')
        readBook.classList.add('text-green')
    } else {
        readBook.innerText = "Haven't Read It"
        readBook.classList.remove('text-green')
        readBook.classList.add('text-red')
      }
    }

    let readBook = document.createElement('span');
    readBook.innerText = myLibrary[i].read;
    if (readBook.innerText == "Read It"){
      readBox.checked = true;
      readBook.classList.add('text-green');
    } else {
      readBook.classList.add('text-red');
      readBox.checked = false;
    }
    readBox.onchange = () => {
          if (readBox.checked == true) {
              readBook.innerText = "Read It"
              readBook.classList.remove('text-red')
              readBook.classList.add('text-green')
          }else{
               readBook.innerText = "Haven't Read It"
               readBook.classList.remove('text-green')
               readBook.classList.add('text-red')
          }
    }


    shelvedBook.appendChild(deleteBook);

    shelvedBook.appendChild(readBox);
    shelvedBook.appendChild(readBook);

    bookShelf.appendChild(shelvedBook);

  }

}





addBookToLibrary('Test_title', 'Me', 213, 'Read It');
addBookToLibrary('Test_title2', 'Me', 213, 'Read It');
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, "Haven't Read It");
putBooksOnTheShelf();
