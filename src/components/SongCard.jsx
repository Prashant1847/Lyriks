import React, { useState,  } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import imgNotAvailable from '../assets/imgNotAvailable.png'
import error from '../assets/error.png'

import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { setIsPlaying} from '../redux/slices/musicPlayerSlice'

const SongCard = ({ data, callBackForCard }) => {
    const { title, subtitle, imgSrc, key, songUrl, index, artistId} = data
    const {currentSong, isPlaying} = useSelector(state => state.musicPlayer)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleTitleClick = () => {
        navigate(`/songDetails/${key}`)
    }

    const handleSubtitleClick = ()=>{
        navigate(`/artistDetails/${artistId}`)
    }

    const handlePlayPause = ()=> {
        if(!songUrl) return
        if(currentSong.title !== title) callBackForCard({ title, songUrl, subtitle, imgSrc, index})
        else if(!isPlaying) dispatch(setIsPlaying(true))
        else dispatch(setIsPlaying(false))
    }

    return (
        <div className='card'>
            <div className='card-header-container'>
                <img src={imgSrc? imgSrc: imgNotAvailable} alt="" className={`card-img ${!imgSrc? 'img-not-available': ''}`}/>
                <div className='card-pause-play-container' onClick={handlePlayPause}>
                    {songUrl && ((currentSong.title === title && isPlaying) ? <AiFillPauseCircle /> : <AiFillPlayCircle/>)}
                    {!songUrl && <img src={error} alt="" className='song-card-play-err'/>}
                </div>
            </div>
            <div className='card-title' onClick={handleTitleClick}>{title}</div>
            <div className='card-subtitle' onClick={handleSubtitleClick}>{subtitle}</div>
        </div>
    )
}

export default SongCard