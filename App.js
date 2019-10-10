import React, { Component } from 'react';
import './App.css';
import SearchBookForm from './Search_Form/SearchBookForm';

class App extends Component {
  render () {
    return (
      <div className="App">
        <h1>BOOKWORM</h1>
        <h2>Find your next great read!</h2>
        <SearchBookForm />
      </div>
    )
  }
}

export default App;
