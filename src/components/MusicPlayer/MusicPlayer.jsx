import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Controls from './Controls'
import Volume from './Volume'

import {setIsPlaying} from '../../redux/slices/musicPlayerSlice'

import SongInfo from './SongInfo'
import SongBar from './SongBar'
import { formateTime } from './SongBar'

const INITIAL_AUDIO_LENGTH = { inSeconds: 0, inString: "00:00" }

const MusicPlayer = () => {
    const { index, title, subtitle, imgSrc, songUrl, } = useSelector(state => state.musicPlayer.currentSong)
    const { isPlaying } = useSelector(state => state.musicPlayer)
    const dispatch = useDispatch()
    
    const audioTagRef = useRef()
    const [audioLength, setAudioLength] = useState(INITIAL_AUDIO_LENGTH)
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        resetMusicPlayer()
    }, [index])

    const resetMusicPlayer = () => {
        setAudioLength(INITIAL_AUDIO_LENGTH)
        setCurrentTime(0)
    }

    const handleMetaDataLoad = () => {
        const seconds = audioTagRef.current.duration
        setAudioLength({
            inSeconds: Math.trunc(seconds),
            inString: formateTime(seconds)
        })
    }

    const handleTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime)
    }

    const handleOnEnded = () => {
        dispatch(setIsPlaying(false))
    }
    
    const handleCanPlay = () => {
        if(isPlaying) audioTagRef.current.play() //this means another song was playing before song switch
        else dispatch(setIsPlaying(true)) //this means it is the first song
    }


    return (
        <div className='music-player-container'>

            <SongInfo title={title} subtitle={subtitle} imgSrc={imgSrc} />

            <div className='main-player'>
                <audio src={songUrl} ref={audioTagRef}
                    onLoadedMetadata={handleMetaDataLoad}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleOnEnded}
                    onCanPlay={handleCanPlay}>Your browser doest not</audio>

                <Controls audioTagRef={audioTagRef}/>
                <SongBar currentTime={currentTime} setCurrentTime={setCurrentTime} audioTagRef={audioTagRef} audioLength={audioLength}/>
            </div>

            <Volume audioTagRef={audioTagRef}/>
        </div>
    )
}

export default MusicPlayer