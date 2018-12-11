import React, {Component} from 'react';
import {AppBar,IconButton, IconMenu,MenuItem,Drawer,Divider} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as firebase from 'firebase';
import  BookingParking from './bookparking';



class Appbar extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            userEmail:'',
            userName:'',
            userUid:''
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
          this.setState({userEmail:user.email,userUid:user.uid})
        
          firebase.database().ref(`user/${this.state.userUid}/name`).on(
            'value', snap => {
                this.state.userName = snap.val()
                this.setState({userName:this.state.userName})
            }
          )
        }
      
      )
    }
    logOutFirebase() {
        firebase.auth().signOut().then(() => this.props.send.history.push('/'))
    }
    handleToggle = () => this.setState({open: !this.state.open});
    
      handleClose = () => this.setState({open: false});
    render() {
        function handleActive(tab) {
            alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
          }
          const styles = {
            headline: {
              fontSize: 24,
              paddingTop: 16,
              marginBottom: 12,
              fontWeight: 400,
            },
          };

        const Logged = (props) => (
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
         
            >
              
              <p style={{margin:10}}><b>Name:</b>{this.state.userName}<br/><b>Email:</b>{this.state.userEmail} </p>
              <MenuItem style={{textAlign:'center'}} primaryText="Sign out" onClick={this.logOutFirebase.bind(this)} />
            </IconMenu>
          );
          if(this.state.userEmail) {
         if(this.state.userEmail === "admin@gmail.com") {
             return   <div></div>
         } else {
           return  <div>
            <AppBar title="Real Time Parking" style={{textAlign:'center'}} onLeftIconButtonTouchTap={this.handleToggle}  iconElementRight={<Logged/>}/>
            <Drawer
docked={false}
width={200}
open={this.state.open}
onRequestChange={(open) => this.setState({open})}
>
<MenuItem onClick={() => this.props.send.history.push('/home')}>Booked slot</MenuItem><Divider/>
<MenuItem onClick={() => this.props.send.history.push('/bookparking')}>Book parking</MenuItem><Divider/>
<MenuItem onClick={() => this.props.send.history.push('/feedback')}>Feed back</MenuItem>

</Drawer>
  </div>
         }} else {
             return <div></div>
         }
     
        
    }
}

export default Appbar;