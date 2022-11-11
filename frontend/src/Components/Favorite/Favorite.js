import React from 'react'

import {Link} from 'react-router-dom'

const Favorite = ({cartItems,handleRemoveProduct}) => {



  return (
    <>
      {cartItems.map(item => (
        <div className="fav-card bg-white text-center p-2" key={item.id}>
           <Link to={`/AnimeInfo/${item.id}`}>
            <img  src={`https://image.tmdb.org/t/p/w500` + item.backdrop_path} alt=""></img>
            </Link>
        <p>{item.title}</p>
        <div className="remove-appear" onClick={()=>handleRemoveProduct(item)}>Remove</div>
        </div>
      ))}
  </>
  )
}

export default Favorite;