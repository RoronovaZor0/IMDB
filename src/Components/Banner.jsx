import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Oval } from "react-loader-spinner";
// import Image from '../Banner.jpg'
// import './Banner.css'

function Banner() {
    let [bannerMovie, setBanner] = useState("");


    useEffect(
        function () {
            (function () {
                axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=e337ae5aeaf6ac9a484f65a204c1bf18")
                    .then((res) => {
                        // console.table(res.data.results);
                        setBanner(res.data.results[0])
                    })
            })()
        }, [])

    return (
        <div>
            {
                bannerMovie == "" ? 
                <div className='flex justify-center'><Oval
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
              /></div> :
                    <div className={`bg-[url(https://image.tmdb.org/t/p/original/t/p/original/${bannerMovie.backdrop_path})] h-[40vh] md:h-[120vh] bg-center bg-cover flex items-end`} 
                    style={{
                        backgroundImage:`url(https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path})`
                    }}
                    >
                        <div className='text-xl md:text-3xl text-white bg-gray-900 bg-opacity-60 p-4 text-center w-full'>
                            {bannerMovie.title}
                        </div>
                    </div>
                   
            }
        </div>
    )
}

export default Banner