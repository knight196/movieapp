import { PaymentElement } from "@stripe/react-stripe-js";
import { useState,useEffect } from "react";
import { useStripe, useElements,Elements } from "@stripe/react-stripe-js";
import { useStateValue } from "../../StateProvider";
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
export default function Checkoutform({paymentId}) {


    const navigate  = useNavigate();

    const elements = useElements();
    const stripe = useStripe();

    const [{user}, dispatch] = useStateValue();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    
  const handlePayment = async (e) => {
    await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url:'/'
      }
    })
    .then(() => {
     axios.post("/orders/add", {
        paymentId,
        email: user?.email,
      price:paymentId.price
      })
      navigate("/");
      toast.success('Payment successful')
      setTimeout(function(){
        window.location.href='/'
      })
    })
    .catch((err) => console.warn(err));
  }

  return (
    <>
    <form id="payment-form" onSubmit={e=> e.preventDefault()}>
    <PaymentElement id="payment-element"/>
    <button onClick={handlePayment} className="p-2 bg-primary btn text-white border-0 m-2 rounded-1" id="submit">pay</button>
  </form>
  
    </>
  )
}