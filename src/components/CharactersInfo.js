import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';

const CharactersInfo = ({ movieId }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [cast, setCast] = useState([]);
  

  useEffect(() => {
    if (!movieId) return; // movieId가 정의되지 않았으면 API 요청을 하지 않음

    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
    
    axios.get(apiUrl)
      .then(response => {
        setCast(response.data.cast);
      })
      .catch(error => {
        console.error('Error fetching cast:', error);
      });
  }, [movieId, apiKey]);
  
  return (
    <div className='CharactersInfo' style={{paddingBottom:'80px'}}>
      <h2>주요 출연진</h2>
      <Row xs={2} md={6} className="g-4">
        {cast.map(actor => (
          <Col key={actor.id} className="mb-4">
            <div className="border p-2" style={{ height: '100%' }}>
            <LazyLoad height={200} once>
              <img
                src={actor.profile_path !== null ? `https://image.tmdb.org/t/p/w154${actor.profile_path}` : 'https://placehold.jp/696969/ffffff/300x450.png?text=NO%20IMAGE'}
                alt={actor.name}
                className="img-fluid mb-2"
                style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
              />
            </LazyLoad>
              <p className="m-0" style={{ fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {actor.name} - {actor.character}역
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CharactersInfo;
