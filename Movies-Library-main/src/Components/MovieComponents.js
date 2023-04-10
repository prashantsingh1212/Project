import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 220px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
  position: relative;
  justify-content: space-between;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 322px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  display:inline !important;
  margin: 15px 0;
  white-space: nowrap;
  width:50%;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const MovieComponent = (props) => {
  useEffect(()=>{
      console.log(props);
  },[props])
  const { Title, Year, imdbID, Type, Poster } = (props.movie.Year)?props.movie: JSON.parse(props.movie);
  
  
  function add(){
    props.setSelect(true);
    props.setV(props.movie);
    localStorage.setItem("movie", JSON.stringify(props.movie));
  }

  return (
    <MovieContainer
      onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CoverImage src={Poster} alt={Title} />
      <div>
      <MovieName style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{Title}</MovieName>
      
      </div>
      <InfoColumn>
        <MovieInfo>Year : {Year}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn>
      <button style={{cursor:"pointer", backgroundColor:"#7CFC00", marginLeft:"15px", outline:"none",borderColor:"#7CFC00", borderRadius:"5px", fontSize:"15px", margin:"15px", padding:"5px", position:"relative"}} onClick={add}>Add To Playlist</button>
    </MovieContainer>
  );
};
export default MovieComponent;