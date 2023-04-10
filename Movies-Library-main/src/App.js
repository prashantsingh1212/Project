import React from "react";
import { Component } from "react";
// import Login from "./Components/Login";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import './App.test'
// import 'C:\Users\Mansih Saini\Desktop\Movie-Library\movie-library\src\App.css'
import fire from "./config/fire";
import Home from "./Home";
import Login from "./Login";
// import Playlist from "./Components/Playlist";
export const API_KEY='442815d';



class App extends Component{
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }
  componentDidMount(){
    this.authListener()
  }
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user});
      }
      else{
        this.setState({user:null});
      }
    })
  }
  render(){
    return(
      <div className="App">
        {this.state.user?(<Home/>):(<Login/>)}
        {/* <Playlist /> */}
        
      </div>
    );
  }
}
export default App;

