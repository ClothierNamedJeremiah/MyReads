import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Search from './Search'
import Bookshelf from './Bookshelf'

// Problem: when the component loads, there are no books on the bookshelf
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }

    // This binding is necessary to make `this` work in the callback
    this.handleSelect = this.handleSelect.bind(this);
  }

  // Handle's changes made to individual books
  handleSelect = (id, status) => {
    BooksAPI.update({id: id}, status)
    .then(() => {
      BooksAPI.get(id)
      .then((book) => {
        this.setState((currState) => {
          // Filter out the book whose status has been changed and then add the new book in to the list
          const newBook = this.transformBook(book);
          let newBooks = currState.books.filter((book) => book.id !== newBook.id);
          return ({
            books: [...newBooks, newBook]
          });
        })
      })
    })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        const listOfBooks = books.map((book) => this.transformBook(book));
        this.setState(() => ({
          books: listOfBooks
        }));
    });
  }

  // Helper Function: transforms a book received from the API to Book used in the 'Book' Component (less key: value pairs getting passed around)
  transformBook = (book) => {
    const authors = book.hasOwnProperty('authors') ? book.authors.join(', ') : '';
    return {
      id: book.id,
      url: book.imageLinks.smallThumbnail,
      status: book.hasOwnProperty('shelf') ? book.shelf : 'none',
      title: book.title,
      authors: authors
    };
  }

  render() {
    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read']
    }

    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Object.keys(shelves).map(shelve => {
                  const [title, status] = shelves[shelve];
                  return <Bookshelf key={shelve} title={title} books={this.state.books.filter(book => book.status === status)} />
                })}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='open-search'>Add a book</Link>
            </div>
          </div>
          )}
          />

        <Route path='/search' render={() => (
          <Search handleSelect={this.handleSelect} transformBook={this.transformBook} booksOnShelf={this.state.books}/>
        )}
        />
        
      </div>
    )
  }
}

export default BooksApp
