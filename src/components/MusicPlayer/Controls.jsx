import React, {useEffect} from 'react'

import { FaPlay, FaPause, } from 'react-icons/fa'
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io'

import { useSelector, useDispatch } from 'react-redux'
import { changeCurrentSong, setIsPlaying} from '../../redux/slices/musicPlayerSlice'

const Controls = ({audioTagRef}) => {
    const { playlist, isPlaying } = useSelector(state => state.musicPlayer)
    const { index, songUrl } = useSelector(state => state.musicPlayer.currentSong)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!songUrl) return
        if (isPlaying) audioTagRef.current.play()
        else audioTagRef.current.pause()
    }, [isPlaying])

    const toggleIsPlaying = () => {
        dispatch(setIsPlaying(!isPlaying))
    }

    const handleNextSong = () => {
        if (index === playlist.length - 1) return
        const nextIndex = index + 1
        dispatch(changeCurrentSong({
            ...playlist[nextIndex],
            index: nextIndex
        }))
    }

    const handlePreviousSong = () => {
        if (index === 0) return
        const prevIndex = index - 1
        dispatch(changeCurrentSong({
            ...playlist[prevIndex],
            index: prevIndex
        }))
    }

    return (
        <div className='music-controls'>
            <IoMdSkipBackward onClick={handlePreviousSong} />
            <span onClick={toggleIsPlaying}>{isPlaying ? <FaPause /> : <FaPlay />}</span>
            <IoMdSkipForward onClick={handleNextSong} />
        </div>
    )
}

export default Controls