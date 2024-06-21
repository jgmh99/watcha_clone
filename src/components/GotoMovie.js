import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const GotoMovie = () => {
    const { movieId } = useParams();
    const movies = useSelector((state) => state.movies.movies);

    const relatedMovies = movies.filter((movie) => movie.id !== parseInt(movieId, 10)); // 임의로 관련 영화를 필터링

    return (
        <div>
            <h2>Related Movies</h2>
            <Row xs={2} md={3} lg={5} xl={7} className="g-4">
                {relatedMovies.map((movie) => (
                    <Col key={movie.id}>
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
        </div>
    );
}

export default GotoMovie;
