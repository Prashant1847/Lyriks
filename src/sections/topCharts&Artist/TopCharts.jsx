import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loading, SongListCard, Error } from '../../components'
import { setUpMusicPlayer } from '../../redux/slices/musicPlayerSlice'
import { loadTopChartsData } from '../../redux/slices/topChartsSlice'


const TopCharts = ({ topChartsData, loadingStyles, errorStyles }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.topCharts)

  const handlePlayerSetUp = (songData) => {
    dispatch(setUpMusicPlayer(songData, topChartsData))
  }

  const handleSeeMoreClick = ()=>{
    navigate('/TopCharts')
  }

  return (
    <div className='topCharts-container'>
      <div className='chartsAndArtist-title'>
        Top Charts <button className='see-more-btn' onClick={handleSeeMoreClick}>See more</button>
      </div>

      {error && <Error titleStyles={errorStyles.titleStyles} errorImgStyles={errorStyles.imgStyles} retryBtnStyles={errorStyles.retryBtnStyles} callBackForRetry={()=> dispatch(loadTopChartsData())} />}

      {loading && <Loading title="Loading Top Charts Songs" titleStyles={loadingStyles.titleStyles} logoStyles={loadingStyles.imgStyles} />}

      {(!error && !loading) && topChartsData.map((data, index) => <SongListCard key={index} songData={data} handlePlayerSetUp={handlePlayerSetUp} />)}
    </div>
  )
}

export default TopCharts