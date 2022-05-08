import React, { useState, useEffect } from 'react'
import './Search.css'
import { search, update } from '../../BooksAPI';


const updateShelf = async (event, book) => {
    const shelf = event.target.value
    const res = await update(book, shelf)


}




const BOOK = ({ book }) => {
   
    return (<li>
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

                    <select onChange={(event) => { updateShelf(event, book) }} value={"none"}>
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

const Search = () => {

    const [query, setQuery] = useState("");
    const [searchBooks, setSearchBooks] = useState([]);


    const searchItems = (searchValue) => {
        setQuery(searchValue)

    }



    useEffect(() => {
       
        const fetchBooks = async () => {






            const res = await search(query);
            if (Array.isArray(res)) {
                
                
                setSearchBooks(res);
                
            } else {
                console.log("invalid query")
            }




        }
        const debounceSearch = setTimeout(() => {
            if (query) {
                fetchBooks()
            } else {
                setSearchBooks([]);
            }

        }, 300)





        return () => {
            clearTimeout(debounceSearch);

        }
    }, [query])


    return (
        <div className="search-books">
            <div className="search-books-bar">
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => {searchItems(e.target.value) }}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchBooks.map((value, index) => {
                        if (value.imageLinks) {
                            
                            return (<BOOK key={index} book={value} />)
                        }

                    })

                    }
                </ol>
            </div>
        </div>
    )
}


export default Search;