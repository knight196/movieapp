import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Explore from '../Components/Anime/Anime'
import Plans from '../Components/plans/Plans'
import AnimeInfo from '../Components/AnimeInfo/AnimeInfo'
import Video from '../Components/Video/Video'
import Login from '../Components/Account/Login'
import Signup from '../Components/Account/Signup'
import Home from '../Components/Home/Home'
import Admindashboard from '../Components/dashboard/Admindashboard/Admindashboard' 
import Userdashboard from '../Components/dashboard/Userdashboard/Userdashboard'
import Contact from '../Components/Contact/Contact.js'

export default function RouteChange() {
  return (
    <div>
      
<Routes>
  <Route exact path="/" element={<Home />}/>
  <Route path="/ExploreNow" element={<Explore />}/>
  <Route path="/AnimeInfo/:AnimeItem" element={<AnimeInfo/>}/>
  <Route path="/Video/:VideoId" element={<Video/>}/>
  <Route path="/Login" exact element={<Login />}/>
  <Route path="/Plans" exact element={<Plans />}/>
          <Route path="/Signup" exact element={<Signup/>}/>
          <Route path="/user/dashboard" element={<Userdashboard/>}/>
          <Route path="/admin/dashboard" element={<Admindashboard/>}/>
          <Route  path="/Contact" element={<Contact/>}/>
</Routes>


    </div>
  )
}
