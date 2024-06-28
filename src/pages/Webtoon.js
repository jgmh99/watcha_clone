import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

const WebtoonList = () => {
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
              backgroundColor: provider === prov ? '#fff' : 'transparent', 
              color: provider === prov ? '#000' : '#fff', 
              border:'1px solid gray', 
              borderRadius:'15px', 
              padding:'10px',
              fontSize:'14px'
            }} 
            onClick={() => handleProviderChange(prov)}
          >
            {prov}
          </button>
        ))}
      </div>
      <div>
        {loading ? (
          <div>웹툰 목록을 불러오는 중입니다...</div>
        ) : (
          <div style={{display:'flex', width:'100%'}}> 
            {Object.keys(webtoonsByDay).map(day => (
              <div key={day} style={{border:'1px solid #212529', width:'calc(100% / 7)', padding:'10px', textAlign:'center', borderRadius:'15px'}}>
                <div style={{borderRadius:'10px', marginBottom:'1em', backgroundColor:'#212529'}}>
                  <p style={{marginBottom:'0',fontSize:'16px', padding:'5px'}}>{day}</p>
                </div>
                <ul style={{padding:'0'}}>
                  {webtoonsByDay[day] && webtoonsByDay[day].length > 0 ? (
                    webtoonsByDay[day].map(webtoon => (
                      <li key={webtoon.id}>
                        <LazyLoad height={200} once>
                          <div style={{width:'100%', height:'15rem', border:'2px solid #212529', marginBottom:'1em', borderRadius:'10px', overflow:'hidden'}}>
                            <img src={webtoon.thumbnail[0]} style={{width:'100%', height:'90%'}} alt={webtoon.title} />
                            <Link 
                              to={`/webtoon/${webtoon.id}?provider=${provider}&day=${day}`} 
                              style={{fontSize:'14px', height:'10%', display:'block', whiteSpace:'nowrap', overflow: 'hidden', textOverflow:'ellipsis'}}
                            >
                              {webtoon.title}
                            </Link>
                          </div>
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
