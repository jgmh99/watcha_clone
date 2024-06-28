import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

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
      <img src={webtoon.thumbnail[0]} alt={webtoon.title} style={{ width: '10%', height: 'auto' }} />
      {/* <p>{webtoon.id}</p> */}
      <p>제목: {webtoon.title}</p>
      <p>업데이트 요일: {webtoon.updateDays}</p>
      <p>제공자: {webtoon.provider}</p>
      <p>연령 등급: {webtoon.ageGrade === 0 ? '전체 이용 가능' : '성인 이용 가능'}</p>
      <p>작가: {webtoon.authors}</p>
      <div>
        <h3>무료 회차</h3>
        <ul>
          {/* NAVER 제공자일 때는 5개의 회차를 역순으로 생성 */}
          {provider === 'NAVER' && [...Array(20)].map((_, index) => {
            const episodeNumber = index + 1; // 회차 번호는 1부터 시작
            const episodeLink = `${webtoonLinkFormat}${episodeNumber}`;
            return (
              <li key={episodeNumber}>
                <a href={episodeLink} target="_blank" rel="noopener noreferrer">
                  {webtoon.title} {episodeNumber}회
                </a>
              </li>
            );
          })}
          {/* NAVER 이외의 제공자는 첫 번째 회차 하나만 생성 */}
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
