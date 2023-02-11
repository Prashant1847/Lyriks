import React from 'react'
import { useNavigate } from 'react-router-dom'

import imgNotAvailable from '../assets/imgNotAvailable.png'

const ArtistCard = ({ data }) => {
    const navigate = useNavigate()
    const { subtitle: artistName, artistId, artistImgSrc } = data

    const handleClick = () => {
        navigate(`/artistDetails/${artistId}`)
    }

    return (
        <div className='card artist-card' onClick={handleClick}>
            <div className='card-header-container'>
                <img src={artistImgSrc? artistImgSrc: imgNotAvailable} alt="" className={`card-img ${!artistImgSrc? 'img-not-available': ''}`}/>
            </div>
            <div className='card-title'>{artistName}</div>
        </div>
    )
}

export default ArtistCard