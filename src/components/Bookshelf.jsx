import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListBooks from './ListBooks'

class Bookshelf extends Component {
  
  render() {
    const {title, books, handleSelect} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <ListBooks books={books} handleSelect={handleSelect}/>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  handleSelect: PropTypes.func
};

export default Bookshelf;