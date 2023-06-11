import React from 'react'
import basshunter from "../assets/basshunter.png";
import superbass from "../assets/bass3.png";
import presa from "../assets/presa.jpg";
import lapresa from "../assets/presa-amistad.jpg";
import amistad from "../assets/amistad.jpg";

const About = () => {
  return (
  

    <div>
      
      <div className="py-5">

      <img src={superbass} className="h-80 w-80 rounded-md m-auto hover:scale-105"/>

      </div>

       
       {/* <img src={basshunter} className="h-80 w-80"/> */}
      
        
      
      <p className="text-3xl font-bold py-3 text-center">
        ¿Quiénes somos?
      </p>
      <p className="text-2xl font-bold px-3 text-red-700 pb-3 text-center">
        "PASION POR LA PESCA"
      </p>
      <p className="text-xl px-7 text-center">
      Hoy, Junio del 2023, inicia PELICAN BASS HUNTER - FISHING SHOP.<span className="text-blue-700 font-bold"> EL MOTIVO: </span> El amor
      y la pasión por este deporte que me ha traido tantas alegrias. Aun recuerdo cuando apenas tenia 10 años y mi padre nos llevaba
      a mis hermanos y a mi a pescar. Con el tiempo mi pasión por la pesca creció. Es una oportunidad de convivir sanamente con
      amigos y familiares. Tengo muy buenas anecdotas sobre la pesca. He tenido la fortuna de vivir y crecer en una ciudad que esta
      a solo 15 minutos de La Presa de la Amistad.

      </p>

      <img src={presa} className="h-80 w-80 rounded-lg m-auto pt-9 pb-5"/>

      <p className="text-3xl font-bold p-3 text-center">Presa La Amistad</p>
      <p className="text-xl px-7 pb-5 text-center">La Presa de la Amistad. Es una presa binacional. Está situada bajo la confluencia del río Devil's con el Bravo a 23 kilómetros de Ciudad Acuña, Coahuila, en el cauce del Río Bravo entre los límites de Coahuila y Texas.

            Fue inaugurado en 1969 por los presidentes Richard Nixon y Gustavo Díaz Ordaz.

            Su central hidroeléctrica tiene una capacidad de generar 66 megawatts de energía eléctrica, la cual es distribuida en igualdad a ambas naciones, su embalse es aproximado a 3,887 hectómetros cúbicos, el cual es llamado el Embalse la Amistad, es operado por la Comisión Internacional de Límites y Aguas.
      </p>
        

            <img src={lapresa} className="h-80 w-80 rounded-lg m-auto pb-7"/>
          


      
            
           
    </div>
  )
}

export default About