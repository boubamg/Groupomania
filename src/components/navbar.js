import React from 'react';
import logo from '../logo.png';
import './navbar.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className="toolbar">
        <Link to={'/post'}><img src={logo} alt='Groupomania Logo' /></Link>
            
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}>
                    {localStorage.getItem("token") ?
                    <div>
                        <MenuItem><Link to={'/profile'}>Profil</Link></MenuItem>
                        <MenuItem><Link onClick={() => {localStorage.clear()}} to={'/'}>Déconnexion</Link></MenuItem>
                    </div> 
                   :  
                    <div>
                        <MenuItem><IconButton size="small" color="inherit" >
                            <Link to={'/'}>Connexion</Link>
                        </IconButton></MenuItem>
                        <MenuItem><IconButton size="small" color="inherit" >
                            <Link to={'/signup'}>Inscription</Link>
                        </IconButton></MenuItem>  
                    </div>}
                
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
