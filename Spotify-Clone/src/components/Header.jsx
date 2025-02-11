import React from 'react'
import logoSpotify from  '../assets/logo/spotify-logo.png'

const Header = () => {
  return (
   <div>
    <a href="/">
        <img src={logoSpotify} alt="logo do Spotify" />
    </a>
    <h1>Spotify</h1>
    </div>
 
  )
}

export default Header