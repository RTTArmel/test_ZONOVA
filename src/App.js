import React from 'react';
// import { connect } from 'react-redux'
// import axios from 'axios'
// import { Redirect } from 'react-router-dom'
// import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from "mdbreact";
// import { MDBNavbar, MDBInput, MDBBtn, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer } from "mdbreact";
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import TopNavigation from './topNavigation'
import ShortMenu from './list'
import Routes from './routes'

function App() {
  return (
    <div>
      <TopNavigation />
      <br/>
      <ShortMenu />
    </div>
  );
}

export default App;