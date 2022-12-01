import {useEffect, useState} from 'react';
import {useNavigate } from "react-router-dom";
import CheckoutForm from './Checkoutform'
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements,CardElement,Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { useStateValue } from "../../StateProvider";
import {toast} from 'react-toastify'

import {useParams} from 'react-router-dom'
import Data from '../../data'

function Payment() {


  const [{user}, dispatch] = useStateValue();
  
let stripe = useStripe();
let elements = useElements()


const handleSubmitSub = async() => {

try{

const paymentMethod = await stripe.createPaymentMethod({
  type:'card',
  card:elements.getElement('card')
})

const response = await fetch ('/api/subscribe', {
  method:'POST',
  headers:{
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email:user?.email,
    paymentMethod:paymentMethod.paymentMethod.id,
    price:paymentId.price,
    plan:paymentId.plans
  })

})

axios.post("/orders/add", {
  paymentId,
  email: user?.email,
price:paymentId.price,
body:paymentMethod.paymentMethod
})
navigate("/");
toast.success('Payment successful')
setTimeout(function(){
  window.location.href='/'
},1000)

if(!response.ok) return alert('Payment unsuccessful')
const data = await response.json();
const confirm = await stripe.confirmCardPayment(data.clientSecret)
if(confirm.error) return alert('Payment Unsuccessful')
alert('payment successful subscribed')
}catch(err){
  console.log(err); alert('payment failed' + err.message)
}
}


    const {id} = useParams()

        const paymentId = Data.find(item => (item.plans) === id)



  const navigate = useNavigate();

    return (
        <>
        <hr></hr>
        <div className="text-center h1">
        <p>Plans: {paymentId.plans}</p>
        <p>Price: £{paymentId.price}/month</p>
        </div>
        
                <div className="cart-list bg-white mx-5 bg-opacity-50 h-50 px-2 border-2 rounded-1">

            <div className="text-center p-2">

        
          <CardElement/>
        
    <button onClick={handleSubmitSub} className="border-0 px-2 py-1 rounded-1 bg-primary text-white">Subscribe</button>
      


</div>
        
        
         </div>
            </>
    )
}

export default Payment
