import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Alignment, Icon, Navbar, Text } from '@blueprintjs/core';

import LoginHandler from './components/LoginHandler.jsx';
import Home from './pages/Home.jsx';
import MusicAnalysis from './pages/music-analysis/MusicAnalysis.jsx';
import UserDashboard from './pages/music-analysis/user-dashboard/UserDashboard.jsx';

export default function App() {
  return (
    <Router>
      <div className="App bp3-dark">
        {/* Application navigation bar */}
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>The Hall Home</Navbar.Heading>
            <Navbar.Divider />
            <Link className="bp3-button bp3-minimal" to="/">
              <Icon icon="home" />
              <Text>Home</Text>
            </Link>
            <Link className="bp3-button bp3-minimal" to="/music-analysis">
              <Icon icon="timeline-line-chart" />
              <Text>Music Analysis</Text>
            </Link>
          </Navbar.Group>
        </Navbar>

        {/* Application body, rendered differently depending on our route */}
        <div className="App-body">
          <Switch>
            <Route path="/music-analysis">
              <div className="login-button-container">
                <div className="login-button-wrapper">
                  <LoginHandler></LoginHandler>
                </div>
              </div>
              <Switch>
                <Route path="/music-analysis/user-dashboard">
                  <UserDashboard />
                </Route>
                <Route path="/music-analysis">
                  <MusicAnalysis />
                </Route>
              </Switch>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
