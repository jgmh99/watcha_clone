import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Rating = () => {
    const [movies, setMovies] = useState([]);
    const [hoveredRating, setHoveredRating] = useState({});
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
        const movieIds = Object.keys(evaluations);

        const fetchMovies = async () => {
            const movieData = await Promise.all(
                movieIds.map(async (id) => {
                    const response = await axios.get(
                        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR&page=1`
                    );
                    return {
                        id,
                        title: response.data.title,
                        posterPath: response.data.poster_path,
                        genres: response.data.genres.map(genre => genre.id),
                        rating: evaluations[id]
                    };
                })
            );
            setMovies(movieData);
            recommendMovies(movieData, movieIds);
        };

        fetchMovies();
    }, [API_KEY, BASE_URL]);

    const handleRatingClick = (movieId, newRating) => {
        const updatedMovies = movies.map(movie => 
            movie.id === movieId ? { ...movie, rating: newRating } : movie
        );
        setMovies(updatedMovies);

        const evaluations = JSON.parse(localStorage.getItem('evaluations')) || {};
        evaluations[movieId] = newRating;
        localStorage.setItem('evaluations', JSON.stringify(evaluations));
    };

    const handleMouseOver = (movieId, index) => {
        setHoveredRating(prevState => ({ ...prevState, [movieId]: index + 1 }));
    };

    const handleMouseOut = (movieId) => {
        setHoveredRating(prevState => ({ ...prevState, [movieId]: undefined }));
    };

    const recommendMovies = async (movieData, ratedMovieIds) => {
        const genreCounts = movieData.reduce((acc, movie) => {
            movie.genres.forEach(genre => {
                acc[genre] = (acc[genre] || 0) + 1;
            });
            return acc;
        }, {});

        const mostCommonGenre = Object.keys(genreCounts).reduce((a, b) => 
            genreCounts[a] > genreCounts[b] ? a : b
        );

        const response = await axios.get(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${mostCommonGenre}&language=ko-KR&page=1`
        );

        const filteredMovies = response.data.results.filter(
            movie => !ratedMovieIds.includes(movie.id.toString())
        );

        setRecommendedMovies(filteredMovies);
    };

    return (
        <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
            <h2>내 평가</h2>
            {movies.map((movie) => (
                <div key={movie.id} style={{ marginBottom: '20px', border: '1px solid red' }}>
                    <h3>{movie.title}</h3>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`} alt={movie.title} />
                    <div>
                        {Array.from({ length: 5 }, (_, i) => (
                            <FontAwesomeIcon
                                key={i}
                                icon={faStarSolid}
                                onClick={() => handleRatingClick(movie.id, i + 1)}
                                onMouseOver={() => handleMouseOver(movie.id, i)}
                                onMouseOut={() => handleMouseOut(movie.id)}
                                style={{ 
                                    color: (i < (hoveredRating[movie.id] || movie.rating)) ? '#ffd700' : '#ccc', 
                                    fontSize: '26px', 
                                    marginRight: '2px', 
                                    cursor: 'pointer' 
                                }}
                            />
                        ))}
                    </div>
                </div>
            ))}
            <h2>추천 영화</h2>
            {recommendedMovies.map(movie => (
                <div key={movie.id} style={{ marginBottom: '20px', border: '1px solid blue' }}>
                    <h3>{movie.title}</h3>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                </div>
            ))}
        </div>
    );
};

export default Rating;
