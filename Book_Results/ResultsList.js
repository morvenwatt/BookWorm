import React, { Component } from 'react';
import './BookList.css';

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            price: '',
            blurb: '',
            coverURL: ''
        }
    }

    // This is the definition of a controlled form (in terms of results),
    // we are storing the values in state

    render() {
        return (
            <div className="resultList" key={this.props.id} id="results">
                <img src={this.props.coverURL} alt={`Book cover for ${this.props.title} by ${this.props.author}`} />
                <div className="bookInfo">
                    <a href={this.props.bookURL}><h3>{this.props.title}</h3></a>
                    <p>{this.props.author}</p>
                    <p>{this.props.price}</p>
                </div>

            </div>
        )
    }
}

export default ResultsList;