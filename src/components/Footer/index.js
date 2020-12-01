import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

import '../../App.css';

function Footer() {
  return (
    <div className='footer-container'>
    <Divider style={{backgroundColor:'#3f51b5'}}section />
    <div className='footer-div'>
      <p className="footer-text">
        Made with &nbsp; <i color='red' class="fa fa-heart"></i> &nbsp; by S-class
      </p>
      <p className="footer-text">
        &copy;{new Date().getFullYear()} Summarize.it &nbsp; | &nbsp; All rights reserved &nbsp; | &nbsp; Terms of Service | &nbsp; Privacy
      </p>
    </div>
    </div>
  );
}

export default Footer;