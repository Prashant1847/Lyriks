import React, {useEffect, useState, useRef} from 'react'

import { AiFillSound } from 'react-icons/ai'
import { ImVolumeMute } from 'react-icons/im'

import { useDispatch, useSelector} from 'react-redux'
import { toggle_volumeRange_onSmallDevices } from '../../redux/slices/uiSlice'


const MIN_VOLUME = 0
const MAX_VOLUMNE = 1
const INCREASE_VOLUMNE_BY = 0.05

const Volume = ({audioTagRef}) => {
    const [isMuted, setIsMuted] = useState(false)
    const {show_volumeRange_onSmallDevices} = useSelector(state => state.uiSlice)

    const volumeRangeTagRef = useRef()

    const dispatch = useDispatch()

    const handleVolumeRange_onSmallDevices = ()=>{
        console.log("inside handler")
        dispatch(toggle_volumeRange_onSmallDevices())
    }
    
    const handleVolumeChange = (e) => {
        const volume = Number(e.target.value)
        if (volume === 0) setIsMuted(true)
        else setIsMuted(false)
        audioTagRef.current.volume = volume
    }
    
    useEffect(()=>{
        const volumeRangeTag = volumeRangeTagRef.current
        if(show_volumeRange_onSmallDevices) volumeRangeTag.classList.add('show-volume-range') 
        else volumeRangeTag.classList.remove('show-volume-range') 
    },[show_volumeRange_onSmallDevices])

    return (
        <div className='flex-center volume-container'>
            <span className='volume-btn' onClick={handleVolumeRange_onSmallDevices}>{isMuted ? <ImVolumeMute /> : <AiFillSound />}</span>
            <input type="range"
                className='volume-range'
                ref={volumeRangeTagRef}
                onChange={handleVolumeChange}
                min={MIN_VOLUME}
                max={MAX_VOLUMNE}
                step={INCREASE_VOLUMNE_BY} />
        </div>
    )
}

export default Volume