import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './Style.css';
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

export default function UserPageNav({selectedTab}) {
  const [value, setValue] = useState(selectedTab);
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div>
        <Box sx={{ mt: 4, mb: 4}}>
          <Tabs
            value={value}
            // onChange={handleChange}
            aria-label="nav tabs"
            role="navigation"
            centered
          > 
            <LinkTab label={t("個人頁面")} href="/userprofile" selected={selectedTab === 0? true : false}/>
            <LinkTab label={t("活動紀錄")} href="/activityattendpage"  selected={selectedTab === 1? true : false}/>
            <LinkTab label={t("計畫紀錄")} href="/planManage"  selected={selectedTab === 2? true : false}/>
            <LinkTab label={t("帳戶設定")} href="/setting"  selected={selectedTab === 3? true : false}/>

          </Tabs>
        </Box>
      </div>

      </div>
  );
}