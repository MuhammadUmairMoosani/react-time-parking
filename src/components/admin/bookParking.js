import React,{Component} from 'react';
import BookingParking from '../bookparking'

class BookParkingAdmin extends Component {
    render() {
        const style = {
            buttonDiv: {
               textAlign:'center',
               marginTop:10
            },
          };
        return (
            
             <div style={style.buttonDiv}>
             <BookingParking/>
             </div> 
        )
    }
}

export default BookParkingAdmin;