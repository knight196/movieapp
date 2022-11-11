import React,{useState,useEffect} from 'react'

export default function Filter({setActiveGenre,activeGenre,setFiltered,movieData}) {

  useEffect(() => {
    if(activeGenre === 0){
      setFiltered(movieData);
      return;
    }
    const filtered = movieData.filter((movie) => movie.genre_ids.includes(activeGenre))
    setFiltered(filtered)
  },[activeGenre])
  

  return (
   <div className="filter-btn">
    <button className={activeGenre === 0 ? "bg-primary" : ""} onClick={()=> setActiveGenre(0)}>All</button>
    <button  className={activeGenre === 28 ? "bg-primary" : ""} onClick={()=> setActiveGenre(28)}>Action</button>
    <button  className={activeGenre === 35 ? "bg-primary" : ""} onClick={()=> setActiveGenre(35)}>Comedy</button>
    <button  className={activeGenre === 18 ? "bg-primary" : ""} onClick={()=> setActiveGenre(18)}>Drama</button>
    <button  className={activeGenre === 12 ? "bg-primary" : ""} onClick={()=> setActiveGenre(12)}>Adventure</button>
    <button  className={activeGenre === 10770 ? "bg-primary" : ""} onClick={()=> setActiveGenre(10770)}>TV Movie</button>
   </div>
  )
}
