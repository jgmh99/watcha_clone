// import React, { useState, useEffect } from 'react';
// import { Button, Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

// const PlusLocker = () => {
//     const [locker, setLocker] = useState(false);
//     const [isMovieInLocker, setIsMovieInLocker] = useState(false);

//     useEffect(() => {
//         const url = window.location.href;
//         const movieId = url.split('/').pop(); // URL에서 영화 ID 추출
//         const lockerMovies = JSON.parse(localStorage.getItem('lockerMovies')) || [];
        
//         if (lockerMovies.includes(movieId)) {
//             setIsMovieInLocker(true);
//         }
//     }, []);

//     const handleAddToLocker = () => {
//         const url = window.location.href;
//         const movieId = url.split('/').pop(); // URL에서 영화 ID 추출
//         let lockerMovies = JSON.parse(localStorage.getItem('lockerMovies')) || [];
        
//         if (lockerMovies.includes(movieId)) {
//             // Remove the movie from the locker
//             lockerMovies = lockerMovies.filter(id => id !== movieId);
//             setIsMovieInLocker(false);
//         } else {
//             // Add the movie to the locker
//             lockerMovies.push(movieId);
//             setIsMovieInLocker(true);
//         }

//         localStorage.setItem('lockerMovies', JSON.stringify(lockerMovies));
//         setLocker(!locker); // 상태 변경 (필요시)
//     };

//     return (
//         <div>
//             <Button variant="" onClick={handleAddToLocker}>
//                 <Row style={{ display: 'flex', flexDirection: 'column' }}>
//                     <Col style={{ fontSize: '26px', fontWeight:'100', color: isMovieInLocker ? '#ffd700' : '#fff'}}>
//                         <FontAwesomeIcon icon={isMovieInLocker ? faCheck : faPlus} />
//                     </Col>
//                     <Col style={{ fontSize: '12px', color:'#fff', textDecoration:'none' }}>보관하기</Col>
//                 </Row>
//             </Button>
//         </div>
//     );
// };

// export default PlusLocker;


import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const PlusLocker = ({ movieId: propMovieId }) => {
    const [locker, setLocker] = useState(false);
    const [isMovieInLocker, setIsMovieInLocker] = useState(false);
    const [movieId, setMovieId] = useState(null);

    useEffect(() => {
        const id = propMovieId || window.location.href.split('/').pop(); // URL에서 영화 ID 추출
        setMovieId(id);
        const lockerMovies = JSON.parse(localStorage.getItem('lockerMovies')) || [];
        
        if (lockerMovies.includes(id)) {
            setIsMovieInLocker(true);
        }
    }, [propMovieId]);

    const handleAddToLocker = () => {
        if (!movieId) return;
        let lockerMovies = JSON.parse(localStorage.getItem('lockerMovies')) || [];
        
        if (lockerMovies.includes(movieId)) {
            // Remove the movie from the locker
            lockerMovies = lockerMovies.filter(id => id !== movieId);
            setIsMovieInLocker(false);
        } else {
            // Add the movie to the locker
            lockerMovies.push(movieId);
            setIsMovieInLocker(true);
        }

        localStorage.setItem('lockerMovies', JSON.stringify(lockerMovies));
        setLocker(!locker);
    };

    return (
        <div>
            <Button variant="" onClick={handleAddToLocker}>
                <Row style={{ display: 'flex', flexDirection: 'column' }}>
                    <Col style={{ fontSize: '26px', fontWeight: '100', color: isMovieInLocker ? '#ffd700' : '#fff' }}>
                        <FontAwesomeIcon icon={isMovieInLocker ? faCheck : faPlus} />
                    </Col>
                    <Col style={{ fontSize: '12px', color: '#fff', textDecoration: 'none' }}>보관하기</Col>
                </Row>
            </Button>
        </div>
    );
};

export default PlusLocker;
