import React from 'react';
import logo from '../../assets/images/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import '../../App.css';
import { AppContext } from "../../context/Provider";
import { useContext } from "react";
import { signOut } from "../../context/actions/signout";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));
  

const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const history = useHistory();

    const {
      authDispatch,
  } = useContext(AppContext);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
    
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const logout = () => {
        handleMenuClose();
        signOut(history)(authDispatch);
    }



    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to='/dashboard'>Profile</MenuItem>
        <MenuItem onClick={() => logout()}>Log out</MenuItem>
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
            <Button color="inherit" component={Link} to={'/'}>How it works?</Button>
        </MenuItem>
        <MenuItem>
            <Button color="inherit" component={Link} to={'/'}>Contact</Button>
        </MenuItem>
        {localStorage.getItem('isAuth') === 'true' ?
            <div>
            <MenuItem>
                <Button color="inherit" component={Link} to={'/dashboard'}>Profile</Button>
            </MenuItem>
            <MenuItem>
                <Button color="inherit" onClick={() => logout()}>Logout</Button>
            </MenuItem>
            </div>
            :
            <MenuItem>
                <Button color="inherit" component={Link} to={'/login'}>Login</Button>
            </MenuItem>
        }
      </Menu>
    );
    return (
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
                <Link to='/'><img className={classes.logo}
                src={logo}
                width = {60}
                 /></Link>
              <Typography className={classes.title} variant="h6" noWrap>
                Summarize.it
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Button color="inherit">How it works?</Button>
                <Button color="inherit" component={Link} to={'/'}>Contact</Button>
                {localStorage.getItem('isAuth') == 'true' ?
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    :
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        component= {Link}
                        to={'/login'}
                        color="inherit"
                    >
                        <ExitToAppIcon />
                    </IconButton>
                }
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
      );

    /*
    return (
        <Menu secondary pointing >
            <Image src={logo} width={60} />
            <Menu.Item as={ Link } to='/'style={{fontSize:22, marginLeft: -25 }}>Summarize.it</Menu.Item>
            <Menu.Item className="submenu" position="right" as={ Link } to='/'style={{fontSize:22}}>How it works?</Menu.Item>
            <Menu.Item className="submenu" as={ Link } to='/dashboard'style={{fontSize:22}}>Contact</Menu.Item>
            <Menu.Item >
                { localStorage.getItem('isAuth') == 'true' ?
                    <Button style={{ margin:0 }} onClick={() => logout()} color='red' basic icon>
                        <Icon name="sign-out"></Icon>
                    Logout
                    </Button> :
                    <Button style={{margin:0}} as={ Link } to='/login' color='blue' basic icon>
                        <Icon name="sign-in"></Icon>
                        Login
                    </Button>
                }
            </Menu.Item>
        </Menu>
    )
*/
};

export default Header;

