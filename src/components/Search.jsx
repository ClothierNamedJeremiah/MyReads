import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

import * as BooksAPI from '../api/BooksAPI'
import ListBooks from './ListBooks'


const Search = (props) => {
  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]);

  const { handleSelect, transformBook, booksOnShelf } = props;

  const bookIdMap = new Map();
  booksOnShelf.forEach((book) => {
    bookIdMap.set(book.id, book.status);
  });

  const lastPromise = useRef();

  useEffect(() => {
    // Don't display any books if the input field is empty
    if (input === '') {
      setBooks([])
    } else {
      // Issue the request
      const currentPromise = BooksAPI.search(input)
        .then(data => data);

      
      lastPromise.current = currentPromise;

      currentPromise.then(
        books => {
          console.log(input);
          if (currentPromise === lastPromise.current) {
            if (books.hasOwnProperty('error')) {
              setBooks([]);
            } else {
              // Filter out books that do not have a preview image
              books = books.filter((book) => book.hasOwnProperty('imageLinks') && book.imageLinks.hasOwnProperty('smallThumbnail'));
              // Grab book states (booksOnShelf) otherwise, default to none
              const listOfBooks = books.map((book) => {
                book = transformBook(book);
                if (bookIdMap.has(book.id)) {
                  book.status = bookIdMap.get(book.id);
                }
                return book;
              });
              setBooks(listOfBooks)
            }
          }
        }
      )
    }
  }, [input]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' className='close-search'>Close</Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

        </div>
      </div>
      <div className="search-books-results">
        {}
        <ListBooks books={books} handleSelect={handleSelect} />
      </div>
    </div>
  );
}

Search.propTypes = {
  handleSelect: PropTypes.func,
  transformBook: PropTypes.func,
  booksOnShelf: PropTypes.array
};

export default Search