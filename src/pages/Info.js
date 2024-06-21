import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../redux/MovieDetailSlice';
import { Container, Row, Col } from 'react-bootstrap';

const Info = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movieDetails.movie); // Redux 상태에서 movie 객체 가져오기
  const status = useSelector((state) => state.movieDetails.status); // Redux 상태에서 status 가져오기
  const error = useSelector((state) => state.movieDetails.error); // Redux 상태에서 error 가져오기

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId)); // 컴포넌트가 마운트되면 영화 정보 가져오기
  }, [dispatch, movieId]);

  console.log(movieId);
  
  useEffect(() => {
    console.log('Movie state:', movie); // Redux 상태 변화를 콘솔에서 확인
  }, [movie]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>; // 로딩 중이면 로딩 메시지 표시
  } else if (status === 'succeeded' && movie) {
    // 성공적으로 데이터를 가져오면 영화 정보 표시
    console.log(movie);

    const isDesktop = window.innerWidth >= 768;
    content = (
      // <div>
      //   <img src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}/>
        

      //   <h1>{movie.title}</h1>
      //   <p>{movie.overview}</p>
      //   <p>Release Date: {movie.release_date}</p>
      //   <p>Runtime: {movie.runtime} minutes</p>
      //   {/* 필요한 다른 정보들을 추가적으로 표시할 수 있습니다 */}
      // </div>
      <Container fluid>
      {isDesktop ? (
        <Row style={{ border:'1px solid red'}}>
          <Col xs={12} md={6} style={{ height: 'auto'}}>
            {/* 데스크탑 환경 - 왼쪽 */}
            Left Content
          </Col>
          <Col xs={12} md={6} style={{padding:'0'}}>
            {/* 데스크탑 환경 - 오른쪽 */}
            <img src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`} alt="Right Image" style={{maxWidth: '100%', height: 'auto' }} />
          </Col>
        </Row>
      ) : (
        <>
          {/* 모바일 환경 */}
          <Row>
            <Col xs={12} style={{ padding: '0' }}>
              {/* 모바일 환경 - 위쪽 */}
              <img src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`} alt="Top Image" style={{ maxWidth: '100%', height: 'auto' }} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} style={{ backgroundColor: 'white', height: '20vh' }}>
              {/* 모바일 환경 - 아래쪽 */}
              Bottom Content
            </Col>
          </Row>
        </>
      )}
      </Container>

    );
  } else if (status === 'failed') {
    content = <div>{error}</div>; // 실패 시 에러 메시지 표시
  }

  return (
    <div className='Page' style={{fontSize:'24px', margin:'1em 1em' }}>
      {content}
    </div>
  );
  
};

export default Info;
