import React from 'react'
import HeaderText from '../components/HeaderText'
import Contents from '../components/Contents'

const MainPage = () => {

  return (
    <div className='Page' style={{fontSize:'24px', margin:'1em 1em' }}>
      <HeaderText text="와챠 최신작" />
      <Contents/>
    </div>
  )
}

export default MainPage