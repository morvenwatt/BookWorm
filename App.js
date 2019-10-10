import React, { Component } from 'react';
import './App.css';
import SearchBookForm from './Search_Form/SearchBookForm';

class App extends Component {
  render () {
    return (
      <div className="App">
        <SearchBookForm />
      </div>
    )
  }
}

export default App;
