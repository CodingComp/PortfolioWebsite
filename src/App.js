import React, { Component } from 'react';
import './App.css';

import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  Link, 
  Redirect 
} from 'react-router-dom';

//Pages
import MainPage from './pages/index';
import NotFoundPage from './pages/404';
import SortingPage from './pages/SortingPage';
import ProjectsPage from './pages/projectsPage';
import TestingPage from './pages/test';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/SortingPage" component={SortingPage} />
            <Route exact path="/ProjectsPage" component={ProjectsPage} />
            <Route exact path="/404" component={NotFoundPage}/>
            <Route exact path="/TestingPage" component={TestingPage}/>
            <Redirect to="/404"/>
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;