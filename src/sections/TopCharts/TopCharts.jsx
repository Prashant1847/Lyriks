import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {FeedTitle, SongCard, Grid, Error, Loading} from '../../components'

import {setUpMusicPlayer} from '../../redux/slices/musicPlayerSlice'
import { loadTopChartsData } from '../../redux/slices/topChartsSlice'

const TopCharts = () => {
  const {data:topChartsData, error, loading } = useSelector(state => state.topCharts)
  const dispatch = useDispatch()

  const handlePlayerSetUp = (songData) => {
    dispatch(setUpMusicPlayer(songData, topChartsData))
  }

  return (
    <>
        <FeedTitle title="Top Charts"/>
        {error && <Error callBackForRetry={()=> dispatch(loadTopChartsData()) } />}
        
        {loading && <Loading title="Loading Top Charts Songs"/>}

        {(!error && !loading) && <Grid data={topChartsData} Card={SongCard} callBackForCard={handlePlayerSetUp} />}
    </>
  )
}

export default TopCharts