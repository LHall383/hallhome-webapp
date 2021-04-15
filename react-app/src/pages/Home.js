import './Pages.scss';

import React from 'react';

import { useHistory } from 'react-router';
import { Card, Elevation, H1, H4, Text } from '@blueprintjs/core';
import '@blueprintjs/icons';

const linkNextcloud = function linkNextcloud() {
  window.location.replace('http://cloud.thehallho.me');
};

export default function Home() {
  const history = useHistory();

  return (
    <div className="page-wrapper">
      <div className="App-body-title">
        <H1>The Hall Home</H1>
      </div>

      <div className="card-container">
        <Card
          interactive="true"
          elevation={Elevation.TWO}
          onClick={linkNextcloud}
        >
          <H4>Nextcloud File Storage</H4>
          <Text>
            Nextcloud is a file hosting interface for multiple users to view,
            store and share files. To request access to Nextcloud send an email
            to lucashall383@gmail.com asking for a Nextcloud account.
          </Text>
        </Card>

        <div className="card-spacer" />

        <Card
          interactive="true"
          elevation={Elevation.TWO}
          onClick={() => history.push('/music-analysis')}
        >
          <H4>Spotify Music Analysis</H4>
          <Text>
            This is an analysis tool that allows a user to log in and view their
            Spotify listening statistics.
          </Text>
        </Card>
      </div>
    </div>
  );
}
