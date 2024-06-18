import React, { useEffect } from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMovies } from '../redux/MovieSlice';
const Contents = () => {

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);
    
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchPopularMovies());
      }
    }, [status, dispatch]);
  
    let content;
    
    if (status === 'loading') {
        content = <div>Loading...</div>;
    } else if (status === 'succeeded') {
        content = (
            <Row xs={2} md={4} className="g-4">
            {movies.map((movie) => (
                <Col key={movie.id}>
                    {/* <Card style={{ width: '16rem',height:'11rem' }}> */}
                    <Card className='movie-card'>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
                        <p>{movie.title}</p>
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
            {/* <Card style={{ width: '16rem',height:'11rem' }}>
                <Card.Img variant="top" src={testImg} />
            </Card> */}
            {content}
        </div>
    )
}

export default Contents