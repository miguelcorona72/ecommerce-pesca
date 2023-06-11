import React from 'react'
import fishok from "../assets/fishok.gif";

const Success = () => {
  return (
    <div>
    <div className='bg-green-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg p-3'>
        <p>Pago Exitoso</p>
    </div>
    
    <img src={fishok} className="h-40 m-auto pt-2 rounded-full pt-4"/>
    </div>
  )
}

export default Success