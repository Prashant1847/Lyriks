import React from 'react'
import error from '../assets/error.png'


const Error = ({ title = "Something Went Wrong", titleStyles, errorImgStyles, retryBtnStyles, callBackForRetry, showRetryBtn = true}) => {
  return (
    <div className='error-container'>
      <img src={error} alt="" style={errorImgStyles} className="default-error-img" />
      <div style={titleStyles}
        className="default-error-title">{title}
        {showRetryBtn && <button className='retry-btn' style={retryBtnStyles} onClick={callBackForRetry}>Retry</button>}
      </div>
    </div>
  )
}

export default Error