import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Popover, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import './NavStyle.css';
import logo from '../../assets/images/psicon.png';
import { auth } from '../../modules/firebase/firebase';
import { removeUser } from '../../modules/actions/navigation';
import { Link, withRouter } from 'react-router-dom';
// import Cookies from 'universal-cookie';

class NavGameBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = e => {
      this.setState({ target: e.target, show: !this.state.show });
    };

    this.state = {
      show: false
    };
  }

  signOut = () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      console.log('signed out');
      this.props.removeUser();
      this.props.history.push('/login');
    }).catch(error => {
      // An error happened.
      console.log('error happened', error);
    });
  }

  popoverFocus = () => {
    return (
      <Popover id="popover-trigger-focus" title="Popover bottom">
        <p onClick={this.signOut}>Sign out</p> 
      </Popover>
    )
  }

  renderNavLink = () => {
    // const cookies = new Cookies();
    if (this.props.navigationReducer.user === null) {
      return (
        <NavItem eventKey={2} componentClass={Link} href="/login" to="/login">
          LOGIN
          <FontAwesome name="user-circle-o" className="right-arrow" />
        </NavItem>
      )
    } else {
      return (
        <OverlayTrigger trigger="focus" placement="bottom" overlay={this.popoverFocus()}>
          <NavItem>
            <FontAwesome name="user-circle-o" />
          </NavItem>
        </OverlayTrigger>
      )
    }
  }

  render() {
    const currentURL = this.props.navigationReducer.location;
    const userData = this.props.navigationReducer.user;
    return (
      <div className="navbar-wrapper">
        <Navbar collapseOnSelect className={currentURL === '/'? 'custom-nav opacity': 'custom-nav'}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                <img src={logo} width="60" height="60" alt="PS Icon"/>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                GAMES
              </NavItem>
              <NavItem eventKey={2} href="#">
                PS4
              </NavItem>
              <NavItem eventKey={3} href="#">
                MOVIES
              </NavItem>
              <NavItem eventKey={4} href="#">
                TV
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} componentClass={Link} href="/travel" to="/travel">
                SEARCH
                <FontAwesome name="search" className="right-arrow"/>
              </NavItem>
              <NavItem eventKey={2} componentClass={Link} href="/cart" to="/cart">
                CART
                <FontAwesome name="shopping-bag" className="right-arrow" />
              </NavItem>
              {
              userData === null ? 
              (
                <NavItem eventKey={2} componentClass={Link} href="/login" to="/login">
                  LOGIN
                  <FontAwesome name="user-circle-o" className="right-arrow" />
                </NavItem>
              ) :
              (
                <OverlayTrigger trigger="focus" placement="bottom" overlay={this.popoverFocus()}>
                  <NavItem>
                    <FontAwesome name="user-circle-o" />
                  </NavItem>
                </OverlayTrigger>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar> 
        <div className="gradient-line"></div>
      </div>
      
    )
  }
}

const mapStateToProps = (state) => ({
  navigationReducer: state.navigationReducer,
});

export default withRouter(connect(mapStateToProps, { removeUser })(NavGameBar));