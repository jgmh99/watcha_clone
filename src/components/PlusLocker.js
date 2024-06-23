import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const PlusLocker = () => {
    const [locker, setLocker] = useState(false);
    const [isMovieInLocker, setIsMovieInLocker] = useState(false);

    useEffect(() => {
        const url = window.location.href;
        const movieId = url.split('/').pop(); // URL에서 영화 ID 추출
        const lockerMovies = JSON.parse(localStorage.getItem('lockerMovies')) || [];
        
        if (lockerMovies.includes(movieId)) {
            setIsMovieInLocker(true);
        }
    }, []);

    const handleAddToLocker = () => {
        const url = window.location.href;
        const movieId = url.split('/').pop(); // URL에서 영화 ID 추출
        console.log(movieId);
        let lockerMovies = JSON.parse(localStorage.getItem('lockerMovies')) || [];
        
        if (!lockerMovies.includes(movieId)) {
            lockerMovies.push(movieId);
            localStorage.setItem('lockerMovies', JSON.stringify(lockerMovies));
            setIsMovieInLocker(true);
        }

        setLocker(true); // 상태 변경 (필요시)
    };

    return (
        <div>
            <Button variant="link" onClick={handleAddToLocker} style={{ color: '#fff' }}>
                <Row style={{ display: 'flex', flexDirection: 'column' }}>
                    <Col style={{ fontSize: '26px', fontWeight:'100' }}>
                        <FontAwesomeIcon icon={isMovieInLocker ? faCheck : faPlus} />
                    </Col>
                    <Col style={{ fontSize: '12px' }}>보관하기</Col>
                </Row>
            </Button>
        </div>
    );
};

export default PlusLocker;
