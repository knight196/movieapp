import {useState, useEffect} from 'react';
import {NavLink,useNavigate} from 'react-router-dom'
import {useStateValue} from '../../StateProvider'
import {isAuthenticated, logout} from '../../helpers/auth'
import  {toast} from 'react-toastify'
import './Navbar.css'
import axios from 'axios'
export default function Navbar() {

    const [{ basket, user }, dispatch] = useStateValue();

    const [orders,setOrders] = useState([])

    const getOrders = async () => {
      const res = await axios.post('/orders/get', {email:user.email})
      setOrders(res.data)
    }

useEffect(() => {
getOrders()
},[])

    const navigate = useNavigate();

    const signOut = () => {
        logout(() => {
    
          dispatch({
            type: "SET_USER",
            user: null,
          });
          navigate("/");
          toast.success('you have logout successfully')
        })
      };

  // menubar for navbar
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const bookmark = () => {
    setTimeout(function(){
      window.location.href='/bookmark'
    })
  }


  return (
    
      <nav>


<div className="d-flex justify-content-between align-items-center px-2 py-1">
<h3 className="text-warning"><NavLink className="text-dark" style={{textDecoration:'none'}} to="/">FunMovie</NavLink></h3>
<div className="d-flex">
<div className="my-auto text-center mobile-version">
    {!isAuthenticated() ? (
            <NavLink className="text-dark" style={{textDecoration:'none'}} to="/Login">
            
            <h5>Sign In</h5>
            </NavLink>
):
           (
            <div className="d-flex flex-column">
            <small>{user.username}</small>
           <button className="btn" onClick={signOut}>Sign Out</button>
            </div> 
           )        
}
    </div>
<button onClick={handleClick} className="menu-bar"><i className={click ? "fas fa-times" : "fas fa-bars"}></i></button>
</div>
</div>

<div className={click ? "navlist show" : "navlist"}>

        <ul>
        <div className="my-auto text-center desktop-version">
    {!isAuthenticated() ? (
            <NavLink className="text-dark" style={{textDecoration:'none'}} to="/Login">
            
            <h5>Sign In</h5>
            </NavLink>
):
           (
            <div className="d-flex flex-column">
            <small>{user.username}</small>
           <button className="btn" onClick={signOut}>Sign Out</button>
            </div> 
           )        
}
    </div>
          <li><NavLink style={{textDecoration:'none'}}   exact to="/">Home</NavLink></li>
         {orders.length === 1 ? (
          <></>
          ): 
          (
            <li><NavLink style={{textDecoration:'none'}} to="/plans">Plans</NavLink></li>
          )
          }
         
          <li><NavLink style={{textDecoration:'none'}} to="/ExploreNow">ExploreNow</NavLink></li>
          {isAuthenticated() && isAuthenticated().role === 0 && (
            <>
        <li>
       <NavLink to="/user/dashboard">Dashboard</NavLink>
    </li>
    <li>
      <NavLink to="/bookmark" onClick={bookmark}>Bookmark</NavLink>
    </li>
            </>
  )}
  {isAuthenticated() && isAuthenticated().role === 1 && (
    <li>
       <NavLink to="/admin/dashboard">Dashboard</NavLink>
       </li>
  )}

  <li><NavLink style={{textDecoration:'none'}} to='/Contact'>Contact</NavLink></li>

        </ul>


</div>
        </nav>

  )
}
