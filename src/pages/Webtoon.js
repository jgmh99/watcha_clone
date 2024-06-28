import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

const WebtoonList = () => {

  const week = new Array('SUB','MON','TUE','WED','THU','FRI','SAT');

  let today = new Date().getDay();
  //테스트용
  // let todayLabel = 'SAT';
  //실제 사용할때
  let todayLabel = week[today];


  console.log(todayLabel);
  

  const [webtoonsByDay, setWebtoonsByDay] = useState({
    'MON': [],
    'TUE': [],
    'WED': [],
    'THU': [],
    'FRI': [],
    'SAT': [],
    'SUN': []
  });
  const [provider, setProvider] = useState(() => {
    const storedProvider = localStorage.getItem('selectedProvider');
    return storedProvider ? storedProvider : 'NAVER';
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWebtoonsByDay = async () => {
      setLoading(true);
      const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
      const promises = days.map(day => {
        const apiUrl = `https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=${provider}&page=1&perPage=&isEnd=false&sort=ASC&updateDay=${day}`;
        
        return axios.get(apiUrl)
          .then(response => response.data.webtoons)
          .catch(error => {
            console.error(`웹툰 데이터를 가져오는 중 오류 발생 (${day}):`, error);
            return []; // 에러 발생 시 빈 배열 반환
          });
      });

      try {
        const results = await Promise.all(promises);
        const updatedWebtoonsByDay = {};
        days.forEach((day, index) => {
          updatedWebtoonsByDay[day] = results[index];
        });
        setWebtoonsByDay(updatedWebtoonsByDay);
      } catch (error) {
        console.error('여러 요일의 웹툰 데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebtoonsByDay();
  }, [provider]);

  useEffect(() => {
    localStorage.setItem('selectedProvider', provider);
  }, [provider]);

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider);
  };

  return (
    <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
      <h2>웹툰 목록</h2>
      <div style={{display:'flex', gap:'1em', margin:'1em 0'}}>
        {['NAVER', 'KAKAO', 'KAKAO_PAGE'].map(prov => (
          <button 
            key={prov} 
            style={{
              backgroundColor: provider === prov ? 'rgb(255, 4, 88)' : 'transparent', 
              color: '#fff', 
              border: provider === prov ? '1px solid rgb(255, 4, 88)' : '1px solid gray',
              borderRadius:'15px', 
              padding:'10px',
              fontSize:'14px'
            }} 
            onClick={() => handleProviderChange(prov)}
          >
            {
              prov == 'NAVER' ? '네이버 웹툰'
              :prov == 'KAKAO' ? '카카오 웹툰'
              : '카카오페이지'
            }
          </button>
        ))}
      </div>
      <div>
        {loading ? (
          <div>웹툰 목록을 불러오는 중입니다...</div>
        ) : (
          <div style={{display:'flex', width:'100%'}}> 
            {Object.keys(webtoonsByDay).map(day => (
              <div key={day} style={{border: todayLabel === day ? '1px solid rgb(255, 4, 88)' : '1px solid #212529',width:'calc(100% / 7)', padding:'10px', textAlign:'center', borderRadius:'15px'}}>
                <div style={{borderRadius:'10px 10px 0 0', marginBottom:'1em', backgroundColor: todayLabel === day ? 'rgb(255, 4, 88)' : '#212529'}}>
                  <p style={{
                      marginBottom:'0',
                      fontSize:'16px',
                      padding:'5px', 
                      color: (day === 'SAT' ? 'blue' : day === 'SUN' ? 'rgb(255, 4, 88)' : '#fff'),
                      ...(day === 'SAT' && todayLabel === 'SAT' && { color: '#fff' }),
                      ...(day === 'SUN' && todayLabel === 'SUN' && { color: '#fff' })
                      // spread operator 사용해서 day, todayLabel이 똑같이 SUN일때만 글색을 #FFF로 설정
                      }}>
                    {
                      day === 'MON' ? '월요일'
                      :day === 'TUE' ? '화요일'
                      :day === 'WED' ? '수요일'
                      :day === 'THU' ? '목요일'
                      :day === 'FRI' ? '금요일'
                      :day === 'SAT' ? '토요일'
                      :day === 'SUN' ? '일요일'
                      :''
                    }
                  </p>
                </div>
                <ul style={{padding:'0'}}>
                  {webtoonsByDay[day] && webtoonsByDay[day].length > 0 ? (
                    webtoonsByDay[day].map(webtoon => (
                      <li key={webtoon.id}>
                        <LazyLoad height={200} once>
                            <Link 
                              to={`/webtoon/${webtoon.id}?provider=${provider}&day=${day}`} 
                              style={{fontSize:'14px', height:'10%', display:'block', whiteSpace:'nowrap', overflow: 'hidden', textOverflow:'ellipsis'}}
                            >
                              <div style={{position:'relative', width:'100%', height:'15rem', border:'2px solid #212529', marginBottom:'1em', borderRadius:'10px', overflow:'hidden'}}>
                                <img src={webtoon.thumbnail[0]} alt={webtoon.title} style={{
                                    width:'100%', 
                                    height:'90%',
                                    backgroundColor: provider === 'KAKAO' ? 'gray' : ''
                                  }}
                                />
                                <p>{webtoon.title}</p>
                                {
                                  webtoon.isUpdated == true ? <div style={{borderRadius:'5px 5px 0 0',position:'absolute', width:'auto', padding:'0 10px', transform:'translateX(-50%)',left:'50%',bottom:'10%', backgroundColor:'#fff', color:'black'}}>
                                  <p style={{margin:'0'}}>새로운 이야기</p>
                                </div> : ''
                                }
                                
                              </div>
                            </Link>
                        </LazyLoad>
                      </li>
                    ))
                  ) : (
                    <li>해당 요일에는 웹툰이 없습니다.</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebtoonList;
