import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendedMovies = ({ genreIds }) => {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        if (genreIds.length > 0) {
            const fetchRecommendedMovies = async () => {
                try {
                    const genreString = genreIds.join(',');
                    const response = await axios.get(
                        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreString}&language=ko-KR`
                    );

                    setRecommendedMovies(response.data.results);
                } catch (error) {
                    console.error('Error fetching recommended movies:', error);
                }
            };

            fetchRecommendedMovies();
        }
    }, [genreIds, API_KEY, BASE_URL]);

    return (
        <div>
            <h2>추천 영화</h2>
            <div style={{width:'100%'}}>
                {recommendedMovies.map(movie => (
                    <div key={movie.id} style={{ margin: '10px', border: '1px solid blue', padding: '10px',width:'100%' }}>
                        <h3>{movie.title}</h3>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedMovies;
