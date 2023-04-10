// import firebase from "firebase/compat";
import { getDatabase, set, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import fire from "../config/fire";
import database from "../config/fire"

export default function SelectPlaylist({cb, v}){
    const [movie, setMovie] = useState([]);
    const [value, setValue] = useState([]);
    // const[]
    let index=0;
    useEffect(()=>{
        var currentUser=fire.auth().currentUser;
        // console.log(currentUser.uid);
        // let arr=[];
        const db = getDatabase();
        console.log(currentUser)
        onValue(ref(db, 'users/' + currentUser.uid), (snap) => {   
            setValue(snap.val());
        })
    },[]);
        // const[index,setIndex]=useState([0]);
    function saveVideo(event){
        cb(false);
        var currentUser=fire.auth().currentUser;
        // console.log(currentUser.uid);
        // let arr=[];
        const db = getDatabase();
        // console.log(db)
        // set(ref(db, 'users/' + currentUser.uid), {
        //     favourite : v
        // })
        const x = localStorage.getItem("movie");
        setMovie(x);
        // var currentUser=fire.auth().currentUser;
    // const db = getDatabase();
    // const data = ref(db, 'users/' + currentUser.uid);
        // arr=fire//get value
        // console.log(x);
        // console.log(movie);
        var currentUser=fire.auth().currentUser;
        // const db = getDatabase();
        
        
            // console.log(value);
   
    if(!value){
        set(ref(db, 'users/' + currentUser.uid), {
        index:[x],
    })
}
    else{
        set(ref(db, 'users/' + currentUser.uid), {
            index:[...value.index, x],
        })

}

        
        // index=index+1;
        // setIndex(index+1);
        // console.log(index,movie);
        // 
        // console.log(x);
        
        // fire.database().ref('Users/'+currentUser.uid).set({uid:v});
        // const tasks=fire.database().ref;

        // console.log(tasks);
        // tasks.set({
            // uid:{v},
        // })
        // console.log(v);
        
        // "new": ["v1","v2"];
        // "new":["1,2,3"];  append in array
        // "newOne": ["cur"]; new array
        alert("Successfully added to Playlist")
    }
    const list = ["Click here to add in Favourite Playlist"];
    // const list = "Click to add in Favourite Playlist";
    return (<div>
        <ul style={{listStyle:"none", cursor:"pointer", fontWeight:"bold", marginTop:"10px",height:"25px",paddingTop:"25px",marginLeft:"15px",marginRight:"15px",paddingLeft:"20px",paddingBottom:"20px", borderWidth:'2px 2px 2px 25px', borderStyle:"solid", borderColor:"#FFBF00" }}>
        {list.map((data, ind) => {return(<li onClick={saveVideo}> {data}</li>)})}

        </ul>
    </div>)
}