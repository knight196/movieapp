import {useState,useEffect} from 'react'
import data from '../../data'

export default function Plans() {
 


  return (      
  <>
  <hr></hr>

      <div className="pricing">
  {data.map((item) => (
     
      <div className="row w-100 row-cols-1 mt-5 row-cols-md-3 text-center">

        <div className="col w-100">
          <div className="card mb-4 rounded-3 shadow-sm">
            <h3>{item.popularity}</h3>
            <div className="card-header py-3 text-white bg-primary border-primary">
              <h4 className="my-0 fw-normal">{item.plans}</h4>
            </div>
            <div className="card-body">
              <i className="bi bi-crown"></i>
              <h1 className="card-title pricing-card-title">£{item.price}</h1>
              <ul className="list-unstyled mt-3 mb-4">
              <li>{item.serviceone}</li>
              <li>{item.servicetwo}</li>
              <li>{item.servicethree}</li>
              <li>{item.servicefour}</li>
              <li>{item.servicefive}</li>
              <li>16% discount on Monthly Plan (billed every 12 months)</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-primary"><a className="text-white" style={{textDecoration:'none'}} href={`/payment/${item.plans}`}>Get Started</a></button>
            </div>
          </div>
        </div>
        </div>
  ))}
  </div>

    </>
  )
}
