import React,{Component} from 'react';
import * as firebase from 'firebase';
import { Table, TableBody, TableRowColumn, TableRow, FlatButton,RaisedButton,TextField,Dialog } from 'material-ui';

class FeedBackAdmin extends Component {
    constructor() {
        super();
        this.state = {
            ArrayFeedBack:[],
            ArrayUserUid:[],
            ArrayReply:[],
            ArrayEmail:[],
            ArrayName:[],
            replyfield:'',
            replyIndex:'',
            replyInd:'',
            open:false
        }
    }
    componentWillMount() {
        firebase.database().ref('user').on (
            'value', snap => {
             let userUids = [];
             let feedbackArray = [];
             let temReplyArray = [];
             let temEmail = [];
             let temName = [];
                let value = snap.val()
                for(let i in value) {
                    if(value[i].name !== 'admin') {
                        userUids.push(i)
                        feedbackArray.push(value[i].feedback)
                        temReplyArray.push(value[i].reply)
                        temEmail.push(value[i].email)
                        temName.push(value[i].name)
                    }
                }
                this.setState({ArrayFeedBack:feedbackArray,ArrayUserUid:userUids,ArrayReply:temReplyArray,ArrayEmail:temEmail,ArrayName:temName})
            }
        )
    }
    deleteFeedBack(index,ind) {
        let deleteArray  = this.state.ArrayFeedBack[index];
        deleteArray.splice(ind,1);
       firebase.database().ref(`user/${this.state.ArrayUserUid[index]}/feedback`).set(deleteArray)
        firebase.database().ref(`user/${this.state.ArrayUserUid[index]}/reply/${ind}`).remove()
     }
    replyFunction() {
        if(this.state.replyfield !== "") {
          
            firebase.database().ref(`user/${this.state.ArrayUserUid[this.state.replyIndex]}/reply/${this.state.replyInd}`).set(this.state.replyfield)
           this.setState({replyfield:''})
        }
        this.handleClose()
    }
    handleOpen() {
        this.setState({open: true});
      };
    
      handleClose () {
        this.setState({open: false});
      };
    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={() => this.handleClose()}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={() => this.replyFunction()}
            />,
          ];
        const styles = {
            valueDiv: {
                margin:'0 auto',
                backgroundColor:'white',
                width:600,
                marginTop:20,
                padding:30,
                textAlign:'center',
                
                
            }
        }
   
      

            return (
                <div>
                     <div>{this.state.ArrayFeedBack.map((value,index) => {
                          if(value !== undefined) {
                            return value.map((val,ind) =>  <div key={index}  style={styles.valueDiv}><b style={{color:'#1de41d'}}>Feedback </b><br/><div style={{padding:20,fontWeight:'bold',fontSize:25}}>{val}</div><br/>{this.state.ArrayReply[index] ?this.state.ArrayReply[index][ind] ? <div><b style={{color:'#1de41d'}}>Reply </b><br/> <b>{this.state.ArrayReply[index][ind]}</b><br/><br/><br/></div> : "" : ""} {<div><b>User name:</b>{this.state.ArrayName[index]}<br/><b>User email:</b>{this.state.ArrayEmail[index]}</div>} <div><RaisedButton style={{marginTop:5,marginRight:5}} label="delete" onClick={() => this.deleteFeedBack(index,ind)} primary={true}  />
                            <RaisedButton label="Reply" onClick={() => {this.handleOpen(),this.setState({replyIndex:index,replyInd:ind})}} overlayStyle={{backgroundColor:"#26d826"}}  />
        <Dialog
          title="Reply"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
           <TextField  value={this.state.replyfield} onChange={(value) => this.setState({replyfield:value.target.value})} hintText="Text"/>
        </Dialog>
      
                            </div></div>)
                          }
                     }
                    
                   )}</div>
                </div>
            )
        
    }
}


export default FeedBackAdmin;