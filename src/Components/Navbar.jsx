import React from 'react'
import { Link } from 'react-router-dom';
import Logo from "../kisspng-imdb-film-director-computer-icons-television-u-5ac6f593dfa2f3.387615181522988435916.jpg"

function Navbar() {
  return (
    <div className="border flex items-centered space-x-8 pl-3 py-4">
        <img src={Logo} alt="" className='w-[70px]'/>
        <Link to="/" className='font-bold text-xl text-blue-400'>Movies</Link>
        <Link to="/fav" className='font-bold text-xl text-blue-400'>Favourites</Link>
    </div>
  )
}

export default Navbar 