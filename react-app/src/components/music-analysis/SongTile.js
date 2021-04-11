import React from 'react';

export default function SongTile(props) {
  const index = props.index;
  const { name } = props.songData;

  return (
    <div>
      <p>
        {index}: {name}
      </p>
    </div>
  );
}
