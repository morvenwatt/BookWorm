import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { fab } from '@fortawesome/free-solid-svg-icons';
//import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';


class SearchButton extends Component {

    render() {
        return (
            <Fragment>
                <div className="button-container">
                    <h2 className={this.props.className}>
                        
                        
                    </h2>
                </div>
            </Fragment>
        )
    }
}
// <FontAwesomeIcon icon="book" className={this.props.className}/>
//library.add(fab, faBook)
export default SearchButton;