import '../../Pages.scss';
import '../../../components/Components.scss';
import './UserDashboard.scss';

import { Tab, Tabs } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserProfile } from '../../../redux/ducks/privateUserDuck';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';

export default function UserDashboard() {
  // Redux data
  const { code } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();

  // Get user profile data using code
  useEffect(() => {
    dispatch(getUserProfile({ code }));
  }, [code, dispatch]);

  return (
    <div className="page-wrapper">
      <Tabs
        id="dashboard-tabs"
        defaultSelectedTabId="top-tracks"
        animate={false}
      >
        <Tab
          id="top-tracks"
          title="Top Tracks"
          className="dashboard-tab"
          panel={<TopTracks />}
        ></Tab>
        <Tab
          id="top-artists"
          title="Top Artists"
          className="dashboard-tab"
          panel={<TopArtists />}
        ></Tab>
      </Tabs>
    </div>
  );
}
