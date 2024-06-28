import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import kakaowebtoonIcon from '../img/kakaowebtoonIcon.png'
import kakaopage from '../img/kakaopage.png'
import naver from '../img/naver.png'
const WebtoonInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const provider = params.get('provider');
  const day = params.get('day');
  const [webtoon, setWebtoon] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchWebtoonDetails = async () => {
      if (!provider || !day || !id) return;

      setLoading(true);
      const apiUrl = `https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=${provider}&page=1&perPage=&isEnd=false&sort=ASC&updateDay=${day}`;
      
      try {
        const response = await axios.get(apiUrl);
        const webtoonDetails = response.data.webtoons.find(w => w.id === id);
        setWebtoon(webtoonDetails);
      } catch (error) {
        console.error('웹툰 정보를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebtoonDetails();
  }, [provider, day, id]);

  if (loading) {
    return <div>웹툰 정보를 불러오는 중입니다...</div>;
  }

  if (!webtoon) {
    return <div>웹툰 정보를 찾을 수 없습니다.</div>;
  }

  // id에서 숫자만 추출
  const slicedId = id.split('_')[1];

  // 요일을 소문자로 변환
  const lowerCaseDay = day.toLowerCase();

  let webtoonLinkFormat = '';

  // 제공자에 따른 링크 형식 설정
  if (provider === 'NAVER') {
    webtoonLinkFormat = `https://comic.naver.com/webtoon/detail?titleId=${slicedId}&week=${lowerCaseDay}&no=`;
  } else if (provider === 'KAKAO') {
    const titleForLink = webtoon.title.replace(/\s/g, '-'); // 제목에서 띄어쓰기를 '-'로 변환
    webtoonLinkFormat = `https://webtoon.kakao.com/content/${titleForLink}/${slicedId}`;
  } else if (provider === 'KAKAO_PAGE') {
    webtoonLinkFormat = `https://page.kakao.com/content/${slicedId}`;
  }

  return (
    <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
      <div style={{display:'flex',gap:'10px', height:'30vh', border:'1px solid blue'}}>
        <img src={webtoon.thumbnail[0]} alt={webtoon.title} style={{ width: '', height: 'auto' }} />
        {/* <p>{webtoon.id}</p> */}
        <div style={{lineHeight:'30vh', height:'3em', transform:'translateY(100%)'}}>
            <h3>{webtoon.title}</h3>
            <div style={{
                alignItems:'center',
                color:'#babac1',
                display:'flex',
                flexWrap:'wrap',
                fontSize:'15px',
                
                fontWeight:'400',
                gap:'8px',
                lineHeight:'20px',
                marginBottom:'1em'
              }}>
                <span style={{fontSize:'24px', color:'green', width:'1.5em', height:'1.5em', border:'1px solid #fff', borderRadius:'3px'}}>
                    {
                        webtoon.provider == 'NAVER' ? <img style={{width:'100%', height:'100%'}} src={naver}/>
                        :webtoon.provider == 'KAKAO' ? <img style={{width:'100%', height:'100%'}} src={kakaowebtoonIcon}/>
                        :<img style={{width:'100%', height:'100%'}} src={kakaopage}/>
                    }
                </span>
                <span> · {
                    webtoon.updateDays === 'MON' ? '월요일'
                    :webtoon.updateDays === 'TUE' ? '화요일'
                    :webtoon.updateDays === 'WED' ? '수요일'
                    :webtoon.updateDays === 'THU' ? '목요일'
                    :webtoon.updateDays === 'FRI' ? '금요일'
                    :webtoon.updateDays === 'SAT' ? '토요일'
                    :'일요일'
                } · </span>
                <span
                    style={{ color: webtoon.ageGrade === 0 ? '' : 'red'}}
                >{webtoon.ageGrade === 0 ? 'All' : '19'}</span>
                <span> · {webtoon.authors}</span>
            </div>
        </div>
      </div>

      <div>
        <h3>회차</h3>
        <ul style={{padding:'0'}}>
          {provider === 'NAVER' && [...Array(5)].map((_, index) => {
            const episodeNumber = index + 1; // 회차 번호는 1부터 시작
            const episodeLink = `${webtoonLinkFormat}${episodeNumber}`;
            return (
              <li key={episodeNumber} style={{marginBottom:'1em'}}>
                <a href={episodeLink} target="_blank" rel="noopener noreferrer" >
                    <div style={{border:'1px solid red', display:'flex',gap:'1em', height:'15vh'}}>
                        <img src={webtoon.thumbnail} style={{width:'4.5em'}}/>
                        <div style={{lineHeight:'15vh'}}>
                            <p>#{episodeNumber}</p>
                        </div>
                    </div>
                </a>
              </li>
            );
          })}
          {/* NAVER 이외는 바로가기 하나만 생성 */}
          {provider !== 'NAVER' && (
            <li key={1}>
              <a href={webtoonLinkFormat} target="_blank" rel="noopener noreferrer">
                {webtoon.title}
              </a>
              {/* <p>{webtoonLinkFormat}</p> */}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default WebtoonInfo;
