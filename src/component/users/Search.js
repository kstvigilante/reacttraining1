import React, { Component } from "react";
import PropTypes from "prop-types"

class Search extends Component {

    state = {
        text: ''
    }

    static propTypes = {
        searchUser: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClearnBtn: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        const { searchUser, setAlert } = this.props;
        const { text } = this.state;
        e.preventDefault();
        if(text === ''){
            setAlert("Please enter something", "light");
        }
        else{
            searchUser(text);
            this.setState({
                text: ""
            });
        }
        
    }

    render(){

        const { text } = this.state;

        const { clearUsers, showClearnBtn } = this.props;

        return (
            <div>
                <form className = "form" onSubmit = {this.handleSubmit}>
                    <input 
                        type = "text" 
                        name = "text" 
                        placeholder = "Search Users..."
                        value = {text} 
                        onChange = {this.handleChange}
                    />

                    <input 
                        type = "submit"
                        value = "Search"
                        className = "btn btn-dark btn-block" 
                    />
                </form>
                {showClearnBtn && 
                    (
                        <button
                            className = "btn btn-danger btn-block"
                            onClick = {clearUsers}
                            type = "but"
                        >
                            Clear
                        </button>
                    )
                }
            </div>
        )
    }
}

export default Search;