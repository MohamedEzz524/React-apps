// 1
// npm install react-player
// npm install movie-trailer

import React, { useState,useEffect } from 'react'
import "./App.css"
import ReactPlayer from 'react-player'; //2
import movieTrailer from 'movie-trailer'; //2

export default function App() {
  const [video, setVideo] = useState("inception");
  const [videoURL, setVideoURL] = useState("https://youtu.be/sa9l-dTv9Gk");

  const handleSearch = (e)=>{
    e.preventDefault()
    movieTrailer(video).then((res) => {    //pass "movieName" to movieTrailer() to get its "trailer" 
      setVideoURL(res)
    })
  }

  return (
    <div className='App'>
      <div className="search-box">
                <label>Search for any movies/shows:{" "}</label>
                <input type="text" onChange={(e) => { setVideo(e.target.value) }} />
                <button onClick={(e) => { handleSearch(e) }}>Search</button>
            </div>
            {/* Using 'ReactPlayer' component to display the video */}
            <ReactPlayer style={{margin:"50px auto"}} url={videoURL} controls={true} />
    </div>
  )
}
