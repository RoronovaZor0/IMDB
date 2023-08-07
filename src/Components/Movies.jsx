import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap';
import { Oval } from "react-loader-spinner";
import Page from './Pagination';
import { hover } from '@testing-library/user-event/dist/hover';
import { useSelector, useDispatch } from 'react-redux';
import {addFavourites, favMovies} from "../redux/favouriteReducer";
import { Link } from 'react-router-dom';
// import Image from '../Banner.jpg'

function Movies() {
    let [movies,setMovies] = useState([])
    const [pageNum,setPage] = useState(1);
    const [hovered,setHovered] = useState("");
    let [favourites,setFavourites] = useState([])
    console.log(movies)
    // 
    let data = useSelector(favMovies)
    const dispatch = useDispatch();


    useEffect(
      function () {
          (function () {
              axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=e337ae5aeaf6ac9a484f65a204c1bf18&page="+pageNum)
                  .then((res) => {
                      // console.table(res.data.results);
                      setMovies(res.data.results);
                  })
          })()
      }, [pageNum])
      // for pagination
  const onPrev = ()=>{
    if(pageNum > 1){
      setPage(pageNum - 1);
    }
  }
  const onNext = ()=>{
      setPage(pageNum + 1)
  }
  // to show and hide emoji on hover
  const showEmoji = (id)=>{
      setHovered(id)
  }
  const hideEmoji = ()=>{
    setHovered("")
  }
  // add/remove to/from favourites
  const addEmoji = (id)=>{
    const newFav = [...favourites];
    newFav.push(id);
    setFavourites(newFav)
  }
  const removeEmoji = (id)=>{
    const filteredFav = favourites.filter(elem =>{
      return elem != id;
    })
    setFavourites(filteredFav);

  }
    
  return (
    <div className='mt-8'>
      <div className='mb-8 font-bold text-2xl text-center'>Trending Movies</div>

      <div className='flex flex-wrap justify-center gap-16'>
        {
          movies.length == 0 ? <div className='flex justify-center'><Oval
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        /></div> : 
            movies.map((movie)=>{
              // console.log(movie)
              return(
                
              <div
                onMouseOver={
                  ()=>{showEmoji(movie.id)}
                }
                onMouseLeave={
                  ()=>{hideEmoji(movie.id)}
                }
                key={movie.id} className='w-[160px]'
               >
                <Link to={`/movie/${movie.id}`}>
                <div 
                className='bg-cover border-2 w-[160px] h-[240px] rounded-xl hover:scale-110  duratin-300'
                style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie.poster_path})`}}>
                  
                </div>
                </Link>
                <div>
                <div className='p-2 ml-28 rounded-xl ring-yellow-500'
                style={{
                  display:hovered==movie.id? "block" : "none"
                }}>
                  {favourites.includes(movie.id) ==false ? <div className='' onClick={()=>{addEmoji(movie.id);
                  dispatch(addFavourites(movie));}}>
                    ❤️
                  </div> : <div className='' onClick={()=>{removeEmoji(movie.id)}}>
                    ❤️‍🩹
                  </div>
                  }
                </div>
                <h4 className='mt-2 font-medium justify-center'>
                  {movie.title || movie.name}
                  </h4>
                </div>
                  
              </div>)
            })
        }


        {/* <img src={Image} className='w-[160px] h-[30vh] m-4 rounded-xl hover:scale-110 duration-300' alt="" /> */}
        {/* <img src={Image} className='w-[160px] h-[30vh] m-4 rounded-xl hover:scale-110 duration-300' alt="" />
            <img src={Image} className='w-[160px] h-[30vh] m-4 rounded-xl hover:scale-110 duration-300' alt="" />
            <img src={Image} className='w-[160px] h-[30vh] m-4 rounded-xl hover:scale-110 duration-300' alt="" />
            <img src={Image} className='w-[160px] h-[30vh] m-4 rounded-xl hover:scale-110 duration-300' alt="" />
            <img src={Image} className='w-[160px] h-[30vh] m-4 rounded-xl hover:scale-110 duration-300' alt="" /> */}
      </div>
      <Page 
      pageNum={pageNum}
      onPrev={onPrev}
      onNext={onNext}
      >
      </Page>
    </div>
  )
}

export default Movies