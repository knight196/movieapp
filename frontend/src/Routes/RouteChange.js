import {useState,useEffect}from 'react'
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
import Bookmark from '../Components/Bookmark/Bookmark.js'
import axios from 'axios'
import {useStateValue} from '../StateProvider'
import Payment from '../Components/Payment/Payment'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
export default function RouteChange() {

  const [{user},dispatch]  = useStateValue()
  

const [recieveadded,setrecieveadded] = useState([])
const [cartItems,setCartItem] = useState([])

const recieveaddedbookmark = async () => {
  const res = await axios.post('/orders/get/addedbookmark', {email:user.email})
  setrecieveadded(res.data)
}

useEffect(()=> {
  recieveaddedbookmark()
},[])



const handleAddProduct = async (product) => {
  const ProductExist = cartItems.find((item) => item.id === product.id)
  if(ProductExist){
    setCartItem(cartItems.map((item) => item.id === product.id ? {...ProductExist,
   quantity: ProductExist.quantity + 1} : item))
alert('you have added the movie')
    }else{
      setCartItem([...cartItems, {...product, quantity: 1}])
      await axios.post('/orders/add/bookmark', {cartItems:product,email:user?.email})
    }
  }


    const stripePromise = loadStripe('pk_test_51KvRtLCBeZgGbHL5oKH0rBAXmqORHdfqdgWuJMqH0HIhQ9sMlrAYHm47FSlLQ65AF40INSKr9GX7Jf4Girib2TTw00fg6sdATf')



  return (
    <div>
      
<Routes>
  <Route exact path="/" element={<Home />}/>
  <Route path="/ExploreNow" element={<Explore cartItems={cartItems} handleAddProduct={handleAddProduct}/>}/>
  <Route path="/AnimeInfo/:AnimeItem" element={<AnimeInfo/>}/>
  <Route path="/Video/:VideoId" element={<Video/>}/>
  <Route path="/Login" exact element={<Login />}/>
  <Route path="/Plans" exact element={<Plans />}/>
          <Route path="/Signup" exact element={<Signup/>}/>
          <Route path="/user/dashboard" element={<Userdashboard/>}/>
          <Route path="/admin/dashboard" element={<Admindashboard/>}/>
          <Route  path="/Contact" element={<Contact/>}/>
          <Route  path="/bookmark" element={<Bookmark recieveadded={recieveadded}/>}/>
          <Route path="/payment/:id" element={<Elements stripe={stripePromise}><Payment/></Elements>}/>
</Routes>


    </div>
  )
}
