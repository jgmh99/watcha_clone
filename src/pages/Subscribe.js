import React from 'react'

import HeaderText from '../components/HeaderText'
import Contents from '../components/Contents'
import RandomMovie from '../components/RandomMovie'
const Subscribe = () => {
  return (
    <div className='Page' style={{fontSize:'24px', margin:'1em 1em'}}>
      <HeaderText text="구독" />
      <RandomMovie/>
      <Contents/>
    </div>
  )
}

export default Subscribe