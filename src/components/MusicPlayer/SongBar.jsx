import React from 'react'

const INCREASE_SEEK_BY = 1 //song seek bar increase

export function formateTime(seconds) {
    const minutes = Math.trunc(seconds / 60).toString().padStart(2, '0')
    const remainingSeconds = Math.trunc(seconds % 60).toString().padStart(2, '0')
    return `${minutes}:${remainingSeconds}`
}

const SongBar = ({currentTime, setCurrentTime, audioTagRef, audioLength}) => {

    const handleAudioSeek = (e) => {
        setCurrentTime(e.target.value)
        audioTagRef.current.currentTime = e.target.value
    }

    return (
        <div className='song-bar flex-center'>
            <span>{formateTime(currentTime)}</span>
            <input type="range"
                onChange={handleAudioSeek}
                value={currentTime}
                max={audioLength.inSeconds}
                step={INCREASE_SEEK_BY}
            />
            <span>{audioLength.inString}</span>
        </div>
  )
}

export default SongBar