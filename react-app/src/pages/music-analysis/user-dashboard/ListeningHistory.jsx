import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecentlyPlayed } from '../../../redux/ducks/playerDuck';

export default function ListeningHistory() {
  const dispatch = useDispatch();
  const { code, loggedIn } = useSelector((state) => state.authorization);
  const { recentlyPlayed } = useSelector((state) => state.player);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getRecentlyPlayed({ code, limit: 50 }));
    }
  }, [code, loggedIn, dispatch]);

  return (
    <div>
      {recentlyPlayed?.items?.map((item, i) => (
        <div key={i}>{item.track.name}</div>
      ))}
    </div>
  );
}
