import React from 'react';
import PropTypes from "prop-types";

const RepoItem = ( props ) =>{

    const { repo } = props;
    return(
        <div className = "card">
            <h3>
                <a 
                    href = {repo.html_url}
                    target = "_blank"
                    rel = "noopener noreferrer"
                >
                    {repo.name}    
                </a>
            </h3>
        </div>
    )
}

RepoItem.prototypes = {
    repo: PropTypes.object.isRequired,
}

export default RepoItem;