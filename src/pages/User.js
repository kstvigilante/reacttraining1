import React, { Component, Fragment } from "react";
import Spinner from "../component/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class User extends Component{

    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
    }

    componentDidMount(){
        const { getUser } = this.props;
        console.log("this.props.match.params.login",this.props.match.params.username)
        getUser(this.props.match.params.username);
    }

    render(){

        const { 
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable,
            company
        } = this.props.user;

        const { loading } = this.props;

        if(loading) return <Spinner/>

        return(
            <Fragment>
                <Link to = "/" className = "btn btn-light">
                    Back To Search
                </Link>
                Hireable: {" "}
                {hireable ? (
                    <i className = "fas fa-check text-success" />
                ) : (
                    <i className = "fas fa-times-circle text-danger" />
                )}

                <div className = "card grid-2">
                    <div className = "all-center">
                        <img 
                            src = {avatar_url} 
                            className = "round-image" 
                            style = {{width: "150px"}} 
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}

                        <a 
                            href = {html_url}
                            className = "btn btn-dark my-1"
                            target = "_blank"
                            rel = "noopener noreferrer"
                        >
                            Visit Github Profile
                        </a>
                        <ul>
                            <li>
                                {login && (
                                    <Fragment>
                                        <strong> Username: </strong> {login}
                                    </Fragment>
                                )}
                            </li>
                            <li>
                                {company && (
                                    <Fragment>
                                        <strong> Company: </strong> {company}
                                    </Fragment>
                                )}
                            </li>
                            <li>
                                {blog && (
                                    <Fragment>
                                        <strong> Website: </strong> {blog}
                                    </Fragment>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default User;