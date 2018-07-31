import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Popover, Overlay } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import './NavStyle.css';
import logo from '../../assets/images/psicon.png';
import { auth } from '../../modules/firebase/firebase';
import { removeUser } from '../../modules/actions/navigation';
import { Link } from 'react-router-dom';

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
    auth.signOut().then(function() {
      // Sign-out successful.
      console.log('signed out');
      this.props.removeUser();
    }).catch(function(error) {
      // An error happened.
      console.log('error happened');
    });
  }

  render() {
    const currentURL = this.props.navigationReducer.location;
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
              <NavItem eventKey={2} componentClass={Link} href="/login" to="/login">
                LOGIN
                <FontAwesome name="user-circle-o" className="right-arrow" />
              </NavItem>
              <NavItem onClick={this.handleClick}>
                <FontAwesome name="user-circle-o" size="2x" />
              </NavItem>
              <Overlay
                show={this.state.show}
                target={this.state.target}
                placement="bottom"
                container={this}
                containerPadding={20}
              >
                <Popover id="popover-trigger-click-root-close" onClick={this.signOut}>
                  Sign out
                </Popover>
              </Overlay>
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

export default connect(mapStateToProps, { removeUser })(NavGameBar);