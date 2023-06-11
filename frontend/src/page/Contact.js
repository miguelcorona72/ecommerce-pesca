import React from 'react'
import pelicanofly from "../assets/pelicanofly.gif";
import location from "../assets/location.gif";
import watch from "../assets/watch.gif";
import phone from "../assets/phone.gif";

const Contact = () => {
  return (
    <div className='pt-6'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col'>

      <img src={pelicanofly} className="h-20 m-auto p-2"/>

      </div>

      

      <div className='w-full max-w-sm bg-amber-400 text-black hover:bg-black hover:text-white m-auto flex items-center flex-col p-2'>

      <img src={location} className="h-12 w-10 m-auto pt-2 rounded-full pb-2"/>

        <p className='text-center font-bold'>Dirección</p>

        <p className='text-center'>Calle Morelos #1350, Las Torres, 26284</p>

        <p className='text-center'>Ciudad Acuña, Coah.</p>

     </div>

      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-1'></div>

      <div className='w-full max-w-sm bg-amber-400 text-black hover:bg-black hover:text-white m-auto flex items-center flex-col p-2'>

   
      <img src={phone} className="h-12 w-10 m-auto pt-2 rounded-full pb-2"/>
   
        <p className='text-center font-bold'>Teléfonos</p>

        <p className='text-center'>+52 877 7726549</p>

        <p className='text-center'>+52 877 7735492</p>

  


      </div>

      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-1'></div>

      <div className='w-full max-w-sm bg-amber-400 text-black hover:bg-black hover:text-white m-auto flex items-center flex-col p-2'>

      <img src={watch} className="h-12 w-10 m-auto pt-2 rounded-full pb-2"/>
       
        <p className='text-center font-bold'>Horarios</p>

        <p className='text-center'>Lunes a Viernes 9:30-19:00</p>

        <p className='text-center'>Sábado 9:30-15:00</p>

        <p className='text-center'>Domingo CERRADO</p>
      </div>


    </div>
  )
}

export default Contact