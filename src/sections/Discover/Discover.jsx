import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setGenre, loadDiscoverData } from '../../redux/slices/discoverSlice'
import { setUpMusicPlayer } from '../../redux/slices/musicPlayerSlice'

import { Grid, SongCard, Loading, Error } from '../../components' //remove index file from componenets and change imorts 
import { genres } from '../../data/constants'

const Discover = () => {
  const genre = useSelector(state => state.discover.genre)
  const { data:discoverData, loading, error } = useSelector(state => state.discover)
  const dispatch = useDispatch()

  const handleChange = e => {
    dispatch(setGenre(e.target.value))
  }

  useEffect(() => {
    dispatch(loadDiscoverData())
  }, [genre])

  const handleMusicPlayerSetup = (songData) => {
    dispatch(setUpMusicPlayer(songData, discoverData))
  }
  
  return (
    <>
      <div className='feed-title discover-title'>
        <span>Discover</span>
        <span>
          <select value={genre} onChange={handleChange}>
            {genres.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
          </select>
        </span>
      </div>

      {error && <Error callBackForRetry={()=> dispatch(loadDiscoverData())}/>} 

      {loading && <Loading title={`Loading ${genre}...`}/>}

      {(!error && !loading) && <Grid data={discoverData} Card={SongCard} callBackForCard={handleMusicPlayerSetup}/>}
    </>
  )
}

export default Discover