import React from 'react'
import { useSelector } from 'react-redux'

import './assets/global.css'
import './assets/responsive.css'

import { MusicPlayer} from './components'
import {NavBar, Feed, TopChartsAndArtists } from './sections' //why no need of index file

const App = () => {
  const {showMusicPlayer}  = useSelector(state => state.musicPlayer)
  return (
    <div className='layout-container'>
        <NavBar />
        <Feed />    
        <TopChartsAndArtists />
        {showMusicPlayer && <MusicPlayer />}
    </div>
  )
}

export default App