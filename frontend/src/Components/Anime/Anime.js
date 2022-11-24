import React,{useState,useEffect} from 'react'
import {motion} from 'framer-motion'
import AnimeItem from '../AnimeItem/AnimeItem';
import Filter from '../Filter/Filter'

const animeapi = 'https://api.themoviedb.org/3/movie/upcoming?api_key=c404a2d1ca7a02e14fef1e3cf05b5770&language=en-US&page=1';
const searchanime = "https://api.themoviedb.org/3/search/movie?&api_key=c404a2d1ca7a02e14fef1e3cf05b5770&query="

const Anime = ({handleAddProduct}) => {

    const [searchTerm,setSearchTerm] = useState('');

    const [movieData,setMovieData] = useState([])
    const [filter,setFiltered] = useState([])
    const [activeGenre,setActiveGenre] = useState(0)

    const getMovies = (animeapi) =>{
        fetch(animeapi)
        .then((res) =>res.json())
        .then((data) => {
    setMovieData(data.results)
    setFiltered(data.results)
        })
        
      }
      
      useEffect(()=> {
        getMovies(animeapi)         

      },[])

      
       const handleSearch = e => {
         e.preventDefault();
         setSearchTerm(e.target.value)
     
       }
    
       const onSubmit = e =>{
    e.preventDefault();
    if(searchTerm){
      getMovies(searchanime + searchTerm)
      setActiveGenre(0)
    }else{
      getMovies(animeapi)
    }
      }

    

     
    return (

        <>
        
        <div className='main'>

<div className='searchBox'>
<form onSubmit={onSubmit}>
      <input type="search"className="w-100 border-0 p-2 text-uppercase" 
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search your Movies"/>
      </form>
</div>



<div id='filter-anime'>
<Filter handleAddProduct={handleAddProduct} setActiveGenre={setActiveGenre} setFiltered={setFiltered} activeGenre={activeGenre} movieData={movieData}/>
</div>

<div>
<motion.div layout className='animeshow text-center' id='animeshow'>
 <AnimeItem filter={filter} handleAddProduct={handleAddProduct}/>
</motion.div>
</div>
        </div>
        
        </>

    )

}


export default Anime