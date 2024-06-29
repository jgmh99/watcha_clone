import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; // slick theme CSS import

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});

const GenreCarousel = () => {
  const [genres, setGenres] = useState([]);
  const [expanded, setExpanded] = useState(false); // 상태 추가

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/genre/movie/list?language=ko-KR');
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const genreData = {
    //색상 추가
    28: ['/Tag_img/action.png', 'rgb(152, 27, 0)'], //액션
    12: ['/Tag_img/adventur.png', 'rgb(39, 63, 55)'], //모험
    16: ['/Tag_img/animation.png', 'rgb(114, 75, 0)'], // 애니메시연
    35: ['/Tag_img/comedy.png', 'rgb(136, 62, 62)'], //코미디
    80: ['/Tag_img/crime.png', 'rgb(74, 55, 68)'], //범죄
    99: ['/Tag_img/document.png', 'rgb(96, 101, 41)'], //다큐
    18: ['/Tag_img/drama.png', 'rgb(195, 47, 103)'], //드라마
    10751: ['/Tag_img/family.png', 'rgb(102, 34, 113)'],//가족
    14: ['/Tag_img/fantasy.png', 'rgb(0, 116, 123)'],//판타지
    36: ['/Tag_img/history.png', 'rgb(45, 85, 26)'],//역사
    27: ['/Tag_img/scary.png', 'rgb(26, 71, 113)'],//공포
    10402: ['/Tag_img/music.png', 'rgb(47, 37, 111)'],//음악
    9648: ['/Tag_img/mystery.png', 'rgb(119, 122, 208)'],//미스터리
    10749: ['/Tag_img/romance.png', 'rgb(122, 14, 124)'],//로맨스
    878: ['/Tag_img/sf.png', 'rgb(0, 47, 62)'],//sf
    10770: ['/Tag_img/TV_movie.png', 'rgb(188, 38, 114)'],//tv영화
    53: ['/Tag_img/thriler.png', 'rgb(56, 11, 11)'],//스릴러
    10752: ['/Tag_img/war.png', 'rgb(165, 58, 58)'],//전쟁
    37: ['/Tag_img/seobu.png', 'rgb(159, 35, 35)'],//서부
  };

  const settings = {
    dots: false,
    infinite: true,
    // speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    draggable: true, //모바일 환경에서 터치가능하게

    responsive: [
      { breakpoint: 576, // 화면의 넓이가 320px 이상일 때
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // prevArrow: <></>, // 이전 화살표 숨기기
          // nextArrow: <></>, // 다음 화살표 숨기기
        }
      },
      { breakpoint: 768, // 화면의 넓이가 768px 이상일 때
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          // prevArrow: <></>, // 이전 화살표 숨기기
          // nextArrow: <></>, // 다음 화살표 숨기기
        }
      },
      { breakpoint: 992, // 화면의 넓이가 992px 이상일 때
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          // prevArrow: <></>, // 이전 화살표 숨기기
          // nextArrow: <></>, // 다음 화살표 숨기기
        }
      },
      
    ]
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="carousel-container" style={{ margin:'1em 0'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h6>장르별 검색</h6>
        <button onClick={toggleExpand} style={{ backgroundColor: 'transparent', color:'#fff',fontSize:'14px', border: 'none', padding: '0.5em 1em', borderRadius: '5px' }}>
          {expanded ? '캐러셀 보기' : '펼쳐보기'}
        </button>
      </div>
      {expanded ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {genres.map((genre) => (
            <div key={genre.id} style={{ flex: '1 0 150px', margin: '1em', textAlign: 'center' }}>
              <Link to={`/genre/${genre.id}/${genre.name}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div style={{ position: 'relative', backgroundColor: genreData[genre.id][1] || '', borderRadius: '10px', width: '100%', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={genreData[genre.id][0] || ''} alt={genre.name} style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />
                  <div style={{ position: 'relative', zIndex: 1, color: '#fff', WebkitTextStroke: '1px black' }}>
                    {genre.name}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {genres.map((genre) => (
            <div key={genre.id} className="genre-item">
              <Link to={`/genre/${genre.id}/${genre.name}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div style={{ position: 'relative', marginLeft: '1em', backgroundColor: genreData[genre.id][1] || '' }}>
                  <img src={genreData[genre.id][0] || ''} alt={genre.name} style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '10px', color: '#fff', textAlign: 'end', WebkitTextStroke: '1px black', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 }}>
                    <p style={{ /* 글자크기 자동으로 조절해야함 */ fontSize:'1.5rem', margin:'0'}}>{genre.name}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default GenreCarousel;
