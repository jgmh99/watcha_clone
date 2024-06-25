// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar as faStarSolid, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { Container , Row, Col} from 'react-bootstrap';

// const Rating = () => {
//     const [movies, setMovies] = useState([]);
//     const [hoveredRating, setHoveredRating] = useState({});
//     const [recommendedMovies, setRecommendedMovies] = useState([]);
//     const API_KEY = process.env.REACT_APP_API_KEY;
//     const BASE_URL = process.env.REACT_APP_BASE_URL;

//     useEffect(() => {
//         const fetchMovies = async () => {
//             const evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
//             const movieIds = Object.keys(evaluations);

//             const movieData = await Promise.all(
//                 movieIds.map(async (id) => {
//                     try {
//                         const response = await axios.get(
//                             `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
//                         );
//                         return {
//                             id,
//                             title: response.data.title,
//                             posterPath: response.data.poster_path,
//                             genres: response.data.genres.map(genre => genre.id),
//                             rating: evaluations[id].rating // 로컬스토리지에서 평가 정보 가져오기
//                         };
//                     } catch (error) {
//                         console.error('Error fetching movie data:', error);
//                         return null;
//                     }
//                 })
//             );

//             const filteredMovies = movieData.filter(movie => movie !== null);
//             setMovies(filteredMovies);
//             recommendMovies(filteredMovies, movieIds);
//         };

//         fetchMovies();
//     }, [API_KEY, BASE_URL]);

//     useEffect(() => {
//         const initialHoveredRating = movies.reduce((acc, movie) => {
//             if (movie.rating) {
//                 acc[movie.id] = movie.rating;
//             }
//             return acc;
//         }, {});
//         setHoveredRating(initialHoveredRating);
//     }, [movies]);

//     const handleRatingClick = (movieId, newRating) => {
//         const evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
//         evaluations[movieId].rating = newRating; // 클릭한 별점을 로컬스토리지에 저장
//         localStorage.setItem('evaluations', JSON.stringify(evaluations));
//         updateMoviesWithRating(evaluations);
//     };

//     const handleMouseOver = (movieId, index) => {
//         setHoveredRating(prevState => ({ ...prevState, [movieId]: index }));
//     };

//     const handleMouseOut = (movieId) => {
//         setHoveredRating(prevState => ({ ...prevState, [movieId]: movies.find(movie => movie.id === movieId).rating }));
//     };

//     const recommendMovies = async (movieData, ratedMovieIds) => {
//         const genreCounts = movieData.reduce((acc, movie) => {
//             movie.genres.forEach(genre => {
//                 acc[genre] = (acc[genre] || 0) + 1;
//             });
//             return acc;
//         }, {});

//         const mostCommonGenre = Object.keys(genreCounts).reduce((a, b) =>
//             genreCounts[a] > genreCounts[b] ? a : b
//         );

//         try {
//             const response = await axios.get(
//                 `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${mostCommonGenre}&language=ko-KR`
//             );

//             const filteredMovies = response.data.results.filter(
//                 movie => !ratedMovieIds.includes(movie.id.toString())
//             );

//             setRecommendedMovies(filteredMovies);
//         } catch (error) {
//             console.error('Error fetching recommended movies:', error);
//         }
//     };

//     const updateMoviesWithRating = (evaluations) => {
//         const updatedMovies = movies.map(movie => ({
//             ...movie,
//             rating: evaluations[movie.id].rating || movie.rating // 업데이트된 평가 정보 반영
//         }));
//         setMovies(updatedMovies);
//     };

//     return (
//         <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
//             <h2>내 평가</h2>
//             <Container style={{border:'1px solid blue', }}>
//                 <Row xs={2} md={3} lg={5} xl={7} className="g-4" >
//                     {movies.map((movie) => (
//                     <Col key={movie.id} style={{ marginBottom: '20px', border: '1px solid red' }}>
//                         <img style={{width:'100%', height:'35vh'}} src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
//                         <p style={{fontSize:'14px', border:'1px solid red', textAlign:'end'}}>{movie.title}</p>
//                         <div style={{textAlign:'end'}}>
//                             {/* 내 평점 */}
//                             {Array.from({ length: 5 }, (_, i) => (
//                                 <FontAwesomeIcon
//                                     key={i}
//                                     icon={i < (hoveredRating[movie.id] || movie.rating) ? faStarSolid : faStarEmpty}
//                                     onClick={() => handleRatingClick(movie.id, i + 1)}
//                                     onMouseOver={() => handleMouseOver(movie.id, i + 1)}
//                                     onMouseOut={() => handleMouseOut(movie.id)}
//                                     style={{
//                                         color: (i < (hoveredRating[movie.id] || movie.rating)) ? '#ffd700' : '#ccc',
//                                         fontSize: '16px',
//                                         marginRight: '2px',
//                                         cursor: 'pointer',
//                                         border:'1px solid red'
//                                     }}
//                                 />
//                             ))}
//                         </div>
//                     </Col>
//                     ))}
//                 </Row>
//             </Container>

//             <h2>추천 영화</h2>
//             {recommendedMovies.map(movie => (
//                 <div key={movie.id} style={{ marginBottom: '20px', border: '1px solid blue' }}>
//                     <h3>{movie.title}</h3>
//                     <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Rating;
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import RecommendedMovies from '../components/RecommendedMovies'; // 새로운 컴포넌트를 임포트

const Rating = () => {
    const [movies, setMovies] = useState([]);
    const [hoveredRating, setHoveredRating] = useState({});
    
    const [mostCommonGenre, setMostCommonGenre] = useState(null);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchMovies = async () => {
            const evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
            const movieIds = Object.keys(evaluations);

            const movieData = await Promise.all(
                movieIds.map(async (id) => {
                    try {
                        const response = await axios.get(
                            `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
                        );
                        return {
                            id,
                            title: response.data.title,
                            posterPath: response.data.poster_path,
                            genres: response.data.genres.map(genre => genre.id),
                            rating: evaluations[id].rating // 로컬스토리지에서 평가 정보 가져오기
                        };
                    } catch (error) {
                        console.error('Error fetching movie data:', error);
                        return null;
                    }
                })
            );

            const filteredMovies = movieData.filter(movie => movie !== null);
            setMovies(filteredMovies);

            if (filteredMovies.length > 0) {
                const genreCounts = filteredMovies.reduce((acc, movie) => {
                    movie.genres.forEach(genre => {
                        acc[genre] = (acc[genre] || 0) + 1;
                    });
                    return acc;
                }, {});

                const mostCommonGenre = Object.keys(genreCounts).reduce((a, b) =>
                    genreCounts[a] > genreCounts[b] ? a : b
                );
                setMostCommonGenre(mostCommonGenre);
            }
        };

        fetchMovies();
    }, [API_KEY, BASE_URL]);

    useEffect(() => {
        const initialHoveredRating = movies.reduce((acc, movie) => {
            if (movie.rating) {
                acc[movie.id] = movie.rating;
            }
            return acc;
        }, {});
        setHoveredRating(initialHoveredRating);
    }, [movies]);

    const handleRatingClick = (movieId, newRating) => {
        const evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
        evaluations[movieId].rating = newRating; // 클릭한 별점을 로컬스토리지에 저장
        localStorage.setItem('evaluations', JSON.stringify(evaluations));
        updateMoviesWithRating(evaluations);
    };

    const handleMouseOver = (movieId, index) => {
        setHoveredRating(prevState => ({ ...prevState, [movieId]: index }));
    };

    const handleMouseOut = (movieId) => {
        setHoveredRating(prevState => ({ ...prevState, [movieId]: movies.find(movie => movie.id === movieId).rating }));
    };

    const updateMoviesWithRating = (evaluations) => {
        const updatedMovies = movies.map(movie => ({
            ...movie,
            rating: evaluations[movie.id].rating || movie.rating // 업데이트된 평가 정보 반영
        }));
        setMovies(updatedMovies);
    };

    return (
        <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
            <h2>내 평가</h2>
            <Container style={{ border: '1px solid blue' }}>
                <Row xs={2} md={3} lg={5} xl={7} className="g-4">
                    {movies.map((movie) => (
                        <Col key={movie.id} style={{ marginBottom: '20px', border: '1px solid red' }}>
                            <img style={{ width: '100%', height: '35vh' }} src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
                            <p style={{ fontSize: '14px', border: '1px solid red', textAlign: 'end' }}>{movie.title}</p>
                            <div style={{ textAlign: 'end' }}>
                                {/* 내 평점 */}
                                {Array.from({ length: 5 }, (_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={i < (hoveredRating[movie.id] || movie.rating) ? faStarSolid : faStarEmpty}
                                        onClick={() => handleRatingClick(movie.id, i + 1)}
                                        onMouseOver={() => handleMouseOver(movie.id, i + 1)}
                                        onMouseOut={() => handleMouseOut(movie.id)}
                                        style={{
                                            color: (i < (hoveredRating[movie.id] || movie.rating)) ? '#ffd700' : '#ccc',
                                            fontSize: '16px',
                                            marginRight: '2px',
                                            cursor: 'pointer',
                                            border: '1px solid red'
                                        }}
                                    />
                                ))}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {mostCommonGenre && <RecommendedMovies genreIds={[mostCommonGenre]} />}
        </div>
    );
};

export default Rating;
