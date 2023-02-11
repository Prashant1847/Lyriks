import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { Error, Loading } from '../../components'
import { loadTopChartsData} from '../../redux/slices/topChartsSlice'

import imgNotAvailable from '../../assets/imgNotAvailable.png'

const TopArtists = ({ topChartsData, loadingStyles, errorStyles }) => {
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.topCharts)

  const handleClick = id => {
    navigate(`/artistDetails/${id}`)
  }

  const handleSeeMoreClick = ()=>{
    navigate('/TopArtists')
  }

  return (
    <div className='topArtists-container'>

      <div className='chartsAndArtist-title'>
        Top Artists <button className='see-more-btn' onClick={handleSeeMoreClick}>See more</button>
      </div>

      <div className='topArtists-img-container'>
        {error && <Error titleStyles={errorStyles.titleStyles} errorImgStyles={errorStyles.imgStyles} retryBtnStyles={errorStyles.retryBtnStyles} callBackForRetry={()=> dispatch(loadTopChartsData())} />}

        {loading && <Loading title="Loading Top Artists" titleStyles={loadingStyles.titleStyles} logoStyles={loadingStyles.imgStyles} />}

        {(!error && !loading) &&
          topChartsData.map((item, index) => {
            const { artistImgSrc, artistId } = item
            return <img 
                      key={index}
                      src={artistImgSrc? artistImgSrc: imgNotAvailable}
                      className={`topArtists-img ${!artistImgSrc? 'img-not-available-artist': ''}`}
                      onClick={() => handleClick(artistId)} />
          })
        }

      </div>
    </div>
  )
}

export default TopArtists