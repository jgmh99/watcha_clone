// src/components/Contents.js
import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPopularMovies } from '../redux/MovieSlice'

const Contents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPopularMovies());
    }
  }, [status, dispatch]);

  const handleCardClick = (movieId) => {
    navigate(`/info/${movieId}`);
  };

  let content;
  
  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <Row xs={2} md={3} lg={5} xl={7} className="g-4" >
        {movies.map((movie) => (
          <Col key={movie.id} onClick={() => handleCardClick(movie.id)}>
            <Card className="movie-card">
              <Card.Img 
                variant="top" 
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} 
                className="card-img"
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className='movie_cont'>
      {content}
    </div>
  );
}

export default Contents;
