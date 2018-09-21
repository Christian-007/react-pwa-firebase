import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Cart from '../components/Cart/Cart';
import { connect } from 'react-redux';
import { setLocation, setUser } from '../modules/actions/navigation';
import Login from '../components/Login/Login';
import HomeSections from '../components/HomeSections/HomeSections';
import TestSchedule from '../components/TestSchedule/TestSchedule';

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
    console.log('route change', location.pathname);
    
    // window.dataLayer.push({
    //   event: 'authenticated',
    //   userId: '12345'
    // })
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomeSections} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/testSchedule' component={TestSchedule} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  navigationReducer: state.navigationReducer,
});

const mapDispatchToProps = ({
  setLocation: setLocation,
  setUser: setUser,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouterContainer));