import React,{useState,useEffect} from 'react'
import '../dashboard.css'
import axios from 'axios'
import {useStateValue} from '../../../StateProvider'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function UserOrders() {

    const [{user}, dispatch] = useStateValue();
    
const [orders,setOrders] = useState([]);



  const getorders = async () => {
    const res = await axios.post('/orders/get', {email:user.email})
    setOrders(res.data)
  }

  useEffect(() => {
  getorders();
},[])


const [cancelOrder, setcancelOrder] = useState(orders)

const cancel = async () => {
  await axios.post('/orders/adminmessage', {
    order_id:orders?._id,
    username:user?.username,
    message:'wants to cancel membership'
  })
  await axios.post('/orders/addusermessage', {
    order_id:orders?._id,
    username:user?.username,
    message:'Your cancellation request has been received'
  })
  toast.success('Your cancellation request has been received');
  setTimeout(function(){
  window.location.href="/user/dashboard"
  },1500)
  }




  return (
    <div>
    {user === null && (window.location.href="/Login")}

    

{user !== null && (



   <div>



   {orders.map((order)=> (
         <div className="bg-secondary bg-opacity-50" style={{position:'relative'}}>
     
     <div>
       <h5>Membership Detail</h5>
     {order.paymentId.slice(0,1).map((item) => (

     
<>
       <div className="d-flex align-items-center justify-content-between px-2">
       
       <div className="user-orders-card-info">
       <p>Plans: {item.plans}</p>
       <p>Price: £{item.price}</p>
       </div>

       <div className="user-orders-card-info-date">
   <small>Active Date</small>
   <br></br>
 <small>{order?.createdAt.slice(0,10)}</small>
 </div>


 
       
       </div>

          <button style={{margin:'auto'}} className="d-block btn px-2 bg-warning border-0"  onClick={()=> {cancel(orders._id);setcancelOrder(orders._id,!cancelOrder)}}>Cancel</button>
          
          <p className={order.Cancel  === false ? 'order-cancelled': 'order-cancelled show'}>CANCELLED</p>
      

       
     </>  
     
       ))}

       </div>
       
         </div>
         
       ))}
 </div>
  )}
  </div>
  )
}