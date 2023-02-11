import React from 'react'


const Grid = ({Card, data, callBackForCard}) => {
  return (
    <div className='feed-results-grid'>
      {data.map((item, index) => <Card key={index} data={item} callBackForCard={callBackForCard}/>)}
    </div>
  )
}

export default Grid