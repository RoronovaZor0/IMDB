import React, { useEffect, useState } from 'react'
import Page from './Pagination'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { favMovies } from '../redux/favouriteReducer'
let genereids = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary',
  18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History',
  27: 'Horror',
  10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller',
  10752: 'War',
  37: 'Western'
}

function Favourites() {
  let favMoviesClicked = useSelector(favMovies);
  let [genres,setGenres] = useState([]);
  let [movies,setMovies] = useState(JSON.parse(JSON.stringify(favMoviesClicked)));
  let [searchItem, setSearchItem] = useState("");
  let [curGenre, setCurrentgenre] = useState("All Genres");
  let [curRatingOrder, setCurRatingOrder] = useState(0);
  let [curPopularityOrder, setPopularityOrder] = useState(0);
  let [noOfElems, setNoofElems] = useState(2);
  let [curPage, setCurPage] = useState(1);
 
// delete Moive
  const deleteMovie = (id)=>{
    const restofTheMovies = movies.filter((movie)=>{
      return movie.id!=id;
    })
    setMovies(restofTheMovies);
  }
  useEffect(()=>{
      let temp = movies.map((movie)=> genereids[movie.genre_ids[0]])
      temp = new Set(temp)
      setGenres(["All Genres", ...temp]);
    },[])

    const onCurGenre = (genre)=>{
      setCurrentgenre(genre);
      setCurPage(1);
    }

    // search function
    let searchedMovies = searchItem == ""? movies : movies.filter((movie)=>{
         let movieName = movie.title || movie.name;
         let lowerCharSearch = searchItem.toLowerCase();
        return movieName.toLowerCase().includes(lowerCharSearch);});
    // filter function

    
      let filteredMovies = curGenre == "All Genres" ? searchedMovies : 
      searchedMovies.filter((searchedMovie)=>{
        return genereids[searchedMovie.genre_ids[0]]==curGenre;
      })
    // sorting : rating
      if(curRatingOrder!= 0){
        if(curRatingOrder==1){
          filteredMovies = filteredMovies.sort((movieA,movieB)=>{
            return movieA.vote_average - movieB.vote_average;
          })
        }
        else if(curRatingOrder==-1){
          filteredMovies = filteredMovies.sort((movieA,movieB)=>{
            return movieB.vote_average - movieA.vote_average;
          })
        }
      }
    // sorting : popularity
      if(curPopularityOrder!= 0){  
        if(curPopularityOrder==1){  
          filteredMovies = filteredMovies.sort((movieA,movieB)=>{ 
            return movieA.popularity - movieB.popularity;
        })
        }
        else if(curPopularityOrder==-1){
          filteredMovies = filteredMovies.sort((movieA,movieB)=>{
            return movieB.popularity - movieA.popularity;
          })
        }
      }
    
    // pagination
    let si = (noOfElems)*(Number(curPage)-1);
    let ei = Number(noOfElems)+Number(si);
    let maxPageNum = Math.ceil(filteredMovies.length/noOfElems)
    filteredMovies = filteredMovies.slice(si,ei);

    const onPrev = (pageNum)=>{
      if(pageNum>0){
          setCurPage(pageNum);
      }
    }
    const onNext = (pageNum)=>{
      if(pageNum <= maxPageNum){
        setCurPage(pageNum);
      }
    }

  return (
    <div>
      <div className='mt-6 flex space-x-2 justify-center'>
        {genres.map((genre=>{
          return(
            <button
          className={genre == curGenre ? `py-1 px-2 rounded-lg 
          font-bold text-lag text-white bg-blue-400` : `py-1 px-2 bg-gray-400 rounded-lg
          font-bold text-lg text-white hover:bg-blue-400`}
          onClick={()=>{onCurGenre(genre)}}
        >
          {genre}
        </button>
          )
        }))}
      </div>

      <div className='mt-4 flex justify-center space-x-1'>
        <input type="text" placeholder='search' className='border-2 py-1 px-2 text-center' 
          value={searchItem}
          onChange={(e)=>{ setSearchItem(e.target.value)
            setCurPage(1);
          }}
        />
        <input type="number" className='border-2 py-1 px-2 text-center'  
          value={noOfElems} 
          onChange={(e)=>{
            setNoofElems(e.target.value)
            setCurPage(1);
          }}
        />
      </div>

      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              <div className='flex'>
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" className='mr-2 cursor-pointer' 
                onClick={()=>{setCurRatingOrder(1)
                setCurPage(1);}}/>
                <div>Rating</div>
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" className='ml-2 mr-2' 
                onClick={()=>{setCurRatingOrder(-1)
                setCurPage(1);}}/>
              </div>
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            <div className='flex'>
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" className='mr-2 cursor-pointer' 
                onClick={()=>{setPopularityOrder(1)
                setCurPage(1)}}/>
                <div>Popularity</div>
                <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" className='ml-2 mr-2' 
                onClick={()=>{setPopularityOrder(-1)
                setCurPage(1)}}/>
              </div>
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Genre</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Remove</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">

        {filteredMovies.map((movie)=>{
          // {console.log(movie)};
          return <tr class="hover:bg-gray-50" key = {movie.id}>
           <th class="flex items-center px-6 py-4 font-normal text-gray-900 space-x-2">              
               <img
                 class="h-[6rem] w-[10rem] object-fit"
                 src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                 alt=""
               />       
               <div class="font-medium text-gray-700 text-sm">
                 {movie.title||movie.name}
                </div>                
             
           </th>
           <td class="px-6 pl-12 py-4">
             {movie.vote_average.toFixed(2)}
           </td>
           <td class="px-6 pl-12 py-4">
              {movie.popularity.toFixed(2)}
            </td>
           <td class="px-6 py-4">
             <div class="flex gap-2">
               <span
                 class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
               >
                 {genereids[movie.genre_ids[0]]}
               </span>
             </div>
           </td>
           <td className="px-6 py-4">
           <span
                 className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-red-600 cursor-pointer"
              onClick={()=>{
                deleteMovie(movie.id)
              }}
              >
                 Delete
               </span>
           </td>
         </tr>
        })}

         
        </tbody>
      </table>
    </div>
      <Page pageNum={curPage}
      onPrev={onPrev}
      onNext={onNext}
      ></Page>
    </div>
  )
}


export default Favourites