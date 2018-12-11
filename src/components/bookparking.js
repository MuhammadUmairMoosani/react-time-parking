import React, {Component} from 'react';
import {RaisedButton,DatePicker,TimePicker,Dialog,FlatButton } from 'material-ui';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import Appbar from './appBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class BookingParking extends Component {
    constructor() {
        super();
        this.state = {
            selectAreaFlag:false,
            area:'',
            slot:[],
            open:false,
            showSlotsFlag:false,
            date:'',
            startTime:'',
            endTime:'',
            userUid:'',
            slotNumber:'',
            email:''
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => this.setState({userUid:user.uid,email:user.email}))
    }
    logOutFirebase() {
        firebase.auth().signOut().then(() => this.props.history.push('/'))
    }
    onClickFunction(place) {
      this.setState({area:place,selectAreaFlag:true})
    }
    selectAreaButton() {
        const style = {
            margin: 12,
            buttonDiv: {
               textAlign:'center',
               marginTop:100
            }
          }
        return           <div style={style.buttonDiv}>
        <h1 style={{color:'white'}}>Select parking area</h1>
      <RaisedButton label="Saddar Parking area" primary={true} style={style} onClick={() => this.onClickFunction('Saddar')} /><br />
       <RaisedButton label="korangi parking area" primary={true} style={style} onClick={() => this.onClickFunction('Korangi')} /><br />
      <RaisedButton label="nazimabad parking area" primary={true} style={style} onClick={() => this.onClickFunction('Nazimabad')} />
        </div> 
    }
    handleOpen (index)  {
        this.setState({open: true,slotNumber:index});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
      onSubmit = () => {
          let data = {
              startTime:this.state.startTime.getTime(),
              endTime:this.state.endTime.getTime(),
              date:[this.state.date.getDate(),this.state.date.getMonth(),this.state.date.getFullYear()],
              userUid:this.state.userUid,
              slotNumber:this.state.slotNumber,
              area:this.state.area,
              email:this.state.email
          }
        firebase.database().ref('parking').push(data)
        this.setState({open: false});
      }
      checkInputValueAndShowSlot() {
                let temSlot = []
        for(let i = 1;i <= 20;i++) {
           temSlot.push(true)
        }
        this.state.slot = temSlot
        this.setState({slot:this.state.slot})
        let currentDate = new Date();
        let currentTime = new Date();
        if(this.state.date !== '' && this.state.startTime !== '' && this.state.endTime !== '') {
              if(this.state.date.setHours(0,0,0,0) >= currentDate.setHours(0,0,0,0)) { 
                  if(currentDate.getDate() === this.state.date.getDate()) {
                         if(this.state.startTime.getTime() > currentTime.getTime() && this.state.endTime.getTime() > currentTime.getTime()) {
                             if(this.state.endTime.getTime() > this.state.startTime.getTime()) {
                                firebase.database().ref('parking').on(
                                    'value', snap => {
                                        let value = snap.val()
                                         //  checking slots book or not 
                                        for(let i in value) {
                                            if(value[i].area === this.state.area) {
                                                if(value[i].date[2] === this.state.date.getFullYear()) {
                                                    if(value[i].date[1] === this.state.date.getMonth()) {
                                                        if(value[i].date[0] === this.state.date.getDate()) {
                                                            if(this.state.startTime.getTime() < value[i].startTime && this.state.endTime.getTime() < value[i].startTime || this.state.startTime.getTime() > value[i].endTime && this.state.endTime.getTime() > value[i].endTime) {
                                                            } else {this.state.slot[value[i].slotNumber - 1] = false,this.setState({slot:this.state.slot})}
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        this.setState({showSlotsFlag:true})
                                    }
                                )
                                
                             } else{alert("Time is not valid")}
                         } else{alert("Time is not valid")}
                  } else {
                        if(this.state.endTime.getTime() > this.state.startTime.getTime()) {
                            firebase.database().ref('parking').on(
                                'value', snap => {
                                    let value = snap.val()
                                     //  checking slots book or not 
                                    for(let i in value) {
                                        if(value[i].area === this.state.area) {
                                            if(value[i].date[2] === this.state.date.getFullYear()) {
                                                if(value[i].date[1] === this.state.date.getMonth()) {
                                                    if(value[i].date[0] === this.state.date.getDate()) {
                                                        if(this.state.startTime.getTime() < value[i].startTime && this.state.endTime.getTime() < value[i].startTime || this.state.startTime.getTime() > value[i].endTime && this.state.endTime.getTime() > value[i].endTime) {
                                                        } else {this.state.slot[value[i].slotNumber - 1] = false,this.setState({slot:this.state.slot})}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    this.setState({showSlotsFlag:true})
                                }
                            )
                            
                        }
                  }
              } else {alert('Previous date is not acceptable')}
        } else {alert('Please fill out fields')}
    }
    selectTimeFrom() {
        const  styles = {
            mainDiv: {

                backgroundColor:'#E3F1FF',
                opacity:0.9,
                width:900,
                height:300,
                margin:'0 auto',
                padding:10,
                borderRadius:10,
                marginTop:5,
                textAlign:'center'
            }
        }
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.onSubmit}
            />,
          ];
          return <div style={{width:900,margin:'0 auto',marginTop:20,textAlign:'center'}}> 
           <Card >
          <CardHeader title={<h1 style={{marginLeft:"30%"}}>{this.state.area.toUpperCase()}</h1>} style={{backgroundColor:'#26d826'}}/>
              <DatePicker hintText="Date" autoOk={true} mode="landscape" onFocus={() => this.setState({showSlotsFlag:false})} value={this.state.date} onChange={(n,value) => this.setState({date:value})}/>
        <TimePicker hintText="Time From" autoOk={true}  onFocus={() => this.setState({showSlotsFlag:false})} value={this.state.startTime} onChange={(n,value) => this.setState({startTime:value})}/>
       <TimePicker hintText="Time To" autoOk={true}  onFocus={() => this.setState({showSlotsFlag:false})} value={this.state.endTime} onChange={(n,value) => this.setState({endTime:value})}/>
         <RaisedButton label="submit" primary={true}  onClick={() => this.checkInputValueAndShowSlot()} />
         <RaisedButton label="back" primary={true} style={{marginLeft:10,marginBottom:30}} onClick={() => this.setState({selectAreaFlag:false,showSlotsFlag:false,date:'',startTime:'',endTime:''})} />
      
       <div style={{marginTop:100}}> { this.state.showSlotsFlag ? this.state.slot.map((value,index) => <span key={index}>
          {value ? <span>  <RaisedButton label={"slot" + (index + 1)} overlayStyle={{opacity:1,backgroundColor:'#757EDC'}} onClick={() => this.handleOpen(index+1)} style={{margin:8}} />
         <Dialog
          title="Click submit button to book slot"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        </Dialog></span> 
         : <RaisedButton label={"slot" + (index + 1)} disabled={true}  overlayStyle={{backgroundColor:'#757EDC'}} style={{margin:8}}  />
       }
       </span>) : ""}</div>
        </Card>
        </div>

    }
    render() {
        return(
            <div>
            <Appbar send={this.props}/>
            {this.state.selectAreaFlag ? this.selectTimeFrom()  : this.selectAreaButton()}
            </div>
        )
    }
}

export default BookingParking;