import React, { Component } from 'react';
import './LoginStyling.css';
import { auth, googleAuth } from '../../modules/firebase/firebase';
import { connect } from 'react-redux';
import { setUser } from '../../modules/actions/navigation';

class Login extends Component {

  onClickLogin = () => {
    auth.signInWithPopup(googleAuth).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      
      // The signed-in user info.
      let user = result.user;
      
      console.log('logged in successfully');
      this.props.setUser(user);

    }).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      
      console.log('error', errorCode);
      console.log('errorMessage', errorMessage);
      console.log('email', email);
      console.log('credential', credential);
    });
  }

  render() {
    return (
      <div id="login" className="componentWrapper">   
        <div className="container">
          <div className="login-box">
          <h3>Log in using</h3>    
            <button className="btn firebase-login" onClick={this.onClickLogin}>
              <span>
                <img className="firebaseui-idp-icon" alt="Google" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" height="20" width="20" />
              </span>
              <span className="text-login">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { setUser })(Login);