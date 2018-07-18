import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Home from '../components/Home/Home';
import Cart from '../components/Cart/Cart';
import { connect } from 'react-redux';
import { setLocation } from '../modules/actions/navigation';

class RouterContainer extends Component {

  componentWillMount() {
    const { history } = this.props;
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  handleLocationChange = (location) => {
    // Send location to redux store, used by NavGameBar.js
    this.props.setLocation(location.pathname);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/cart' component={Cart} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  navigationReducer: state.navigationReducer,
});

const mapDispatchToProps = ({
  setLocation: setLocation,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouterContainer));