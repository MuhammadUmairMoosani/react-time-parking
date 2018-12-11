import React,{Component} from 'react';
import * as firebase from 'firebase';
import { Table, TableBody, TableRowColumn, TableRow, FlatButton,Divider } from 'material-ui';

class UserData extends Component {
    constructor() {
        super();
        this.state = {
            ArrayEmail:[],
            ArrayNames:[]
        }
    }
    componentWillMount() {
        firebase.database().ref('user').on (
            'value', snap => {
                let names = []
                let emails = []
                let value = snap.val()
                for(let i in value) {
                    if(value[i].name !== 'admin') {
                        names.push(value[i].name)
                        emails.push(value[i].email)
                    }
                }
                this.setState({ArrayNames:names,ArrayEmail:emails})

            }
        )
    }
    deleteSlot(val,index,ind) {
        firebase.database().ref(`user/${this.state.ArrayUserUid[index]}/bookParking/${ind}`).remove();
        firebase.database().ref(`parking/${val.area}/slot${val.slot}/${val.slotIndex}`).remove();
            
    }
    render() {
        return (
            <div style={{width:500,margin:'0 auto'}}>
               <Table style={{marginTop:20,marginBottom:20,borderTopLeftRadius:20,borderTopRightRadius:20, backgroundColor:'#62DA60',borderBottomColor:'red'}}>
        <TableBody displayRowCheckbox={false}>
            <TableRow>
            <TableRowColumn style={{textAlign:'center'}}><b>User name</b></TableRowColumn>
               <TableRowColumn style={{textAlign:'center'}}><b>User email</b></TableRowColumn>
            </TableRow>
        </TableBody>
    </Table>
            {this.state.ArrayNames.map((value,index) => {


               
                    return   <div key={index}>    <Table  >
        <TableBody displayRowCheckbox={false}>
            <TableRow>
            <TableRowColumn style={{textAlign:'center'}}>{this.state.ArrayNames[index]}</TableRowColumn>
               <TableRowColumn style={{textAlign:'center'}}>{this.state.ArrayEmail[index]}</TableRowColumn>
     
            </TableRow>
        </TableBody>
    </Table><Divider/></div>

                    
                



            })}
            </div>
        )
    }
}

export default UserData;