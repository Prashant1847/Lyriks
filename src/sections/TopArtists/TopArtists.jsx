import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {FeedTitle, Grid, ArtistCard, Error, Loading } from '../../components'
import { loadTopChartsData } from '../../redux/slices/topChartsSlice'


const TopArtists = () => {
  const {data:topArtistsData, error, loading} = useSelector(state => state.topCharts)
  const dispatch = useDispatch()

  return (
    <>
      <FeedTitle title="Top Artists" />
      {error && <Error callBackForRetry={()=> dispatch(loadTopChartsData()) } />}

      {loading &&  <Loading title="Loading Top Artists" />}

      {(!error && !loading) && <Grid data={topArtistsData} Card={ArtistCard} />}
    </>
  )
}

export default TopArtists