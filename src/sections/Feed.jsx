import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Discover, TopArtists, TopCharts, AroundYou, Search, SongDetails, ArtistDetails } from './index'
import { SearchBar } from '../components'

const Feed = () => {

  const location = useLocation()
  const container = useRef()

  useEffect(() => {
    const pathName = location.pathname
    if (pathName === '/') return
    container.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }, [location])

  return (
    <div className='feed' ref={container}>
      <SearchBar />
      <Routes>
        <Route path='/' element={<Discover />} />
        <Route path='/TopArtists' element={<TopArtists />} />
        <Route path='/TopCharts' element={<TopCharts />} />
        <Route path='/AroundYou' element={<AroundYou />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/songDetails/:trackId' element={<SongDetails />} />
        <Route path='/artistDetails/:artistId' element={<ArtistDetails />} />
      </Routes>
    </div>
  )
}

export default Feed