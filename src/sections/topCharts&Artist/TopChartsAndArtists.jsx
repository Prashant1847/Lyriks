import React, { useEffect } from 'react'

import TopCharts from './TopCharts'
import TopArtists from './TopArtists'

import { useDispatch, useSelector } from 'react-redux'
import { loadTopChartsData } from '../../redux/slices/topChartsSlice'

const LOADING_STYLES = {
  titleStyles: {
    fontSize: '1rem',
    marginTop: '20%'
  },
  imgStyles: {
    width: '4.8rem'
  }
}

const ERROR_STYLES = {
  titleStyles: {
    fontSize: '1rem',
  },

  imgStyles: {
    width: '6.4rem',
    marginTop: '20%'
  },

  retryBtnStyles: {
    fontSize: '.8rem',
    padding: '.2rem .4rem'
  }
}

const TopChartsAndArtists = () => {
  const topChartsData = useSelector(state => state.topCharts.data)
  const dispatch = useDispatch()

  useEffect(() => {
     if(topChartsData.length === 0) dispatch(loadTopChartsData())
  }, [])


  return (
    <div className='charsAndArtist-container'>
      <TopCharts topChartsData={topChartsData} loadingStyles= {LOADING_STYLES} errorStyles={ERROR_STYLES}/>
      <TopArtists topChartsData={topChartsData} loadingStyles= {LOADING_STYLES} errorStyles={ERROR_STYLES}/>
    </div>
  )
}

export default TopChartsAndArtists