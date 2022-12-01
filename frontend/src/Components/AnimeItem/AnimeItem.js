import React,{useState,useEffect} from 'react'

import {Link} from 'react-router-dom'

import {motion} from 'framer-motion'

import axios from 'axios'

import { useStateValue } from '../../StateProvider'

const AnimeItem = ({filter,handleAddProduct}) => {

    const [recieveadded,setrecieveadded] = useState([])

    const recieveaddedbookmark = async () => {
      const res = await axios.post('/orders/get/addedbookmark', {email:user.email})
      setrecieveadded(res.data)
    }
    
    useEffect(()=> {
      recieveaddedbookmark()
    },[])

    console.log(recieveadded)

    const [{user}, dispatch] = useStateValue()
   
    
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

{filter.map((item) => (

        <motion.div layout className="p-2 mt-2 anime-card" key={item.id}>
            <Link to={`/AnimeInfo/${item.id}`}>
            <img  src={`https://image.tmdb.org/t/p/w500` + item.poster_path} alt=""></img>
            </Link>
       
            <p className="title">{item.title}</p>
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
            


            {!user ? 

            
                (
                    
                    <Link to='/Login'>
                <div className="btn-appear">Add To Fav</div>
        </Link>
            ):
            (

                <>
               
             
                {recieveadded.map(cartitem => (
                    <>
                    {cartitem.cartItems.map(movieitem => {
                        if(item.id === movieitem.id ){
                            return(
                                <div className="bookmark-show">added to bookmark</div>
                            )
                        }
                    })}
                    </>
                ))}
                <div className="btn-appear" onClick={()=>handleAddProduct(item)}>Add To Fav</div>
                    
                </>
                )
        }


  
            </motion.div>

        
        )
    )
}
        </>
    )

}

export default AnimeItem;