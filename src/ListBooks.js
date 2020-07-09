import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book.js'

// Using a stateless functional component because a 'BookList' only renders an ordered list of 'Books'
const ListBooks = (props) => {
  const { books, handleSelect } = props;
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book id={book.id} url={book.url} status={book.status} title={book.title} authors={book.authors} handleSelect={handleSelect}/>
          </li>
        ))}
      </ol>
    </div>
  ); 
}

ListBooks.propTypes = {
  books: PropTypes.array,
  handleSelect: PropTypes.func,
};

export default ListBooks;