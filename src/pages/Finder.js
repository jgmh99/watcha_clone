// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import RecommendedMovies from '../components/RecommendedMovies';
// import PlusLocker from '../components/PlusLocker';

// const Finder = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [mostCommonGenre, setMostCommonGenre] = useState(null);
//     const API_KEY = process.env.REACT_APP_API_KEY;
//     const BASE_URL = process.env.REACT_APP_BASE_URL;

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get(
//                 `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=ko-KR`
//             );
//             setSearchResults(response.data.results);
//             identifyMostCommonGenre(response.data.results);
//         } catch (error) {
//             console.error('Error fetching search results:', error);
//         }
//     };

//     const identifyMostCommonGenre = (results) => {
//         if (results.length === 0) {
//             setMostCommonGenre(null);
//             return;
//         }

//         const genreCounts = results.reduce((acc, movie) => {
//             movie.genre_ids.forEach(genre => {
//                 acc[genre] = (acc[genre] || 0) + 1;
//             });
//             return acc;
//         }, {});

//         const mostCommonGenre = Object.keys(genreCounts).reduce((a, b) =>
//             genreCounts[a] > genreCounts[b] ? a : b
//         );

//         setMostCommonGenre(mostCommonGenre);
//     };

//     return (
//         <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
//             <h2>검색</h2>
//             <div className="search-container">
//                 <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
//                 <input
//                     type="text"
//                     className="search-input"
//                     placeholder="콘텐츠, 인물, 리스트 검색"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onKeyDown={handleSearch}
//                 />
//             </div>

//             <h2>검색 결과</h2>
//             <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                 {searchResults.map(movie => (
//                     <div key={movie.id} style={{ margin: '10px', border: '1px solid blue', padding: '10px', width:'100%', height:'10vh', display:'flex' }}>
//                         <img style={{borderRadius:'5px'}} src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} />
//                         <div style={{border:'1px solid red', width:'100%', display:'flex', alignItems:'center', justifyContent: 'space-between'}}>
//                           <p style={{fontSize:'14px', marginBottom:'0', padding:'10px'}}>{movie.title}</p>
//                           <PlusLocker/>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {mostCommonGenre && <RecommendedMovies genreIds={[mostCommonGenre]} />}
//         </div>
//     );
// };

// export default Finder;

import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import RecommendedMovies from '../components/RecommendedMovies';
import PlusLocker from '../components/PlusLocker';
import GenreCarousel from '../components/GenreCarousel';

const Finder = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [mostCommonGenre, setMostCommonGenre] = useState(null);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=ko-KR`
            );
            setSearchResults(response.data.results);
            identifyMostCommonGenre(response.data.results);
        } catch (error) {
            console.error('에러:', error);
        }
    };

    const identifyMostCommonGenre = (results) => {
        if (results.length === 0) {
            setMostCommonGenre(null);
            return;
        }

        const genreCounts = results.reduce((acc, movie) => {
            movie.genre_ids.forEach(genre => {
                acc[genre] = (acc[genre] || 0) + 1;
            });
            return acc;
        }, {});

        const mostCommonGenre = Object.keys(genreCounts).reduce((a, b) =>
            genreCounts[a] > genreCounts[b] ? a : b
        );

        setMostCommonGenre(mostCommonGenre);
    };

    return (
        <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
            <h2>검색</h2>
            <div className="search-container">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="콘텐츠, 인물, 리스트 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {searchResults.map(movie => (
                    <div key={movie.id} style={{ margin: '10px', border: '1px solid blue', padding: '10px', width: '100%', height: '10vh', display: 'flex' }}>
                        <img style={{ borderRadius: '5px' }} src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} />
                        <div style={{ border: '1px solid red', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '14px', marginBottom: '0', padding: '10px' }}>{movie.title}</p>
                            <PlusLocker movieId={movie.id} />
                        </div>
                    </div>
                ))}
            </div>
            <GenreCarousel/>
            {mostCommonGenre && <RecommendedMovies genreIds={[mostCommonGenre]} />}
        </div>
    );
};

export default Finder;
