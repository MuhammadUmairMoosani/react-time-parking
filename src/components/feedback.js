import React, {Component} from 'react';
import {TextField,FlatButton,RaisedButton } from 'material-ui';
import * as firebase from 'firebase';
import Appbar from './appBar'
import Paper from 'material-ui/Paper';



class Feedback extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            feedback:'',
            userUid:'',
            feedbackSave:[],
            replyArray:[]
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({userUid:user.uid})
            this.afterRun() 
        })
    }
    logOutFirebase() {
        firebase.auth().signOut().then(() => this.props.history.push('/'))
    }
    saveFeedBack() {
        if(this.state.feedback !== "") {

            let array = this.state.feedbackSave;
              array.push(this.state.feedback)
            this.setState({feedback:''})
             firebase.database().ref(`user/${this.state.userUid}/feedback`).set(array);
        } else {
            alert("Please type feedback")
        }
    }
    afterRun() {
        firebase.database().ref(`user/${this.state.userUid}`).on(
            'value',snap => {
                if(snap.val().feedback) {
                    this.state.replyArray = snap.val().reply
                    this.state.feedbackSave = snap.val().feedback 
                    this.setState({feedbackSave:this.state.feedbackSave})
                } else {
                    this.setState({feedbackSave:[],replyArray:[]})
                }
              
            }
        )
    }
    deleteFeedBack(index) {
         let deleteArray = this.state.feedbackSave;
         deleteArray.splice(index,1)
       firebase.database().ref(`user/${this.state.userUid}/feedback`).set(deleteArray)
       firebase.database().ref(`user/${this.state.userUid}/reply/${index}`).remove()
    }
    render() {
        const styles = {
            valueDiv: {
                backgroundColor:'white',
                width:"25%",
                marginTop:20,
                padding:30,
                textAlign:'center',
                float:'left',
                marginLeft:'2%',
                height:160
            }
        }
        return(
            <div>
               <Appbar send={this.props}/>
               <Paper zDepth={5} style={{textAlign:'center', width:'35%',margin:'0px auto'}}>
               <h1  style={{backgroundColor:'rgba(255,255,255, 0.2)'}}>Feedback</h1>
               <TextField hintText="feedback" value={this.state.feedback} style={{backgroundColor:'rgba(255,255,255,0.2)',borderRadius:5,marginBottom:5}} onChange={(value) => this.setState({feedback:value.target.value})} /><br />
               <FlatButton label="Submit" onClick={() => this.saveFeedBack()} primary={true} style={{backgroundColor:'rgba(255,255,255, 0.2)'}}  />
               </Paper>
               <div style={{height:410,overflow:'auto',marginTop:10}} >{this.state.feedbackSave.map((value,index) => 
                  <div key={index} style={styles.valueDiv}>
                  <b style={{color:'#1de41d'}}>Feedback  </b>
                   <div  style={{padding:10,fontWeight:'bold',fontSize:25}}>{value}</div>
                   <div> <b> {this.state.replyArray ? this.state.replyArray[index] ? <div> 
                       <b  style={{color:'#1de41d'}}>Reply</b> <br/>  {this.state.replyArray[index]}
                       </div> : "" :"" }
                       </b></div> 
                       <div><RaisedButton style={{marginTop:5}} label="delete" 
                       onClick={() => this.deleteFeedBack(index)} primary={true}  /></div>
                    </div>
               )}</div>
            </div>
        )
    }
}

export default Feedback;