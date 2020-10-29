// alert('hello');

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return (title + " by " + author + ", " + pages + " pages, " + read)
  }
}

const test = new Book('Test_title', 'Me', 213, 'read it')

const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet')

alert(hobbit.info());