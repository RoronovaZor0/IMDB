import { useParams } from 'react-router-dom';
import './MovieCard.css';

import React, { useEffect, useState } from 'react'
import axios from 'axios';

function MovieCard() {

  const {id} = useParams();
  const[movies,setMovies] = useState({});

  useEffect( 
    function () {
        (function () {
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e337ae5aeaf6ac9a484f65a204c1bf18`)
                .then((res) => {
                    setMovies(res.data);
                })
        })()
    }, [])
  return (
    <div className='cardbox'>
        <div>
          <img src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`} alt="" />
        </div>
        <div>
          <h2>{movies.title || movies.name}</h2>
          <p>Release Date: <span>{movies.release_date}</span></p>
          <p>{movies.overview}</p>
        </div>
    </div>
  )
}

export default MovieCard