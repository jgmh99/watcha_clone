// import React,{useState,} from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// const FindInput = () => {
//     const API_KEY = process.env.REACT_APP_API_KEY;
//     const BASE_URL = process.env.REACT_APP_BASE_URL;
//     const [mostCommonGenre, setMostCommonGenre] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

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
//   return (
//     <div className="search-container">
//         <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
//         <input type="text" className="search-input" placeholder="콘텐츠,태그,인물,리스트 검색" />
//         <button onClick={handleSearch}>검색</button>
//     </div>
//   )
// }

// export default FindInput