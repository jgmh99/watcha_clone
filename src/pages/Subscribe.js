import React from 'react'

import HeaderText from '../components/HeaderText'
import Contents from '../components/Contents'

const Subscribe = () => {
  return (
    <div className='Page' style={{fontSize:'24px', margin:'1em 1em'}}>
      <HeaderText text="구독" />
      <Contents/>
    </div>
  )
}

export default Subscribe