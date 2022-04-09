import './Tile.scss';

import React from 'react';
import { Popover2 } from '@blueprintjs/popover2';
import { Button, Card, Elevation, Intent, Text } from '@blueprintjs/core';

export default function Tile({ popoverLines, imageUrl, labelText, uri }) {
  const handleOpenSpotify = () => {
    window.location.replace(uri);
  };

  return (
    <div className="tile-wrapper">
      <Popover2
        placement="bottom"
        fill={true}
        minimal={false}
        content={
          <div
            style={{
              padding: '7px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: '200px',
            }}
          >
            {popoverLines.map((line, i) => {
              return (
                <span key={line.label} className="popover-line">
                  <Text className="bp4-text-large popover-label">
                    {line.label}
                  </Text>
                  <Text className="bp4-text-large">{line.value}</Text>
                </span>
              );
            })}

            <Button
              style={{ width: '130px', alignSelf: 'center' }}
              intent={Intent.SUCCESS}
              icon="arrow-top-right"
              onClick={handleOpenSpotify}
            >
              Open Spotify
            </Button>
          </div>
        }
      >
        <div>
          <Card
            interactive={true}
            elevation={Elevation.TWO}
            className="tile-element"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></Card>
          <div className="name-banner">
            <Text className="bp4-text-large" ellipsize={true}>
              {labelText}
            </Text>
          </div>
        </div>
      </Popover2>
    </div>
  );
}
