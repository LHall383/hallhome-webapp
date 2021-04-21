import '../../Pages.scss';
import '../../../components/Components.scss';
import './UserDashboard.scss';

import { H3, Tab, Tabs } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { getUserProfile } from '../../../redux/ducks/privateUserDuck';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';

export default function UserDashboard() {
  // Redux data
  const dispatch = useDispatch();
  const { code, loggedIn } = useSelector((state) => state.authorization);

  // We can be redirected here from login handler, use this to read passed state
  const location = useLocation();

  // Track the selected tab using local state
  const [selectedTab, setSelectedTab] = useState(
    (location.state && location.state.selectedTab) || 'top-tracks',
  );

  // Get user profile data using code
  useEffect(() => {
    dispatch(getUserProfile({ code }));
  }, [code, dispatch]);

  // In case the login handler modifies the selected tab from its dropdown
  useEffect(() => {
    if (location.state && location.state.selectedTab)
      setSelectedTab(location.state.selectedTab);
  }, [location]);

  const handleTabChange = (newTabId, prevTabId, event) => {
    setSelectedTab(newTabId);
  };

  if (loggedIn) {
    return (
      <div className="page-wrapper">
        <Tabs
          id="dashboard-tabs"
          animate={false}
          selectedTabId={selectedTab}
          onChange={handleTabChange}
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
  } else {
    return <H3>Log in to view your Spotify listenting statistics!</H3>;
  }
}
