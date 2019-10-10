import React, { Component } from 'react';
import './Search.css';

class SearchFilter extends Component {

    changeSelection(value){
        this.props.changeHandler(value);
        this.props.updateFilters();
    }

    render () {
        return (
            <div className="filters">
                <label htmlFor="printFilter">Print Type:</label>
                <select
                name="printFilter"
                id="printFilter"
                onChange={e => this.changeSelection(e.target.value)}>

                    <option value={null}>You gotta pick one!</option>
                    <option value='EBook'>E-Book</option>
                    <option value='Book'>Book</option>
                    <option value='Free EBook'>Free E-Book</option>

                </select>
            </div>
        )
    }
}

export default SearchFilter;