import React, { Component } from 'react';
import './Search.css';

import ResultsList from '../Book_Results/ResultsList';
import SearchFilter from './SearchFilter';
import SearchButton from './SearchButton';


class SearchBookForm extends Component {
    constructor (props){
        super(props);
        this.state ={
            searchTerm: '',
            selected: '',
            books: [],
            selectedBooks: [],
            SearchButton: "SearchButton"
        }

        //  we use the .bind() method because we want to bind these to the context in 
        // which we want the function to run, but not immediately.

        this.updateSearchTerm = this.updateSearchTerm.bind(this);
        this.searchForBooks = this.searchForBooks.bind(this);
        this.getData = this.getData.bind(this);
        this.updateFilters = this.getData.bind(this);
    }
    
    updateSearchTerm(term) {

        // this makes sure the user input is correctly formatted in the URL

            let userSearch = term.target.value
            let properSearchTerm = userSearch.replace(/[, ]+/g, '%20');
            console.log(properSearchTerm)
            this.setState({
                searchTerm: properSearchTerm
            });
            this.setState ({
                selected: null
            })
        }

        setSelected(selected){
            this.setState ({selected}, () => {
                this.updateFilters();
            });
        }

        handleClick = () => {
            this.setState({
                searchForBooks: this.searchForBooks
            });
        }

        searchForBooks = (event) => {
            event.preventDefault ();
            this.handleClick();

            const url = 'https://www.googleapis.com/books/v1/volumes?q='
            const searchTerm = this.state.searchTerm
            const apiKey = 'key=AIzaSyBfBh04OZTcPvMj531ZywU0lB_g7tHD0bk'

            fetch(`${url}${searchTerm}${apiKey}`)
                .then(response => {
                    if (!response.ok){
                        throw new Error ('Uh oh. The library seems to be a mess. Please try again!');
                    }
                    return response;
        
                })
            .then (response => response.json())
            .then (data => {
                this.getData(data);
            })
            .catch (error => {
                this.setState ({
                    error: error.message
                });
            });
        }
     

    // This function goes over the data, and maps it into an object.
    // It uses the google API info to pull out which data we need.  
        getData(data){
            const foundBooks = []
            Object.keys(data.items).map(i =>
                foundBooks.push({
                    title: `Title: ${data.items[i].volumeInfo.title}`,
                    author: `Author: ${data.items[i].volumeInfo.authors[0]}`,
                    price: (data.items.saleInfo.saleability === 'NOT_FOR_SALE') ? "Book Unavailable" :
                    (data.items[i].saleInfo.saleability === 'FREE') ? "FREE" : `E-Book price: $${data.items[i].saleInfo.listPrice.amount}`,
                    blurb:data.items[i].volumeInfo.description,
                    coverURL: (data.items[i].volumeInfo.imageLinks === undefined) ? null : data.items[i].volumeInfo.imageLinks.thumbnail,
                    bookURL: data.items[i].volumeInfo.infoLink,
                    isEbook: (data.items[i].saleInfo.isEbook === true) ? "E-Book" : "Book",
                    genre: data.items[i].volumeInfo.categories
                })
            )

            this.setState ({
                books: foundBooks
            });
            this.updateFilters()
        }

        // With lines 46-50, this function updates the user input in the filters?

        updateFilters() {
            const selectedBooks = [];

            for (let i=0; i<this.state.books.length; i++){
                if(this.state.selected === null) {
                    selectedBooks.push(this.state.books[i])
                } else if (this.state.books[i].isEbook === this.state.selected || this.state.books[i].price === this.state.selected){
                    selectedBooks.push(this.state.books[i])
                }
            }
            this.setState ({
                selectedBooks: selectedBooks
            })
        }
        render () {
            return (
                <div className='main'>
                    <form className='bookSearchForm'>

                        <label htmlFor="searchForm">Search by keyword:</label>
                        <input 
                        type="text"
                        name="searchTerm"
                        className="search"
                        placeholder="Find your next great read!"
                        value={this.userSearch}
                        onChange={term => this.updateSearchTerm(term)} />
                        
                        <button 
                        type="submit"
                        className="button"
                        onClick={this.searchForBooks}>Search</button>
                    </form>

                    <SearchFilter
                        changeHandler={selected => this.setSelected(selected)}
                        updateFilters={() => this.updateFilters()} />

                    <SearchButton
                        className={this.state.SearchButton} />
                    
                    <div className="results">
                        {Object.keys(this.state.selectedBooks).map(i=>
                            <ResultsList
                                id={Object.keys(this.state.selectedBooks)[i]}
                                key={Object.keys(this.state.selectedBooks)[i]}
                                searchTerm={this.state.searchTerm}
                                title={this.state.selectedBooks[i].title}
                                author={this.state.selectedBooks[i].author}
                                price={this.state.selectedBooks[i].price}
                                blurb={this.state.selectedBooks[i].blurb}
                                coverURL={this.state.selectedBooks[i].coverURL}
                                bookURL={this.state.selectedBooks[i].bookURL} />
                                )}
                    </div>
                    
                </div>
            )
        }
    }



export default SearchBookForm;