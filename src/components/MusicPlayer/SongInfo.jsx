import React from 'react'

const SongInfo = ({ title, subtitle, imgSrc }) => {

    return (
        <div className='flex align-ctr'>
            <img src={imgSrc} alt="" className='music-player-song-img' />
            <div>
                <div className='music-player-song-title'>{title}</div>
                <div className='music-player-song-subtitle'>{subtitle}</div>
            </div>
        </div>
    )
}

export default SongInfo