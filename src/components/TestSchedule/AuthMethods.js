// createUser = () => {
  //   const email = 'testinguser@gmail.com';
  //   const password = '123456';

  //   auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     console.log('erorr register: ', error);
  //   });
  // }

  // signInUser = () => {
  //   const email = 'testinguser@gmail.com';
  //   const password = '123456';
  //   auth.signInWithEmailAndPassword(email, password)
  //   .then(() => {
  //     var user = auth.currentUser;
  //     console.log('signed in successfully');
  //     console.log('user: ', user);
  //     this.setState({ user: user});
  //   })
  //   .catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     console.log('erorr signIn: ', error);
  //   });    
  // }

  // writeTeacher = () => {
  //   const dummyData = {
  //     location: "New Security Rules",
  //     name: "Test Name"
  //   };

  //   const userData = this.state.user;
  //   database.ref(`/teachers/${userData.uid}`).set(dummyData, (error) => {
  //     if (error) {
  //       console.log('error occurred', error);
  //     } else {
  //       console.log('success');
  //     }
  //   });
  // }

  // logoutUser = () => {
  //   auth.signOut().then(function() {
  //     // Sign-out successful.
  //     console.log('sign out success')
  //   }).catch(function(error) {
  //     // An error happened.
  //     console.log('error signed out...')
  //   });
  // }

  {/* <button onClick={this.createUser}>Register User</button> */}
  {/* <button onClick={this.signInUser}>Sign In User</button> */}
  {/* <button onClick={this.writeTeacher}>Write to teacher</button> */}
  {/* <button onClick={this.logoutUser}>Signout</button> */}