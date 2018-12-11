import React, { Component } from 'react';
import { Table, TableBody, TableRowColumn, TableRow, FlatButton,Divider } from 'material-ui';
import * as firebase from 'firebase';
import AppbarCom from './appBar'



class Home extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            userUid: '',
            bookedArray: [],
            ArrayIValue:[]
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ userUid: user.uid })
        })
        firebase.database().ref('parking').on(
            'value', snap => {
                let temArray = []
                let temIValue = []
                let value = snap.val()
                for(let i in value) {
                   temArray.push(value[i])
                   temIValue.push(i)
                }
                this.setState({bookedArray:temArray,ArrayIValue:temIValue})
            }
        )
    }
    logOutFirebase() {
        firebase.auth().signOut().then(() => this.props.history.push('/'))
    }
     msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }
    delete(index) {
      firebase.database().ref(`parking/${this.state.ArrayIValue[index]}`).remove()
    }
render() {
    return (
        <div><AppbarCom send={this.props} />
        
        <Table  >
        <TableBody displayRowCheckbox={false}>
            <TableRow>
               <TableRowColumn><b>Area</b></TableRowColumn>
                <TableRowColumn><b>Slot</b></TableRowColumn>
                <TableRowColumn><b>Date</b></TableRowColumn> 
                <TableRowColumn><b>From time</b></TableRowColumn>
                <TableRowColumn><b>To time</b></TableRowColumn>
                <TableRowColumn><b>Cancel</b></TableRowColumn>
            </TableRow>
        </TableBody>
    </Table><hr />
        
    {this.state.bookedArray.map((value,index) => {
        if(value.userUid === this.state.userUid) {
            return  <div><Table>
            <TableBody displayRowCheckbox={false} >
                <TableRow>
                   <TableRowColumn>{value.area}</TableRowColumn>
                    <TableRowColumn>{value.slotNumber}</TableRowColumn>
                    <TableRowColumn>{value.date[0] + '/' + value.date[1] + 1 + "/" + value.date[2]}</TableRowColumn>
                    <TableRowColumn>{this.msToTime(value.startTime)}</TableRowColumn>
                    <TableRowColumn>{this.msToTime(value.endTime)}</TableRowColumn>
                    <TableRowColumn><FlatButton label="Cancel" primary={true} onClick={() => this.delete(index)}/> </TableRowColumn>
                </TableRow>
            </TableBody>
        </Table> <Divider /></div>
        }
    })}

        </div>
    )
}
}
export default Home;