import React from 'react';
import RepoItem from "./RepoItem";
import PropTypes from "prop-types";

const Repos = ( props ) =>{

    const { repos } = props
    return(
        repos.map(repo => <RepoItem repo = {repo} key = {repo.id}></RepoItem>)
    )
}

Repos.propTypes = {
    repos: PropTypes.array.isRequired,
}

export default Repos;