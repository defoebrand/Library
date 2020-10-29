let myLibrary = []

const bookShelf = document.querySelector('.bookShelf');
// Get a form with an 'id' of add-book
const addForm = document.forms['add-book']

const newBookButton = document.getElementById('newBookButton');
console.log(newBookButton)
console.log(addForm)

newBookButton.addEventListener('click', (e)=>{
  console.log(e.target)
  if (newBookButton.click) {
    // alert('i am clicked')
     addForm.style.display = "none"
    
  }else{
   addForm.style.display = "initial"
 }
});


// newBookButton.onclick = () => {
//   newBookButton.appendChild(newBookForm);
// }
// let newBookForm = document.createElement('form')
// let titleInput = document.createElement('input');
// titleInput.type = 'text'
// newBookForm.appendChild(titleInput);
// let authorInput = document.createElement('input');
// authorInput.type = 'text'
// newBookForm.appendChild(authorInput);
// let pagesInput = document.createElement('input');
// pagesInput.type = 'text'
// newBookForm.appendChild(pagesInput);
// let readInput = document.createElement('input');
// readInput.type = 'text'
// newBookForm.appendChild(readInput);
// newBookButton.appendChild(titleInput);



function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return (title + " by " + author + ", " + pages + " pages, " + read)
  }
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function putBooksOnTheShelf() {
  for (let i = 0; i <= myLibrary.length; i++) {
    let shelvedBook = document.createElement('li');
    shelvedBook.innerText = myLibrary[i].info();
    bookShelf.appendChild(shelvedBook);
  }
}




addBookToLibrary('Test_title', 'Me', 213, 'read it');
addBookToLibrary('Test_title2', 'Me', 213, 'read it');
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
putBooksOnTheShelf();