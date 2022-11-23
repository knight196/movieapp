import React from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'

const Favorite = ({recieveadded}) => {

  
const handleRemoveProduct = async (id) => {
  await axios.delete(`/orders/get/${id}`)
  toast.success('Your bookmark has been removed')
  setTimeout(function(){
    window.location.href='/bookmark'
  })
}

function getColor(score){
  if(score >= 7){
      return 'text-success';

  }else if(score >= 5){
      return 'text-warning';
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

  return (
    <>
    {recieveadded.map((item) => (
      <>
        <div className="fav-card bg-white text-center p-2" key={item.id}>
      {item.cartItems?.map(item => (      
        <>

{item.id === item.title ? 
(
  <>
  </>
): (

<>
       <Link to={`/AnimeInfo/${item.id}`}>
        <img  src={`https://image.tmdb.org/t/p/w500` + item.backdrop_path} alt=""></img>
        </Link>
    <p>{item.title}</p>

    <div className="d-flex align-items-center justify-content-between">
        <p>Rating</p>
        <div className="percent2">
        <svg>
            <circle style={{stroke:scoreRating(item.vote_average),opacity:'0.3'}}cx="30" cy="30" r="20" className="track"></circle>
            <circle style={{stroke:scoreRating(item.vote_average),strokeDashoffset:`calc(440px - (440px * ${item.vote_average} * 2) / 100)`}}
            cx="30" cy="30" r="20"></circle>
        </svg>
        <div>

<div className="rating2">
    <p className={getColor(item.vote_average)}>{item.vote_average}</p>
</div>
            
            </div>

            </div>

            </div>
            </>
)
}
    
        </>
        
))}
<div className="fav-remove" onClick={()=>handleRemoveProduct(item._id)}>Remove</div>
    </div>
        </>
        ))}
  </>
  )
}

export default Favorite;