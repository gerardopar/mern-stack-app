import React, { Component } from 'react'; //react
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //react-router
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//redux
import { Provider } from 'react-redux'; //redux
import store from './store'; //redux store

//private route
import PrivateRoute from './components/common/PrivateRoute';

//components
import Navbar from './components/layout/Navbar';
import LandingPage from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import './App.css';
import { clearCurrentProfile } from './actions/profileActions';

//check for token
if(localStorage.jwtToken) {

    //set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
      //logout user
      store.dispatch(logoutUser());
      //clear current profile
      store.dispatch(clearCurrentProfile());
      //redirect to login
      window.location.href='/login';
    }

}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact={true} path="/" component={LandingPage} />
          <div>
          <Switch>
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/register" component={Register} />
            <PrivateRoute exact={true} path="/dashboard" component={Dashboard} />
            <PrivateRoute exact={true} path="/create-Profile" component={CreateProfile} />
          </Switch>
          </div>
          <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
