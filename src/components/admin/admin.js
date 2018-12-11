import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SlotsBooked from './slotsBooked';
import UserData from './usersData';
import FeedBackAdmin from './feedBack';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase'

class Admin extends Component {
    logOutFirebase() {
        firebase.auth().signOut().then(  this.func())
    }
    func() {
        
        this.props.history.push('/')
    }
    render() {
        const styles = {
            headline: {
              fontSize: 24,
              paddingTop: 16,
              marginBottom: 12,
              fontWeight: 400,
            },
          };
        return (
            <div>
                <div style={{float:'right',position:'relative',height:0,zIndex:1}}>
            <RaisedButton  label="logout" overlayStyle={{backgroundColor:'#26d826',padding:6,zIndex:1}} onClick={() => this.logOutFirebase()} primary={true} />
            </div>
            <div style={{zIndex:2}}> 
    
                <Tabs>
            <Tab label="Slots booked" >
               <SlotsBooked/>
            </Tab>
            <Tab label="Users data">
               <UserData/>
            </Tab>
            <Tab label="Feedbacks" overlayStyle={{zIndex:2}}>
               <FeedBackAdmin/>
            </Tab>
            </Tabs>
                   </div>
                   </div>
        )
    }
}

export default Admin;