import React, {Component} from 'react';
import SignIn from './signIn';
import SignUp from './signUp';
import Home from './home';
import Feedback from './feedback';
import BookingParking from './bookparking';
import Admin from './admin/admin'
import '../App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class Parkingrouter extends Component {
    render() {
        return (
        <Router>
          <div className="mainDiv"> 
         <Route exact path="/" component={SignIn}/>
         <Route  path="/signup" component={SignUp}/>
         <Route path="/home" component={Home} />
         <Route path="/feedback" component={Feedback} />
         <Route path="/bookparking" component={BookingParking} />
         <Route path="/admin" component={Admin} />
         </div>
        </Router>
        )
    }
} 

export default Parkingrouter;

