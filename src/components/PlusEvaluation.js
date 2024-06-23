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
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_BASE_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`
                    );
                    const movieData = response.data;
                    saveGenre(movieId, movieData.genres);
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                }
            }
        };

        fetchMovieData();
    }, []);

    const handleStarClick = (index) => {
        setRating(index); // 클릭한 별점을 상태에 저장
        saveRating(index); // 로컬스토리지에 저장
        setIsRated(true);
    };

    const handleStarHover = (index) => {
        setHoverRating(index); // 호버한 별점을 상태에 저장
    };

    const handleStarHoverOut = () => {
        setHoverRating(0); // 호버 상태 초기화
    };

    const saveRating = (rating) => {
        const url = window.location.href;
        const movieId = url.split('/').pop(); // URL에서 영화 ID 추출
        let evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
        if (evaluations[movieId]) {
            evaluations[movieId].rating = rating;
        } else {
            evaluations[movieId] = { rating, genres: [] }; // 초기화
        }
        localStorage.setItem('evaluations', JSON.stringify(evaluations)); // 로컬스토리지에 저장
    };

    const saveGenre = (movieId, genres) => {
        let evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
        if (evaluations[movieId]) {
            evaluations[movieId].genres = genres;
        } else {
            evaluations[movieId] = { rating: 0, genres }; // 초기화
        }
        localStorage.setItem('evaluations', JSON.stringify(evaluations)); // 로컬스토리지에 저장
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
