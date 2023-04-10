
import React,{ useEffect, useState } from "react";
import styled from "styled-components";
import { Component } from "react";
import MovieComponent from "./Components/MovieComponents";
import axios from 'axios'

import MovieInfo from "./Components/MovieInfoComponents";
//import { Component } from "react";
import { API_KEY } from "./App";
import fire from "./config/fire";
import SelectPlaylist from "./Components/selectPlaylist";

import { getDatabase, onValue, ref } from "firebase/database";
import Playlist from "./Components/Playlist";
// import Playlist from "./Components/Playlist";




const Container=styled.div`
display:flex;
flex-direction:column`;

const Header = styled.div`
display:flex;
flex-direction:row;
background-color:black;
color:white;
padding:10px
font-size:25px;
height:70px;
font-weight:bold;
box-shadow:0 3px 6px 0 #555; 
justify-content:space-between;
align-item:center;
`;
const AppName = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`;
const Button=styled.button`


background-color: #ed2939;
color:white;
width:70px;
align-items:center;
margin-top:9px;
margin-bottom:9px;
margin-Right:15px;
border-radius:6px;
margin-right:5px
cursor:pointer;


`;
const MovieImage=styled.img`
  width:48px;
  height:48px;
  margin:12px;
`;
const SearchBox=styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 500px;
  width: 35%;
  height:25px;
  margin-top:13px;
  background-color: white;
  // margin-right:0px;
  align-item:center;

`;


const SearchIcon=styled.img`
width:30px;
height:28px`;
const SearchInput=styled.input`
color: black;
font-size: 16px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 18px;
  justify-content: space-evenly;;
`;
function Home() {

  const [searchQuery,updateSearchQuery]=useState();
  const[timeoutId,updateTimeId]=useState();
  const[movieList,updateMovieList]=useState([]);
  const[selectedMovie,onMovieSelect]=useState();
  const [select, setSelect] = useState(false);
  const [video, setVideo] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState(false);

  const fetchData=async(searchString)=>{
      const response=await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
      // console.log(response);
      setSearch(true);
      updateMovieList(response.data.Search);
  };

  const onTextChange=(event)=>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout=setTimeout(()=>fetchData(event.target.value),500);
    updateTimeId(timeout);
  };
  // function logout(){
  //   fire.auth().signOut();
  // }
  useEffect(()=>{
    console.log( fire.auth().currentUser)
    setTimeout(()=>{setCurrentUser(  fire.auth().currentUser);},1000)
    
  },[])
  useEffect(() => {
    console.log(currentUser);
    
    if(currentUser!==null){

    
    const db = getDatabase();
    

    const data = ref(db, 'users/' + currentUser.uid);
    onValue(data, (snap) => {   
        const value = snap.val();
        console.log(value.index)
        setPlaylists(value.index);
    })
  }
    // fetch data and set in playlists = {"favourite": []}

  }, [currentUser]);
  function logout(){
      fire.auth().signOut();
  }
  return (

    <Container>
      
      {/* <Playlist /> */}
    {select && <SelectPlaylist cb={setSelect} v={video}/>}
      <Header>
      <AppName>
        <MovieImage src='movie-icon.svg'/>
       <h2> Movie Library</h2>
      </AppName>
      <SearchBox>
          <SearchIcon src="/search-icon.svg"></SearchIcon>
          <SearchInput placeholder="Search Movie" value={searchQuery} onChange={onTextChange} />
          
          
      </SearchBox>
      <Button style={{cursor:"pointer"}} onClick={logout} >LogOut</Button>
      </Header>
      {selectedMovie && <MovieInfo selectedMovie={selectedMovie} onMovieSelect={
      onMovieSelect}/>}
       
      {!search &&
      <MovieListContainer>
        <div style={{display:"block",width:"100vw", marginLeft:"30px"}}><h2>Your Favourite Playlist :</h2></div>
        {
          playlists?.length? playlists.map((movie,index)=>(
          <Playlist key={index} setV={setVideo} setSelect={setSelect} movie={movie} onMovieSelect={onMovieSelect}/>
          )):
          "No PlayList Search"}
      
      

      </MovieListContainer>
    }
      {search && 
      <MovieListContainer>
        
        {
          movieList?.length? movieList.map((movie,index)=>(
          <MovieComponent key={index} setV={setVideo} setSelect={setSelect} movie={movie} onMovieSelect={onMovieSelect}/>
          )):
          (()=>{
              setSearch(false);
              return 'No Movie Found'
          })()}
          
      
      

      </MovieListContainer>
    }
    </Container>  
   
  );
}

export default Home;
