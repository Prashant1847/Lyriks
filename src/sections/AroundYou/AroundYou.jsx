import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {FeedTitle, Grid, SongCard, Loading, Error} from '../../components'

import { setCountryCode, loadAroundYouData } from '../../redux/slices/aroundYouSlice'
import { setUpMusicPlayer } from '../../redux/slices/musicPlayerSlice'

const countryCodeUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_GEOLOCATION_API_KEY}&fields=country_code2`

const AroundYou = () => {
  const countryCode = useSelector(state => state.aroundYou.countryCode)
  const {data:aroundYouData, loading, error} = useSelector(state =>state.aroundYou)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function fetchCountryCode(){
      const res = await fetch(countryCodeUrl)
      const {country_code2} = await res.json()
      dispatch(setCountryCode(country_code2))
    }
    if(!countryCode) fetchCountryCode()
  },[])

  useEffect(()=>{
    if(aroundYouData.length === 0 && countryCode) dispatch(loadAroundYouData())
  },[countryCode])

  const handlePlayerSetUp = (songData) => {
    dispatch(setUpMusicPlayer(songData, aroundYouData))
  }

  return (
    <>
        <FeedTitle title="Around You"/>
        {error && <Error callBackForRetry={()=> dispatch(loadAroundYouData())}/>}

        {loading &&  <Loading title="Loading around you songs" />}

        {(!error && !loading) && <Grid data={aroundYouData} Card={SongCard} callBackForCard={handlePlayerSetUp}/>}
    </>
  )
}

export default AroundYou