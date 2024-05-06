import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Face from '@mui/icons-material/Face';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useTheme} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import NotificationList from './NotificationList';
import Divider from '@mui/material/Divider';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import './Style.css';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function HeaderBar() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [accountAnchor, setAccountAnchor] = React.useState(null);
  const [languageAnchor, setlanguageAnchor] = React.useState(null);
  const [language, setlanguage] = React.useState('zh-tw');
  const [selectedLocation, setSelectedLocation] = React.useState('北部');
  const [showNotifiaction, setShowNotifiaction] = React.useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLocationIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language) => {
    setlanguage(language);
    setlanguageAnchor(null);
    changeLanguage(language);
  };

  const handleLanguageClick = (event) => {
    setlanguageAnchor(event.currentTarget);
  };

  const handleAccountClick = (event) => {
    setAccountAnchor(event.currentTarget);
  };

  const toggleNotification = () => {  
    setShowNotifiaction(!showNotifiaction);
  }
  const handleClose = () => {
    setAccountAnchor(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    navigate('/login');
  }


  const open = Boolean(anchorEl);
  const openAccountList = Boolean(accountAnchor);
  const openLanguageToggl = Boolean(languageAnchor);


  const handleSearchClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const isFilterPopoverOpen = Boolean(filterAnchorEl);


  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.third.main, maxHeight: '64px' }}>
      <Toolbar>
        {/* Logo and Menu Icon */}
        
        <div className="responsiveDiv">
          <Button onClick={() => navigate('/')}>
            <Typography variant="h6" noWrap sx={{ textTransform: 'none' }}>
            NTUgether
            </Typography>
          </Button>
        </div>

        <div className="responsiveDivS">
          <IconButton aria-label="home" onClick={() => navigate('/')}>
          <HomeIcon color="icon"/>
        </IconButton>
        </div>
        
        {/* Search Input */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="搜尋"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Spacer */}
        <div style={{ flexGrow: 1 }} />

        {/* Action Icons */}

        <Button 
          aria-label="location"
          aria-controls="location-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleLocationIconClick}
          endIcon={<KeyboardArrowDownIcon color="icon"/>}
          startIcon={<LocationOnIcon color="icon"/>}
          sx={{ color: 'black', textTransform: 'none', marginRight: '10px' , width: 100}}
        >
          <div className='responsiveDiv'>
            <Typography variant="body1" noWrap>
              {t(selectedLocation)}
            </Typography>
          </div>
        </Button>
        <Menu
          id="location-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'location-button',
          }}
        >
          <MenuItem onClick={() => handleLocationSelect('北部')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>{t('北部')}</MenuItem>
          <MenuItem onClick={() => handleLocationSelect('中部')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>{t('中部')}</MenuItem>
          <MenuItem onClick={() => handleLocationSelect('南部')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>{t('南部')}</MenuItem>
          <MenuItem onClick={() => handleLocationSelect('東部')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>{t('東部')}</MenuItem>
        </Menu>


        <IconButton aria-label="favorite" onClick={() => navigate('/favorite-activity')}>
          <FavoriteBorder color="icon"/>
        </IconButton>
        
        <IconButton aria-label="notification" onClick={() => toggleNotification()} >
          <Badge badgeContent={2} color="secondary" max={99}>
            <NotificationsIcon color="icon"/>
          </Badge>
        </IconButton>
        {showNotifiaction? 
        <ClickAwayListener onClickAway={() => setShowNotifiaction(false)}>
        <Paper elevation={2} sx={{position: 'fixed', inset: '0px 0px auto auto', m: 0, transform: 'translate(-10px, 70px)', zIndex:2}}>
          <NotificationList />
        </Paper>
        </ClickAwayListener>: null}
        
        <IconButton edge="end" aria-label="account of current user" id="account-button"
        aria-controls={openAccountList ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openAccountList ? 'true' : undefined}
        variant="contained"
        onClick={handleAccountClick}>
          <Face color="icon"/>
      </IconButton>
      <StyledMenu
        id="account-menu"
        MenuListProps={{
          'aria-labelledby': 'account-button',
        }}
        anchorEl={accountAnchor}
        open={openAccountList}
        onClose={handleClose}
        
      >
        <MenuItem onClick={() => navigate('/userprofile')} sx={{ justifyContent: 'center'}}>
          {t('個人頁面')}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => navigate('/activityattendpage')} sx={{ justifyContent: 'center'}}>
        {t('活動紀錄')}
        </MenuItem>
        <MenuItem onClick={() => navigate('/planManage')} sx={{ justifyContent: 'center'}}>
        {t('進度紀錄')}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLanguageClick} sx={{ justifyContent: 'center'}} id="language-button" aria-controls={openLanguageToggl ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openLanguageToggl ? 'true' : undefined}>
          繁體中文/English
        </MenuItem>
        <MenuItem onClick={logout} sx={{ justifyContent: 'center'}}>
            <Button variant="contained">
            {t('登出')}
            </Button>
        </MenuItem>
      </StyledMenu>
      <Menu
              id="language-menu"
              anchorEl={languageAnchor}
              open={openLanguageToggl}
              onClose={() => setlanguageAnchor(null)}
              MenuListProps={{
                'aria-labelledby': 'language-button',
              }}
              sx={{transform:'translateX(-105px) translateY(-40px)'}}
            >
              <MenuItem onClick={() => handleLanguageSelect('zh-tw')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>繁體中文</MenuItem>
              <MenuItem onClick={() => handleLanguageSelect('en')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>English</MenuItem>
            </Menu>
      </Toolbar>
    </AppBar>
  );
}
