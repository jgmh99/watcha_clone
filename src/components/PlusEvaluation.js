import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const PlusEvaluation = () => {
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isRated, setIsRated] = useState(false);

    useEffect(() => {
        const fetchMovieData = async () => {
            const url = window.location.href;
            const movieId = url.split('/').pop(); // URL에서 영화 ID 추출
            const evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};

            if (evaluations[movieId]) {
                setRating(evaluations[movieId].rating);
                setIsRated(true);
            } else {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
                );
                const movieData = response.data;
                saveGenre(movieId, movieData.genres);
            }
        };

        fetchMovieData();
    }, []);

    const handleStarClick = (index) => {
        setRating(index);
        saveRating(index);
        setIsRated(true);
    };

    const handleStarHover = (index) => {
        setHoverRating(index);
    };

    const handleStarHoverOut = () => {
        setHoverRating(0);
    };

    const saveRating = (rating) => {
        const url = window.location.href;
        const movieId = url.split('/').pop(); // URL에서 영화 ID 추출
        let evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
        if (evaluations[movieId]) {
            evaluations[movieId].rating = rating;
        } else {
            evaluations[movieId] = { rating, genres: [] }; // Initialize with empty genres array
        }
        localStorage.setItem('evaluations', JSON.stringify(evaluations));
    };

    const saveGenre = (movieId, genres) => {
        let evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
        if (evaluations[movieId]) {
            evaluations[movieId].genres = genres;
        } else {
            evaluations[movieId] = { rating: 0, genres }; // Initialize with 0 rating
        }
        localStorage.setItem('evaluations', JSON.stringify(evaluations));
    };

    const renderStars = () => {
        const stars = [];
        const currentRating = hoverRating || rating;

        for (let i = 1; i <= 5; i++) {
            const icon = i <= currentRating ? faStarSolid : faStarEmpty;

            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={icon}
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => handleStarHover(i)}
                    onMouseLeave={handleStarHoverOut}
                    style={{ 
                        color: i <= currentRating ? '#ffd700' : '#ccc', 
                        cursor: 'pointer',
                        fontSize: '26px',
                        marginRight: '2px'
                    }}
                />
            );
        }
        return stars;
    };

    return (
        <div>
            <Button variant="link" onClick={() => setShowRating(!showRating)} style={{ color: isRated ? '#ffd700' : '#fff' }}>
                <Row style={{ display: 'flex', flexDirection: 'column' }}>
                    <Col style={{ fontSize: '26px' }}><FontAwesomeIcon icon={faStarSolid} /></Col>
                    <Col style={{ fontSize: '12px' }}>평가하기</Col>
                </Row>
            </Button>
            {showRating && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    {renderStars()}
                </div>
            )}
        </div>
    );
};

export default PlusEvaluation;
