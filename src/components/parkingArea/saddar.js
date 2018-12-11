import React, {Component} from 'react';
import {DatePicker,RaisedButton,TimePicker,FlatButton,Dialog } from 'material-ui';
import * as firebase from 'firebase';
import Appbar from '../appBar'

class  Saddar extends Component {
    constructor() {
        super();
        this.state = {
            date:'',
            fromTime:'',
            toTime:'',
            showSlotFlag:false,
            slotArray: [],
            saveFromTime:'',
            saveToTime:'',
            saveDate:'',
            userUid:'',
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({userUid:user.uid})
        })
        firebase.database().ref('parking/saddar').on(
            'value', snap => {
                let array = [];
                array.push(snap.val().slot1)
                array.push(snap.val().slot2)
                array.push(snap.val().slot3)
                array.push(snap.val().slot4)
                array.push(snap.val().slot5)
                array.push(snap.val().slot6)
                array.push(snap.val().slot7)
                array.push(snap.val().slot8)
                array.push(snap.val().slot9)
                array.push(snap.val().slot10)
                array.push(snap.val().slot11)
                array.push(snap.val().slot12)
                array.push(snap.val().slot13)
                array.push(snap.val().slot14)
                array.push(snap.val().slot15)
                this.state.slotArray =  array
                this.setState({slotArray:this.state.slotArray})
            }
        )
    }
    checkValueAndShowSlot() {
        let currentDate = new Date();
        let currentTime = new Date();
        if(this.state.date !== '' && this.state.fromTime !== '' && this.state.toTime !== '') {
              if(this.state.date.setHours(0,0,0,0) >= currentDate.setHours(0,0,0,0)) {
                  if(currentDate.getDate() === this.state.date.getDate()) {
                         if(this.state.fromTime.getTime() > currentTime.getTime() && this.state.toTime.getTime() > currentTime.getTime()) {
                             if(this.state.toTime.getTime() > this.state.fromTime.getTime()) {
                                 this.setState({showSlotFlag:true})
                                } else{alert("Time is not valid")}
                            } else{alert("Time is not valid")}
                  } else {
                        if(this.state.toTime.getTime() > this.state.fromTime.getTime()) {
                            this.setState({showSlotFlag:true})
                        }
                  }
                } else {alert('Previous date is not acceptable')}
            } else {alert('Please fill out fields')}
    }

    render() {
        const  styles = {
            mainDiv: {

                backgroundColor:'#E3F1FF',
                opacity:0.9,
                width:500,
                height:300,
                margin:'0 auto',
                padding:10,
                borderRadius:10,
                marginTop:5,
                textAlign:'center'
            }
        }
        return (
    
            <div>
 <Appbar send={this.props}/>
  <div style={styles.mainDiv}>
  <h1>Saddar</h1>
  
 <DatePicker hintText="Date" mode="landscape" onFocus={() => this.setState({showSlotFlag:false})} value={this.state.saveDate} onChange={(n,value) => this.setState({date:value,saveDate:value})}/>
 <TimePicker hintText="Time From" autoOk={true}  onFocus={() => this.setState({showSlotFlag:false})} value={this.state.saveFromTime} onChange={(n,value) => this.setState({fromTime:value,saveFromTime:value})}/>
<TimePicker hintText="Time To" autoOk={true}  onFocus={() => this.setState({showSlotFlag:false})} value={this.state.saveToTime} onChange={(n,value) => this.setState({toTime:value,saveToTime:value})}/>
  <RaisedButton label="submit" primary={true}  onClick={() => this.checkValueAndShowSlot()} />
  </div>
  
      {this.state.showSlotFlag ? <ShowSlots send={this.state}/> : ""  }  

  </div> 
  
        )
    }
}




class ShowSlots  extends Component {
        constructor() {
        super();
        this.state = {
            open:false,
            TimeSaveArray:[],
            slotNumber:'',
            DateArray:[],
            slotLength:''
        }
    }
componentWillMount() {
    firebase.database().ref(`user/${this.props.send.userUid}/bookParking`).on("value",snap => {
        var parkArray = [];
        if(snap.val() !== null) {
            snap.val().map((value) => {parkArray.push(value)})
            this.setState({DateArray:parkArray})
        }
        
    });
}

    handleOpen = (index) => {
        this.setState({slotNumber:index})
        firebase.database().ref(`parking/saddar/slot${index}`).on(
            'value', snap => {
              this.state.TimeSaveArray = Object.values(snap.val());
             this.setState({TimeSaveArray:this.state.TimeSaveArray,slotLength:this.state.TimeSaveArray.length})
            }
        )
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
      dialogSubmitButton = () => {
        this.state.TimeSaveArray.push( {
            from:this.props.send.fromTime.getTime(),
            to:this.props.send.toTime.getTime(),
            date:this.props.send.date.getDate(),
            month:this.props.send.date.getMonth(),
        })
         
        firebase.database().ref(`parking/saddar/slot${this.state.slotNumber}`).set(this.state.TimeSaveArray)
        let Data = firebase.database().ref(`user/${this.props.send.userUid}/bookParking`);
 
        var values = {
            area:'saddar',
           startTime:this.props.send.fromTime.getHours() + " : " + this.props.send.fromTime.getMinutes(),
          endTime:this.props.send.toTime.getHours() + " : " + this.props.send.toTime.getMinutes(),
          slot:this.state.slotNumber,
          fullDate: this.props.send.date.getDate() + " / " +  this.props.send.date.getMonth() + " / " + this.props.send.date.getFullYear(), 
            slotIndex: this.state.slotLength
        }
           this.state.DateArray.push(values)
          Data.set(this.state.DateArray)
        

          this.handleClose()
      }
    render() {
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
                          onClick={this.dialogSubmitButton}
                        />,
                      ];
                      var bgcolor = 'red'
                      // copy of this section
        return (
            <div style={{marginTop:30,marginLeft:'20%'}}>
                            {this.props.send.slotArray.map((value,index) => <span key={index} style={{margin:10}}>
                         { value.map((val,ind) => { bgcolor = 'red'
                                if(this.props.send.date.getMonth() === val.month) {
                                    if(this.props.send.date.getDate() === val.date) {
                                        if(val.from >= this.props.send.fromTime.getTime() && val.from >=  this.props.send.toTime.getTime() || val.to <= this.props.send.fromTime.getTime() && val.to <= this.props.send.toTime.getTime()) {
                                            bgcolor = 'red' 
                                        } else {
                                            bgcolor = 'yellow'
                                        } 
                                    }
                                    
                                }
                                
                            })}
                            
                            {bgcolor === 'red' ?          <span><RaisedButton label={'Slot '+ ++index } overlayStyle={{backgroundColor:bgcolor}}   onClick={() => this.handleOpen(index)} />
                            <Dialog
                              title="Dialog With Actions"
                              actions={actions}
                              modal={false}
                              open={this.state.open}
                              onRequestClose={this.handleClose}
                            
                            >
                              The actions in this window were passed in as an array of React objects.
                            </Dialog> </span> : <span><RaisedButton label={'Slot '+ ++index} overlayStyle={{backgroundColor:bgcolor}}   />
                            <Dialog
                              title="Dialog With Actions"
                              actions={actions}
                              modal={false}
                              open={this.state.open}
                              onRequestClose={this.handleClose}
                            
                            >
                              The actions in this window were passed in as an array of React objects.
                            </Dialog> </span>}
                    
                            </span>
                            )}
                        </div>
        )
    }
}


export default  Saddar;