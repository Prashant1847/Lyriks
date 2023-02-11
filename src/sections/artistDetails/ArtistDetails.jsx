import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Loading, SongListCard, Error } from '../../components'
import { loadArtistDetailsData } from '../../redux/slices/artistDetailsSlice'
import { setUpMusicPlayer } from '../../redux/slices/musicPlayerSlice'

import imgNotAvailable from '../../assets/imgNotAvailable.png'

const ArtistDetails = () => {
  const artistId = Number(useParams().artistId)

  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state.artistDetails)
  const { name, origin, imgSrc, relatedSongs } = data
  
  useEffect(() => {
    if(!artistId) return
    dispatch(loadArtistDetailsData(artistId))
  }, [artistId])

  const handlePlayerSetUp = (songData) => {
    dispatch(setUpMusicPlayer(songData, relatedSongs))
  }

  if(!artistId) return <Error showRetryBtn={false} title="Artist details not available" />
  
  return (
    <div className='details-section'>
      {error && <Error callBackForRetry={() => dispatch(loadArtistDetailsData(artistId))} />}

      {loading && <Loading title="Loading Artist Details" />}

      {(!error && !loading) &&
        <>
          <div className='flex align-ctr'>
            <img src={imgSrc ? imgSrc : imgNotAvailable} alt="" className={`details-section-img ${!imgSrc? 'img-not-available-details-page': ''}`} />
            <div>
              <div className='details-section-title'>{name}</div>
              <div className='details-section-subtitle'>{origin}</div>
            </div>
          </div>

          <div className='related-song-container'>
            <div className='details-section-heading'>Related Songs:</div>
            {relatedSongs.map((song, index) => <SongListCard key={index} songData={song} handlePlayerSetUp={handlePlayerSetUp} />)}
          </div>
        </>
      }
    </div>
  )
}

export default ArtistDetails