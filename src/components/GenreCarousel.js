import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; // slick theme CSS import
// import './GenreCarousel.css'; // custom CSS for GenreCarousel

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});

const GenreCarousel = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/genre/movie/list?language=ko-KR');
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    draggable: true, //모바일 환경에서 터치가능하게

  };

  return (
    <div className="carousel-container" style={{backgroundColor:'#fff', border:'5px solid red'}}>
      <Slider {...settings}>
        {genres.map((genre) => (
          <div key={genre.id} className="genre-item" style={{ border:'1px solid blue'}}>
            <Link to={`/genre/${genre.id}`}>
              <h3>{genre.name}</h3>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GenreCarousel;
