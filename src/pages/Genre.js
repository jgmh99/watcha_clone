import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import GenreCarousel from '../components/GenreCarousel';

const Genre = () => {
  const { id, name } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  console.log(id, name)

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            with_genres: id,
            language: 'ko-KR',
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMoviesByGenre();
  }, [id]);
  const handleMovieClick = (movieId) => {
    navigate(`/info/${movieId}`);
  };
  return (
    <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
      <h1>Genre Page for ID: {id}, {name}</h1>
      <GenreCarousel/>
      {movies.length > 0 ? (
        <Container>
          <Row xs={2} md={3} lg={5} xl={7} className="g-4" >
            {movies.map(movie => (
              <Col key={movie.id}
              style={{height: '15em', cursor: 'pointer'}}
              onClick={() => handleMovieClick(movie.id)}
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    style={{ borderRadius: '10px', width:'100%', height:'100%' }}
                  />
                )}
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <p>에러ㅓㅓㅓㅓㅓㅓ</p>
      )}
    </div>
  );
};

export default Genre;
