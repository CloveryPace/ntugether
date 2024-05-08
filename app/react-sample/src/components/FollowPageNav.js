import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';

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

export default function FollowPageNav({selectedTab}) {
  const [value, setValue] = useState(selectedTab);
  const { t, i18n } = useTranslation();

  return (
    <Box sx={{ width: '100%' , margin: 4}}>
      <Tabs
        value={value}
        // onChange={handleChange}
        aria-label="nav tabs"
        role="navigation"
        
      >
        <LinkTab label={t("活動收藏")} href="/favorite-activity" selected={selectedTab == 0? true : false}/>
        <LinkTab label={t("會員追蹤")} href="/follow-members"  selected={selectedTab == 1? true : false}/>

      </Tabs>
    </Box>
  );
}