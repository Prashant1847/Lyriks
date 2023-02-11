import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Error, Loading, SongListCard } from '../../components'
import { loadSongDetailsData, loadRelatedSongData } from '../../redux/slices/songDetailsSlice'

import { setUpMusicPlayer } from '../../redux/slices/musicPlayerSlice'

import imgNotAvailable from '../../assets/imgNotAvailable.png'

const SongDetails = () => {
  const trackId = Number(useParams().trackId)
  const dispatch = useDispatch()
  const trackDetails = useSelector(state => state.songDetails.data)
  const relatedSongsData = useSelector(state => state.songDetails.relatedSongData)
  const { loadingData, loadingRelatedSong, dataError, relatedSongDataError } = useSelector(state => state.songDetails)

  useEffect(() => {
    if(!trackId) return 
    dispatch(loadSongDetailsData(trackId))
    dispatch(loadRelatedSongData(trackId))
  }, [trackId])


  const handlePlayerSetUp = (songData, ) => {
    dispatch(setUpMusicPlayer(songData, relatedSongsData))
  }

  const { title, subtitle, imgSrc, lyrics, genre } = trackDetails

  if(!trackId){
    return (
      <Error showRetryBtn={false} title="Song details not available"/>
    )
  }
  return (
    <div className='details-section'>
      {dataError  && <Error callBackForRetry={()=> dispatch(loadSongDetailsData(trackId))}/>}

      {loadingData && <Loading title="Loading Song Details" />}
  
      {(!dataError && !loadingData) &&
        <>
          <div className='flex align-ctr'>
            <img src={imgSrc ? imgSrc : imgNotAvailable} alt="" className={`details-section-img ${!imgSrc? 'img-not-available-details-page': ''}`} />
            <div>
              <div className='details-section-title'>{title}</div>
              <div className='details-section-subtitle'>{subtitle}</div>
              <div className='details-section-subtitle'>{genre}</div>
            </div>
          </div>

          <div className='lyrics-container'>
            <div className='details-section-heading'>Lyrics:</div>
            <div className='lyrics'>
              {lyrics && lyrics.map((line, index) => <div key={index}>{line}</div>)}
            </div>
          </div>

          <div>
            {relatedSongDataError && <Error callBackForRetry={()=> dispatch(loadRelatedSongData(trackId))}/>}

            {loadingRelatedSong && <Loading title="Loading related songs" />}

            {(!loadingRelatedSong && !relatedSongDataError) &&
              <>
                <div className='details-section-heading'>Related Songs:</div>
                {relatedSongsData.map((song, index) => <SongListCard key={index} songData={song} handlePlayerSetUp={handlePlayerSetUp} />)}
              </>}
          </div>

        </>}
    </div>
  )
}

export default SongDetails