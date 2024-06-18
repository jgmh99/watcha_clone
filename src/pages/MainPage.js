import React, { useState } from 'react'
import HeaderText from '../components/HeaderText'
import Contents from '../components/Contents'

import testImg from '../img/item1.png'
const MainPage = () => {

  return (
    <div className='Page' style={{fontSize:'24px', margin:'1em 1em' }}>
      <HeaderText text="이거 어때요?" />
      <Contents/>
    </div>
  )
}

export default MainPage