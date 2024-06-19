// src/features/movies/RandomMovie.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRandomMovie } from '../redux/RandomMovieSlice';

const RandomMovie = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.randomMovie.movie);
  const status = useSelector((state) => state.randomMovie.status);
  const error = useSelector((state) => state.randomMovie.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRandomMovie());
    }
  }, [status, dispatch]);

  let content;

  const [iframeHeight, setIframeHeight] = useState(500); // 초기 높이 설정 (예: 315px)

  // 화면 크기가 변할 때마다 높이를 조정하는 함수
  const updateIframeHeight = () => {
    const windowHeight = window.innerHeight; // 현재 창의 높이
    // 원하는 비율로 높이를 조정할 수 있습니다. 예를 들어 50%로 설정하려면 windowHeight * 0.5 등
    const newHeight = Math.floor(windowHeight * 0.5); // 예시로 50% 높이로 조정
    setIframeHeight(newHeight); // 상태 업데이트
  };

  // 컴포넌트가 마운트될 때와 화면 크기가 변할 때마다 높이를 업데이트
  useEffect(() => {
    updateIframeHeight(); // 초기화 시 한 번 호출
    window.addEventListener('resize', updateIframeHeight); // 창 크기가 변경될 때마다 호출

    return () => {
      window.removeEventListener('resize', updateIframeHeight); // 컴포넌트가 언마운트될 때 리스너 제거
    };
  }, []); // 빈 배열을 넘기면 컴포넌트가 처음 렌더링될 때만 호출
  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div className='mb-4'>
        
        
        {movie.trailer ? (
          <div style={{position:'relative', height:'0', paddingBottom:"56.25%"}}>
            <iframe
            title="Trailer"
            width="100%"
            height={iframeHeight}
            src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1&controls=0&mute=1&start=30`}
            frameBorder="0"
            allowFullScreen
            style={{ position:'absolute', top:'0', left:'0', width:'100%', height:'100%', zIndex: '9'}}
            />
             {/* 클릭 막기용 */}
            <div style={{position:'absolute', background:'linear-gradient(transparent, black 90%)', width:'100%', height:'100%', zIndex:'99'}}></div>
            <div style={{padding:'20px', position:'absolute', bottom:0,left:0, width:'auto',height:'auto', zIndex:'99', fontFamily:'LeferiPoint-BlackA'}}>
                <h2>{movie.title}</h2>
                <p style={{fontSize:'16px'}}>{movie.tagline}</p>
            </div>
            
          </div>
        ) : (
          <p>No trailer available</p>
        )}
      </div>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section>
      {content}
    </section>
  );
};

export default RandomMovie;
