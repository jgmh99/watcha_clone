import React from 'react'
import HeaderText from '../components/HeaderText'
import Contents from '../components/Contents'
import Construction from '../img/vecteezy_abstract-under-construction-background-with-black-and-yellow_7702324-1.jpg'

const Webtoon = () => {
  return (
    <div className='Page' style={{fontSize:'24px', margin:'1em 1em'}}>
      {/* <HeaderText text="Webtoon" /> */}
      <div style={{position:'relative'}}>
        <img src={Construction} style={{width:'100%', height:'100%'}}/>
        <h3 style={{position:'absolute', top:'48%', left:'48%', transform:'translate(-50%,-50%)'}}>서비스 준비중입니다</h3>
      </div>
    </div>
  )
}

export default Webtoon