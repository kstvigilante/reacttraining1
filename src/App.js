import React, { Component, Fragment } from 'react';
import Navbar from "./component/layout/Navbar";
import Users from "./component/users/Users";
import Search from "./component/users/Search";
import Alert from "./component/layout/Alert";
import About from "./pages/about";
import User from "./pages/User";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
  }

  searchUser = async (text) => {

    this.setState({
      loading: true
    });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data.items,
      loading: false,
    })
  }

  getUser = async(username) =>{

    this.setState({
      loading: true
    });

    const res = await axios.get(`https://api.github.com/users/${username}
      ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      user: res.data,
      loading: false,
    })

  }

  getUserRepos = async(username) =>{
    this.setState({
      loading: true
    });

    const res = await axios.get(`https://api.github.com/users/${username}
      /repos?per_page=5&sort=created:asc
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      repos: res.data,
      loading: false,
    })
  }

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
      alert: null,
    })
  }

  setAlert = (msg, type) => {
    this.setState({
      alert: { msg, type }
    });

    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 5000);
  }

  render() {

    const { 
      loading, 
      users, 
      user, 
      alert, 
      repos 
    } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar
            title="Github Finder"
            icon="fab fa-github"
          />
          <div className="container">
            <Alert
              alert={alert}
            />

            <Switch>
              <Route
                exact path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUser={this.searchUser}
                      clearUsers={this.clearUsers}
                      showClearnBtn={users.length ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={loading}
                      users={users}
                    />
                  </Fragment>
                )}
              />

              <Route exact path = "/about" component = {About}/>
              <Route exact path = "/user/:username" render = {props =>(
                <User 
                  { ...props} 
                  getUser = {this.getUser}
                  getUserRepos = {this.getUserRepos}
                  repos = {repos}
                  user = {user}
                  loading = {loading}
                />
              )}/>
            </Switch>


          </div>
        </div>
      </Router>
    );
  }
}

export default App;
