import React,{Component} from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            pass:'',
            name:'',
        }
    }
    signUpFirebase() {
        if(this.state.name !== "") {

            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass).then(() => {
                         firebase.database().ref(`user/${firebase.auth().currentUser.uid}`).set({name:this.state.name,pass:this.state.pass,email:this.state.email})
                this.props.history.push('/bookparking')
            }).catch((error) => {
                alert(error.message)
            })
        } else {alert('please fill input field')};
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
                 width:160,
                 margin:'0 auto',
                 fontSize:40,
                 marginBottom:20
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
            mainButton: {
                backgroundColor:'#99A3A4',
                padding:5,
                borderColor:'#515A5A',
                borderRadius:5,
                marginLeft:'35%',
                marginTop:30
            },
            mainP3: {
                textAlign:'center'
            }
        }
        return (
            <div style={styles.mainDiv}>
            <h1 style={styles.mainH1}>Sign Up</h1>
            <p style={styles.mainP}><b>Name:</b><input style={styles.mainInput1} onChange={(text) => this.setState({name:text.target.value})} type="text" /></p>
            <p style={styles.mainP}><b>Email:</b><input style={styles.mainInput1} onChange={(text) => this.setState({email:text.target.value})} type="text" /></p>
            <p style={styles.mainP}><b>Password:</b><input style={styles.mainInput2}  onChange={(text) => this.setState({pass:text.target.value})} type="password" /></p>
            <button style={styles.mainButton} onClick={this.signUpFirebase.bind(this)}><b>Create account</b></button>
            <Link to="/"><p style={styles.mainP3}>I already have account</p></Link>
            </div>
        )
    }
}

export default SignUp;