import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setIsPlaying } from '../redux/slices/musicPlayerSlice'

import imgNotAvailable from '../assets/imgNotAvailable.png'
import error from '../assets/error.png'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'

const SongListCard = ({ songData, handlePlayerSetUp }) => {
  const { title, songUrl, subtitle, key, imgSrc, index, artistId } = songData

  const { currentSong, isPlaying } = useSelector(state => state.musicPlayer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleTitleClick = () => {
    navigate(`/songDetails/${key}`)
  }

  const handleSubtitleClick = ()=>{
    navigate(`/artistDetails/${artistId}`)
}

  const handlePlayPause = () => {
    if (!songUrl) return
    if (currentSong.title !== title) handlePlayerSetUp({ title, songUrl, subtitle, imgSrc, index })
    else if (!isPlaying) dispatch(setIsPlaying(true))
    else dispatch(setIsPlaying(false))
  }

  return (
    <div className='song-list-card'>
      <img src={imgSrc ? imgSrc : imgNotAvailable} alt="" className='song-list-img' />
      <div className='song-list-details-playPause'>
        <div className='song-list-details'>
          <div className='card-title' onClick={handleTitleClick}>{title}</div>
          <div className='card-subtitle' onClick={handleSubtitleClick}>{subtitle}</div>
        </div>
        <span onClick={handlePlayPause} className='play-pause-container'>
          {songUrl && (currentSong.title === title && isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />)}
          {!songUrl && <img src={error} alt="" className='song-list-card-play-err' />}
        </span>
      </div>
    </div>
  )
}

export default SongListCard