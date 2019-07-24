import React, { useState, Fragment } from 'react';
import Navbar from "./component/layout/Navbar";
import Users from "./component/users/Users";
import Search from "./component/users/Search";
import Alert from "./component/layout/Alert";
import About from "./pages/about";
import User from "./pages/User";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlertMsg] = useState(null);

  const searchUser = async (text) => {

    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(res.data.items);
    setLoading(false);
  }

  const getUser = async (username) => {

    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}
      ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  }

  const getUserRepos = async (username) => {

    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}
      /repos?per_page=5&sort=created:asc
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () => {

    setUsers([]);
    setLoading(false);
    setAlertMsg(null);
  }

  const setAlert = (msg, type) => {

    setAlertMsg({ msg, type });

    setTimeout(() => {
      setAlertMsg(null);
    }, 5000);
  }

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
                    searchUser={searchUser}
                    clearUsers={clearUsers}
                    showClearnBtn={users.length ? true : false}
                    setAlert={setAlert}
                  />
                  <Users
                    loading={loading}
                    users={users}
                  />
                </Fragment>
              )}
            />

            <Route exact path="/about" component={About} />
            <Route exact path="/user/:username" render={props => (
              <User
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                repos={repos}
                user={user}
                loading={loading}
              />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
