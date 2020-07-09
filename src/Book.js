import React from 'react'
import PropTypes from 'prop-types';

// Using a stateless functional component because a 'Book' only needs to be rendered
const Book = (props) => {
  const { id, url, status, title, authors, handleSelect} = props;
  const imageURL = `url("${url}")`

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageURL }}></div>
        <div className="book-shelf-changer">
          <select defaultValue={status} onChange={(event) => handleSelect(id, event.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

Book.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  authors: PropTypes.string,
  handleSelect: PropTypes.func
};

export default Book;