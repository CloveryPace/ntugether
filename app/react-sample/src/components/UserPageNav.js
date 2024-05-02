import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

const { useState } = React;

export default function UserPageNav({selectedTab}) {
  const [value, setValue] = useState(selectedTab);

  return (
    <Box sx={{ width: '100%' , margin: 4}}>
      <Tabs
        value={value}
        // onChange={handleChange}
        aria-label="nav tabs"
        role="navigation"
        centered
      >
        <LinkTab label="個人頁面" href="/userprofile" selected={selectedTab === 0? true : false}/>
        <LinkTab label="活動紀錄" href="/activityattendpage"  selected={selectedTab === 1? true : false}/>
        <LinkTab label="揪團紀錄" href="/#"  selected={selectedTab === 2? true : false}/>
        <LinkTab label="進度管理" href="/#"  selected={selectedTab === 3? true : false}/>
        <LinkTab label="帳戶設定" href="/setting"  selected={selectedTab === 4? true : false}/>

      </Tabs>
    </Box>
  );
}