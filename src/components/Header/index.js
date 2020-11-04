import React from 'react';
import { Menu, Image, Button, Icon} from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import '../../App.css';

const Header = () => {
    return (
        <Menu secondary pointing >
            <Image src={logo} width={60} />
            <Menu.Item as={ Link } to='/'style={{fontSize:22, marginLeft: -25 }}>Summarize.it</Menu.Item>
            <Menu.Item className="submenu" position="right" as={ Link } to='/'style={{fontSize:22}}>How it works?</Menu.Item>
            <Menu.Item className="submenu" as={ Link } to='/'style={{fontSize:22}}>Contact</Menu.Item>
            <Menu.Item >
                <Button style={{margin:0}} as={ Link } to='/login' color='red' basic icon>
                    <Icon name="sign-out"></Icon>
                    Logout
                </Button>
            </Menu.Item>
        </Menu>
    )
};

export default Header;