import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Locker = () => {
    const [movies, setMovies] = useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const lockerMovies = JSON.parse(localStorage.getItem('lockerMovies')) || [];
            const moviePromises = lockerMovies.map(movieId => 
                axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR&page=1`)
            );

            const movieResponses = await Promise.all(moviePromises);
            setMovies(movieResponses.map(response => response.data));
        };

        fetchMovies();
    }, [API_KEY, BASE_URL]);

    const handleMovieClick = (movieId) => {
        navigate(`/info/${movieId}`);
    };

    return (
        <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
            <h2>보관함</h2>
            <Container>
                <Row xs={2} md={3} lg={5} xl={7} className="g-4" >
                    {movies.map(movie => (
                        <Col 
                            key={movie.id} 
                            style={{height: '15em', cursor: 'pointer'}}
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <img 
                                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} 
                                alt={movie.title} 
                                style={{ width: '100%', height: '100%'}}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Locker;
