import React from 'react';
import { Menu, Image, Button, Icon} from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import '../../App.css';
import { AppContext } from "../../context/Provider";
import { Auth } from 'aws-amplify';
import { useState, useContext, useEffect } from "react";
import { signOut } from "../../context/actions/signout";

const Header = () => {

    const [isUserAuthorized, setIsUserAuthorized] = useState(false);

    const logout = () => {
        signOut()(authDispatch);
    }

    const {
        authDispatch,
        authState: {
          auth: { isAuth },
        },
      } = useContext(AppContext);

    
    useEffect(() => {
        setIsUserAuthorized(isAuth);
      }, [isAuth]);

    return (
        <Menu secondary pointing >
            <Image src={logo} width={60} />
            <Menu.Item as={ Link } to='/'style={{fontSize:22, marginLeft: -25 }}>Summarize.it</Menu.Item>
            <Menu.Item className="submenu" position="right" as={ Link } to='/'style={{fontSize:22}}>How it works?</Menu.Item>
            <Menu.Item className="submenu" as={ Link } to='/'style={{fontSize:22}}>Contact</Menu.Item>
            <Menu.Item >
                { isUserAuthorized ?
                    <Button style={{ margin:0 }} as={ Link } onClick={() => logout()} to='/' color='red' basic icon>
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
};

export default Header;