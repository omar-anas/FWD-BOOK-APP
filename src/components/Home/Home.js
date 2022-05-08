import './Home.css'
import React, { useState, useEffect } from "react";
import { getAll, update, } from '../../BooksAPI'
const Home = () => {
  const [books, setBooks] = useState([]);
  // const [currRead, setCurrRead] = useState([]);
  // const [wantRead, setWantRead] = useState([]);
  // const [read, setRead] = useState([]);

  const updateShelf = async (event,book) => {
    const shelf = event.target.value
    const res = await update(book,shelf)
    let temp = books;
    
    temp = temp.filter((elem) => elem.id !== book.id)
    book.shelf=shelf
    temp.push(book);
    setBooks(temp)
    
  }

  
  const Shelf = ({ shelfName, book }) => {
    const showName =shelfName.replace(/([A-Z])/g, ' $1').trim()
    
    return(
    <div className="bookshelf">
        <h2 className="bookshelf-title">{showName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
            {book.map((book, index) => {
              if (book.shelf === shelfName) {
                return (
                
                  <BOOK key={index} book={book} />
                )
              }
          })}
        </ol>
      </div>
    </div>)

    
  }
  const BOOK = ({book}) => {
    
    return(<li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url(${book.imageLinks.smallThumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            
            <select onChange={(event) => { updateShelf(event, book) }} value={book.shelf}>
              <option value="none" disabled>
                Move to...
              </option>

              <option value="currentlyReading">
                Currently Reading
              </option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>)
  }




  useEffect(() => {
    const getBooks = async () => {
      const res = await getAll()
      setBooks(res);
      
    }
    getBooks()
  }, [])



  console.log(books);


  return (



    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>


      <div className="list-books-content">
        <div>
          



          <Shelf shelfName="currentlyReading" book={books}   />
          <Shelf shelfName="wantToRead" book={books}   />
          <Shelf shelfName="read" book={books}   />

          
        </div>
      </div>

    </div>
  );
};

export default Home;
