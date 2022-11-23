import React from 'react'
import Favorite from '../Favorite/Favorite'

export default function Bookmark({recieveadded}) {
  

  
  return ( 

    <>

    <hr></hr>
   
    {/* {/* {recieveadded.cartItems?.length === 0 && (<h1 className="text-center">Bookmark is empty</h1>)} */}

    {/* {recieveadded.cartItems?.length === 1 && (
      <div className="fav">
  <Favorite recieveadded={recieveadded} andleRemoveProduct={handleRemoveProduct}/>
</div>
        )} */} 


     
           <div className="favadded p-2">
  <Favorite recieveadded={recieveadded}/>

      </div>
  
    </>
  )
}
