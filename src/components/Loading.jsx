import React from 'react'
import loader from '../assets/loader.svg'

const Loading = ({title, titleStyles, logoStyles }) => {
  return (
    <div className='loading-container'>
      <div style={titleStyles} className="default-loading-title">{title}</div>
      <img src={loader} alt="" style={logoStyles} className="default-loading-img"/>
    </div>
  )
}

export default Loading