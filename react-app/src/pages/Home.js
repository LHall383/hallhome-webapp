import React from 'react';

import { Card, Elevation, H1, H4, Colors } from '@blueprintjs/core';
import '@blueprintjs/icons';

import { Link } from 'react-router-dom';

const linkNextcloud = function linkNextcloud() {
  window.location.replace('http://cloud.thehallho.me');
};

const cardHeaderStyle = {}; // {color: Colors.BLUE5};
const cardTextStyle = { color: Colors.WHITE }; // {color: Colors.BLUE4};

export default function Home() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <div className="App-body-title">
        <H1>The Hall Home</H1>
      </div>

      <div className="card-container">
        <Link to="/">
          <Card
            interactive="true"
            elevation={Elevation.TWO}
            onClick={linkNextcloud}
          >
            <H4 style={cardHeaderStyle}>Nextcloud File Storage</H4>
            <p style={cardTextStyle}>
              Nextcloud is a file hosting interface for multiple users to view,
              store and share files. To request access to Nextcloud send an
              email to lucashall383@gmail.com asking for a Nextcloud account.
            </p>
          </Card>
        </Link>

        <div className="card-spacer" />

        <Link to="/music-analysis">
          <Card interactive="true" elevation={Elevation.TWO}>
            <H4 style={cardHeaderStyle}>Spotify Music Analysis</H4>
            <p style={cardTextStyle}>
              This is an analysis tool that allows a user to log in and view
              their Spotify listening statistics.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
