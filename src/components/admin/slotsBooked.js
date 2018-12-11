import React,{Component} from 'react';
import * as firebase from 'firebase';
import { Table, TableBody, TableRowColumn, TableRow, FlatButton,Divider } from 'material-ui';

class SlotsBooked extends Component {
    constructor() {
        super();
        this.state = {
            ArraySlot:[],
            ArrayUserUid:[],
            ArrayNames:[],
            ArrayIValue:[]
        }
    }
    componentWillMount() {
     firebase.database().ref('parking').on(
         'value', snap => {
             let temArray = []
             let temIValue = []
             let value = snap.val()
             for(let i in value) {
                 temArray.push(value[i])
                 temIValue.push(i)
             }
             this.setState({ArraySlot:temArray,ArrayIValue:temIValue})
         }
     )
    }
    deleteSlot(index) {
           firebase.database().ref(`parking/${this.state.ArrayIValue[index]}`).remove()
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
    render() {
        return (
            <div>
               <Table  >
        <TableBody displayRowCheckbox={false}>
            <TableRow>
            <TableRowColumn><b>Email</b></TableRowColumn>
               <TableRowColumn><b>Area</b></TableRowColumn>
                <TableRowColumn><b>Slot</b></TableRowColumn>
                <TableRowColumn><b>Date</b></TableRowColumn> 
                <TableRowColumn><b>From time</b></TableRowColumn>
                <TableRowColumn><b>To time</b></TableRowColumn>
                <TableRowColumn><b>Cancel</b></TableRowColumn>
            </TableRow>
        </TableBody>
    </Table><hr />
            {this.state.ArraySlot.map((value,index) => {
                
                 return    <div>    <Table  >
        <TableBody displayRowCheckbox={false}>
            <TableRow>
            <TableRowColumn>{value.email}</TableRowColumn>
               <TableRowColumn>{value.area}</TableRowColumn>
                <TableRowColumn>{value.slotNumber}</TableRowColumn>
                <TableRowColumn>{value.date[0] + "/" + value.date[1] + 1 + "/" + value.date[2]}</TableRowColumn>
                <TableRowColumn>{this.msToTime( value.startTime)}</TableRowColumn>
                <TableRowColumn>{this.msToTime( value.endTime)}</TableRowColumn>
                <TableRowColumn><FlatButton  label="Cancel"  onClick={() => this.deleteSlot(index)} primary={true} /> </TableRowColumn>
            </TableRow>
        </TableBody>
    </Table><Divider /></div>

                    
                
            })}
            </div>
        )
    }
}

export default SlotsBooked;