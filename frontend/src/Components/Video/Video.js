import React,{useState} from 'react'
import { useParams,Link } from 'react-router-dom'


export default function Video() {

    const [video,setVideo] = useState()

    const {VideoId} = useParams()

    React.useEffect(() => {

        if(VideoId!==""){
            fetch(`https://api.themoviedb.org/3/movie/${VideoId}/videos?api_key=c404a2d1ca7a02e14fef1e3cf05b5770`)
            .then(res=>res.json())
            .then(data => {
            setVideo(data.results[0]?.key)
        })
    }
    })

  return (

   <div className="animeinfo d-flex">
        <button className="border-0 px-2" ><Link style={{textDecoration:'none',color:'black'}} to='/ExploreNow'>X</Link></button>
         
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
</div> 
    
  )
}