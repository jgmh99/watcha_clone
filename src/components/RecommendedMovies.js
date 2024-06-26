import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlusLocker from '../components/PlusLocker';

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
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop:'1em' }}>
            <h6>평가하신 영화와 비슷한 장르의 영화를 찾아봤어요!</h6>
                {recommendedMovies.map(movie => (
                    <div key={movie.id} style={{ margin: '10px', borderBottom: '1px solid rgb(64, 64, 64)', padding: '10px', width: '100%', height: '10vh', display: 'flex' }}>
                        <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} />
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '14px', marginBottom: '0', padding: '10px' }}>{movie.title}</p>
                            <PlusLocker movieId={movie.id} />
                        </div>
                    </div>
                ))}
        </div>
        
    );
};

export default RecommendedMovies;
