import React from 'react'

export default function Header(props) {
  return ( 
      <div className="head-container">
            <img style={{width:"200px",height:"200px"}} className="head-image" src='https://th.bing.com/th/id/R.59feccb670335030ac95d30d7fa6f8fb?rik=d6Jw%2bqXHpk4ZnQ&riu=http%3a%2f%2fwww.thegoldenscope.com%2fwp-content%2fuploads%2f2014%2f10%2fcopertina.jpg&ehk=UFwuHnrZ09uo%2bzLfTCRmpDTmFgwPQrkOyCnEYVUGD04%3d&risl=&pid=ImgRaw&r=0' alt='img'/>
            <h1 className="head-text">{props.headerTitle}</h1>
        </div>
  )
}
