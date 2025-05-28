
const myLibrary=[];


function Book(title, author,pageNum, hasRead){
    this.title=title;
    this.author=author;
    this.pageNum=pageNum;
    this.hasRead=hasRead;
}

function createBook(title, author, pageNum, hasRead){
    addBookToLibrary( new Book(title,author,pageNum,hasRead));
}

function addBookToLibrary(book){
    myLibrary.push(book);

}
Book.prototype.toggleReadStatus= function(){
    if(this.hasRead===true){
        this.hasRead=false;
    }else if(this.hasRead===false){
        this.hasRead=true;
    }
}

Book.prototype.displayBook=function(){
    const book=document.createElement('div');
    book.classList.add('book');
    book.setAttribute('data-index', myLibrary.indexOf(this));

    const author=document.createElement('h3');
    author.classList.add('author');
    author.textContent=this.author;

    const title=document.createElement('p');
    title.classList.add('title')
    title.textContent=this.title;

    const pageNum=document.createElement('p');
    pageNum.classList.add('pages')
    pageNum.textContent=this.pageNum + " pages";

    const hasRead=document.createElement('p')
    hasRead.classList.add('read-status');
    hasRead.textContent=this.hasRead? "Read": "Not Read";

    const deleteButton=document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent="Delete";

    deleteButton.addEventListener('click', function(e){
        const bookDiv=e.target.parentElement;
        const bookIndex=bookDiv.getAttribute('data-index');
        myLibrary.splice(bookIndex,1);
        updateLibraryDisplay();
    });

    const changeReadStatusButton=document.createElement('button');
    changeReadStatusButton.classList.add('read-status-button');
    changeReadStatusButton.textContent='Change Read Status';

    changeReadStatusButton.addEventListener('click', (e)=>{
        this.toggleReadStatus();
        hasRead.textContent=this.hasRead? "Read": "Not Read";
    });

    book.append(title,author,pageNum,hasRead,changeReadStatusButton, deleteButton);
    document.getElementById('book-container').appendChild(book);
}

function updateLibraryDisplay(){
    const bookContainer=document.getElementById('book-container');
    bookContainer.innerHTML="";
    myLibrary.forEach(book=>book.displayBook());
}

const showBtn=document.getElementById('show-dialog');
const dialog=document.getElementById('dialog');

showBtn.addEventListener("click", () =>{
    dialog.showModal();
});

const form=document.getElementById('dialogForm');
const title=form.elements['title'];
const author=form.elements['author'];
const pageNumber=form.elements['pageNumber'];
const readStatus=form.elements['readStatus'];

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    createBook(title.value, author.value, pageNumber.value, readStatus.value==="true"? true : false );
    updateLibraryDisplay();
    dialog.close();
    form.reset();
    
})

createBook('The Hobbit','J.R.R. Tolkien',295, true)
createBook('Alice in Wonderland', 'Lewis Carroll', 352, false);
createBook('Les Miserables', 'Victor Hugo', 1463, true);

document.addEventListener("DOMContentLoaded", ()=>{
    updateLibraryDisplay();
});

function displayLibrary(library){
    library.forEach(element=>{
        element.displayBook();
    });
}

displayLibrary(myLibrary);