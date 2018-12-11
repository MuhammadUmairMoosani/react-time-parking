import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import "./firebase/firebase"

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            pass:''
        }
    }
    signInFirebase() {
      firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass).then((user) => { 
         if(firebase.auth().currentUser.email === 'admin@gmail.com')  {
              this.props.history.push('/admin')
         } else {

             this.props.history.push('/bookparking')
         }        
    }).catch((error) => {
          alert(error.message)
          this.setState({email:'',pass:''})
      })
    }
    
    render() {
        const  styles = {
            mainDiv: {

                backgroundColor:'white',
                opacity:0.9,
                width:400,
                height:200,
                margin:'0 auto',
                padding:100,
                position:'relative',
                top:100,
                borderRadius:20
            },
            mainH1: {
                 width:140,
                 margin:'0 auto',
                 fontSize:40,
                 marginBottom:40
            },
            mainP: {
              width:300,
              margin:'0 auto',
              padding:10,
              
            },
            mainInput1: {
              marginLeft:62,
              padding:3,
              borderColor:'#99A3A4'
            },
            mainInput2: {
                marginLeft:30,
                padding:3,
                borderColor:'#99A3A4'
              },
            mainButton1: {
                backgroundColor:'#99A3A4',
                padding:5,
                borderColor:'#515A5A',
                borderRadius:5,
                marginLeft:'45%',
                marginTop:10,
                marginBottom:10
            },
            mainButton2: {
                backgroundColor:'#99A3A4',
                padding:5,
                borderColor:'#515A5A',
                borderRadius:5,
                marginLeft:'35%',
                marginTop:2
            },
            mainP3: {
                textAlign:'center'
            }
        }
        
        return (
            <div style={styles.mainDiv}>
            <h1 style={styles.mainH1}>Sign In</h1>
            <p style={styles.mainP}><b>Email:</b><input style={styles.mainInput1} value={this.state.email} onChange={(text) => this.setState({email:text.target.value})} type="text" /></p>
            <p style={styles.mainP}><b>Password:</b><input style={styles.mainInput2} value={this.state.pass} onChange={(text) => this.setState({pass:text.target.value})}  type="password" /></p>
            <button style={styles.mainButton1} onClick={this.signInFirebase.bind(this)}>Sign In</button><br />
            <Link to="/signup"><p style={styles.mainP3}>Create new account</p></Link>
            </div>
        )
    }
}

export default SignIn;