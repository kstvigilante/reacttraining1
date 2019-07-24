import React, { useState } from "react";
import PropTypes from "prop-types"

const Search = (props) => {

    const [text, setText] = useState("");


    const handleChange = (e) => {

        setText(e.target.value);
    }

    const handleSubmit = (e) => {

        const { searchUser, setAlert } = props;
        e.preventDefault();
        if(text === ''){
            setAlert("Please enter something", "light");
        }
        else{
            searchUser(text);
            setText("");
        }
        
    }

    const { clearUsers, showClearnBtn } = props;

    return (
        <div>
            <form className = "form" onSubmit = {handleSubmit}>
                <input 
                    type = "text" 
                    name = "text" 
                    placeholder = "Search Users..."
                    value = {text} 
                    onChange = {handleChange}
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

Search.propTypes = {
    searchUser: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearnBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search;