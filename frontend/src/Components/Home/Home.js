import React, {useEffect} from 'react'
import data from '../../accordiondata';
import SingleQuestion from '../questions/Questions';
import {useNavigate,Link} from  'react-router-dom';
import './Home.css'

const animeapi = 'https://api.themoviedb.org/3/movie/upcoming?api_key=c404a2d1ca7a02e14fef1e3cf05b5770&language=en-US&page=1';

export default function Home() {

  let navigate = useNavigate();

    const [movies, setMovies] = React.useState([]);

    useEffect(() => {
      fetch(animeapi)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
    })
  
    const [questions,setQuestions] = React.useState(data);
  
  return (
    <div>
      {/* mid body section */}

<div className="anime-intro">

<div className="images-flex">
<img src="./images/jumanji.jpg" alt=""/>
<img src="./images/traintobusan.jpg" alt=""/>
  <img src="./images/foodwars.jpg" alt=""/>
  <img src="./images/thegangster.jpg" alt=""/>
</div>

<div className="container services">

    <h1 className="text-white text-center pt-3 pb-3">The Latest Movies in your Pocket</h1>
  

  <button className="border-4 text-uppercase bg-primary text-white px-2 py-1 mb-5">
    <Link to='/ExploreNow' style={{textDecoration:'none',color:'white'}}>Explore Now</Link>
    </button>
  <div className="row row-cols-2 text-white text-center services-flex">

    <div className="col">
      <i className="bi bi-clock"></i>
      <p>Watch new movies everyday at anytime</p>
    </div>

    <div className="col">
      <i className="bi bi-bag"></i>
      <p>Join with us with affordable plans</p>
    </div>

    <div className="col">
      <i className="bi bi-camera-video"></i>
        <p>Watch ad-free</p>
    </div>

    <div className="col">
       <i className="bi bi-download"></i>
       <p>Download your favourite movies even in offline</p>
    </div>

  </div>

</div>

</div>

<div className="container-fluid p-0 text-center">
  <div className="py-2 mockup">
    <div>
  <h2>Watch your favourite movies at anytime and anywhere on different devices</h2>
<p>Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more.</p>
    </div>
  <img className="w-100 img-fluid py-5 pb-0" src="./images/mockup.jpg" alt=""/>
  </div>
</div>

<hr></hr>

<div className="animeslideshow-container py-5 text-center">
<h3>Watch more than 30,000 movies each day</h3>
  <div className="animeslideshow py-2">{movies.length > 0 && movies.map((movie) => (
    <div>
    <img src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path} alt=""/>
    <h5>{movie.title}</h5>
    </div>
  ))}</div>
</div>
{/* mid body section */}

<hr></hr>

{/* footer */}
<div>
<h1 className="py-5 text-center">Questions</h1>
<h3 className="text-center">FAQS</h3>
<section className="px-3">
  {
    questions.map((question) => {
      return <SingleQuestion key={question.id} {...question} />
    })
  }
</section>
</div>

<hr></hr>

<div className="footer-info container-fluid d-flex justify-content-between py-3">
  
    <div>
  <h5>Popular Shows</h5>
  <p>Jumanji</p>
  <p>Need for Speed</p>
  <p>Train to Busan</p>
 <p>The Gangster,The Cop,The Devil</p>
    </div>

    <div>
  <h5>Platform and Devices</h5>
  <p>Mobile</p>
  <p>Desktop</p>
  <p>Tablet</p>
    </div>

    <div>
  <h5>Language</h5>
  <p>English (UK)</p>
  <p>English (USA)</p>
  <p>Japanese</p>
    </div>

</div>


<div className="social text-center py-2">
<i className="bi bi-facebook"></i>
  <i className="bi bi-twitter"></i>
  <i className="bi bi-youtube"></i>
  <i className="bi bi-instagram"></i>
</div>
{/* end of footer */}
    </div>
  )
}
