import React from "react"
import { Component } from "react"
// import fire from "../config/fire";
import fire from "./config/fire"
import styled from "styled-components"
// import { useState } from "react"
// import { auth } from "./firebase"


class Login extends Component{
    constructor(props){
        super(props)
        this.login=this.login.bind(this);
        this.signup=this.signup.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            email:"",
            password:""
        }
    }
    signup(e){
        // console.log(this.state);
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword (this.state.email,this.state.password).then((u)=>{

            // console.log();
            // alert("Account Created")
        }).catch((err)=>{
        // console.log(err)
        if(this.state.password.length<=5) {
            alert("Please enter minimum 6 character password")
        }
        else{
            alert("Something went wrong")
        }
    })
        
    }
    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            // alter();
            console.log(u);
        }
        ).catch((err)=>{
            // console.log(err);

            this.state.email.length==0?alert("Please fill Credentials"):alert("Please SignUp first to continue")
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        const mystyle = {
            background: "url(https://cashessentials.org/app/uploads/2018/07/computer_wallet_carde66172caa9846d01b1b6ff00003ae424.jpg)",
    height: "100vh",
    backgroundSize: "100vw" ,
    backgroundRepeat: "no-repeat",
    display: "flex",
    // justifyContent: "center",    
    alignItems: "center",
          };
        
        const welcome = {
        //    display:"block",
        position:"absolute",
        top:"10px",
        right:"350px",
        fontSize:"35px",
           color: "white",
           fontFamily:"arial"
        };


        const heading = {
            position:"absolute",
            top:"25px",
            fontSize:"50px",
            right:"180px",
               marginTop:"50px",
               color: "white",
               fontFamily:"arial"
        };

        const card = {
            float:"right",
            // right:"250px",
            // display:"block",
            backgroundColor: "#fff",
            // opacity: ".3",
            width: "350px",
            borderRadius: "5px",
            overflow: "hidden",
            height:"310px",
            padding:  "30px",
            marginLeft: "830px",
            marginTop: "40px",
    paddingBottom: "20px",
    position: "relative",
    textAlign:"center",
          };



        const inputs = {
            display: "block",
        //    border:"none",
           borderBottom:"2px",
           borderTop:"0px",
           borderLeft:"0px",
           borderRight:"0px",
           borderBottomColor:"black",
           borderStyle:"solid",
    width: "95%",
    padding: "10px",
    borderRadius: "5px",
    outline: "none",
    // borderColor: "#f0f0f0",
    marginBottom: "40px",
    marginTop: "20px",
    fontSize:"16px"
    // border: {"2px solid #f0f0f0"},
          };
        
        

      const button = {
            display: "flexbox",
    width: "30%",
    backgroundColor: "#fe5a1d",
    color: "white",
    padding: "10px",
    outline: "none",
    border: "none",
    borderRadius: "5px",
    textAlign: "center",
    cursor: "pointer",
    margin:"20px",
    // marginTop:"40px",
    alignItems : "center",
    // justifyContent: "space-between",
    justifyContent: "space-around",
          };
        return(
            <div>
                <form style={mystyle}>
                    <h1 style={welcome}>Welcome to</h1>
                    <h1 style={heading}>Movie library</h1>
                    <div style={card}>
                    <input type="email" style={inputs}
                    placeholder="Email Id" id="email" onChange={this.handleChange} name="email" value={this.state.email} />
                    <input type="password" style={inputs} id ="password" name="password" onChange={this.handleChange} placeholder="Password" value={this.state.password} />
                    <button style={button} onClick={this.login}>Sign In</button>
                    <button style={button} onClick={this.signup}>Sign Up</button>
                    <p>Login or SignUp to continue...</p>
                    </div>
                </form>
            </div>
        )
    }
}
export default Login;