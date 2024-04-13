


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
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useTheme} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

export default function HeaderBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState('北部');

  const handleLocationIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.third.main }}>
      <Toolbar>
        {/* Logo and Menu Icon */}
        <IconButton edge="start" color="icon" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        
        <Button onClick={() => navigate('/')}>
        <Typography variant="h6" noWrap>
        NTUgether
        </Typography>
        </Button>
        
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
          <Typography variant="body1" noWrap>
            {selectedLocation}
          </Typography>
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
          <MenuItem onClick={() => handleLocationSelect('北部')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>北部</MenuItem>
  <MenuItem onClick={() => handleLocationSelect('中部')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>中部</MenuItem>
  <MenuItem onClick={() => handleLocationSelect('南部')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>南部</MenuItem>
  <MenuItem onClick={() => handleLocationSelect('東部')} sx={{ width: '100px', justifyContent: 'center', textAlign: 'center' }}>東部</MenuItem>
        </Menu>


        <IconButton aria-label="favorite">
          <FavoriteBorder color="icon"/>
        </IconButton>
        <IconButton aria-label="notification">
          <NotificationsIcon color="icon"/>
        </IconButton>
        <IconButton edge="end" aria-label="account of current user">
          <AccountCircle color="icon"/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
