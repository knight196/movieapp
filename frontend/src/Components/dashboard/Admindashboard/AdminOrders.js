import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import { useStateValue } from '../../../StateProvider'
export default function AdminOrders() {

  const [{user},dispatch] = useStateValue();


    const [orders,setOrders] = useState([])
const getOrders = async () => {
  const res = await axios.get('/api/orders');
  setOrders(res.data.orders)
}

console.log(orders)


useEffect(() => {
    getOrders();
},[])

const [cancelOrder, setcancelOrder] = useState(orders)

const cancel = async (id) => {
 await axios.put(`/orders/get/${id}`)
 await axios.post('/orders/addusermessage', {
   order_id:orders?._id,
   username:orders?.username,
   message:'Your order has been cancelled'
 })
 await axios.post('/orders/adminmessage', {
   order_id:orders?._id,
   username:orders?.username,
   message:`You have cancelled ${orders?.username} membership`
 })
 toast.success("You have cancelled user's membership");
 setTimeout(function(){
 window.location.href="/admin/dashboard"
 },1500)
 }



  return (
    <div>
      {orders.map((order)=> (
            <div  className="bg-secondary bg-opacity-50" style={{position:'relative'}}>
        
        <div>
          <h5>Product Detail</h5>
        {order.paymentId.slice(0,1).map((item) => (
          <>
<div className="d-flex align-items-center justify-content-between px-2">
       
       <div className="user-orders-card-info">
       <p>Plans: {item.plans}</p>
          <p>Email: {order.email}</p>
       <p>Price: £{item.price}</p>
       </div>

       <div className="user-orders-card-info-date">
   <small>Active Date</small>
   <br></br>
 <small>{order?.createdAt.slice(0,10)}</small>
 </div>

 
       
       </div>
  
       <button style={{margin:'auto'}} className={'d-block btn px-2 bg-warning border-0 m-1' } onClick={()=> {cancel(order._id);setcancelOrder(order._id,!cancelOrder)}}>Cancel</button>
          
          <p className={order.Cancel  === false ? 'order-cancelled': 'order-cancelled show'}>CANCELLED</p>
    
          
          </>
          ))}

          </div>
          
            </div>
            
          ))}
    </div>
  )
}