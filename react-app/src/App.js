import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Alignment, Navbar, Text, Icon } from '@blueprintjs/core';
import '@blueprintjs/icons';

import Home from './pages/Home';
import MusicAnalysis from './pages/music-analysis/MusicAnalysis';
import UserDashboard from './pages/music-analysis/UserDashboard';

export default function App() {
  return (
    <Router>
      <div className="App bp3-dark">
        <div className="App-header">
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>The Hall Home</Navbar.Heading>
              <Navbar.Divider />
              <Link className="bp3-button bp3-minimal" to="/">
                <Icon icon="home" />
                <Text>Home</Text>
              </Link>
            </Navbar.Group>
          </Navbar>
        </div>

        <div className="App-body">
          <Switch>
            <Route path="/music-analysis/user-dashboard">
              <UserDashboard />
            </Route>
            <Route path="/music-analysis/callback">
              <MusicAnalysis />
            </Route>
            <Route path="/music-analysis">
              <MusicAnalysis />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>

        <footer className="App-footer">
          <div className="App-footer-text">
            {/* Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> */}
          </div>
        </footer>
      </div>
    </Router>
  );
}
