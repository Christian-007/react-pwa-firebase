import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import './HomeStyling.css';


class Home extends Component {

  render() {
    return (
      <CSSTransition
        in
        classNames="fade"
        appear={true}
        timeout={1000}>
        <div className="bgImg">
        </div>
      </CSSTransition>
    )
  }
}

export default Home;
