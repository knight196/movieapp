import {useState,useEffect} from 'react'

import {useParams} from 'react-router-dom'

import {Link} from 'react-router-dom'

const Animeinfo = () => {

    const [click,setClick] = useState(false)
    const showInfo = () => setClick(!click);

    const [item,setItem] = useState([])

    const {AnimeItem} = useParams()

useEffect(() => {

    if(AnimeItem!==""){
        fetch(`https://api.themoviedb.org/3/movie/${AnimeItem}?api_key=c404a2d1ca7a02e14fef1e3cf05b5770`)
        .then(res=>res.json())
        .then(data => {
        setItem(data)
    })
}
})



function getColor(score){
    if(score >= 7){
        return 'text-success';
    }else if(score >= 5){
        return 'text-warning'
    }else{
        return 'text-danger';
    }
}

function scoreRating(score){
    if(score >= 7){
        return 'green';

    }else if(score >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}
    
    return(

<>

{
    (!item) ? "" : (
        <>

<div className= "content d-flex align-items-center p-2 flex-column">
<button className="border-0 px-2 py-1 bg-primary text-white"><Link style={{textDecoration:'none',color:'white',position:'relative',zIndex:3}} to='/ExploreNow'>X</Link></button>
<div className=" rounded-1 p-2 animeInfoCard">

<img className="background-Image" src={`https://image.tmdb.org/t/p/w500` + item.backdrop_path} alt=""/>

<div>
<img className="rounded-1 shadow-lg info-img" src={`https://image.tmdb.org/t/p/w500` + item.poster_path} alt=""/>
</div>

<div className='inner-content px-3'>
    <h3 className="text-center">{item.title}</h3>

    <strong><p>Overview</p></strong>
    
    <p>{item.overview}</p>
    
    <div className="d-flex align-items-center justify-content-between">
    <p>Release Date</p>
    <p>{item.release_date}</p>
    </div>
    
    
    
    <div className="d-flex justify-content-between align-items-center">



    <strong><p>Rating</p></strong>

    <div className="percent pt-2">
        <svg>
            <circle style={{stroke:scoreRating(item.vote_average),opacity:'0.3'}}cx="30" cy="30" r="30" className="track"></circle>
            <circle style={{stroke:scoreRating(item.vote_average),strokeDashoffset:`calc(440px - (440px * ${item.vote_average} * 3) / 100)`}}cx="30" cy="30" r="30"></circle>
        </svg>
        <div className="rating">
    <p className={getColor(item.vote_average)}>{(item.vote_average * 10).toFixed(1)}%</p>
            </div>
       
    
    </div>

</div>

<div className="d-flex justify-content-center align-items-center">
<div className="p-2 rounded-2 bg-opacity-50 watchTrailer" style={{border:'2px solid orange'}} onClick={()=> showInfo()}>   <Link style={{textDecoration:'none',color:'white'}} to={`/Video/${item.id}`}>Watch Trailer <i className="fa fas fa-play"></i></Link></div>
</div>

</div>

</div>

</div>


        </>
    )
}

</>
        )

}

export default Animeinfo