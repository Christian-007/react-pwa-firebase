import React, { Component } from 'react';
import './App.css';
import NavGameBar from './components/NavGameBar/NavGameBar';
import RouterContainer from './router-navigation/RouterContainer';
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App fullScreen">
          <NavGameBar />
          <RouterContainer />
        </div>
      </Router>
    );
  }
}

export default App;
