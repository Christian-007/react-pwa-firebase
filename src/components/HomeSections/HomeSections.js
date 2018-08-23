import React, { Component } from 'react';
import LandingImage from '../LandingImage/LandingImage';
import './Styling.css';

class HomeSections extends Component {
  render() {
    return (
      <div className="fullWidth">
        <LandingImage/>
        <p>HELLO</p>
      </div>
    )
  }
}

export default HomeSections;