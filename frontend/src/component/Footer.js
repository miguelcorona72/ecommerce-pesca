import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Sections";
import bass from "../assets/Bass2.png";


const Footer = () => {
  return <footer className="bg-gray-900 text-white">
  {/*} <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#cc791a] py-7">
        <div className="md:w-1/2">
            <div >
        
                <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
                md:w-2/5"><span className="text-black">¡Conéctate con la Naturaleza!</span> Los mejores accesorios de Pesca</h1>
        
            </div> 
        </div>
        <div className="md:w-1/2">

            <img src={bass} className="h-28"></img>

        </div>
</div> */}
    <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#cc791a] py-7">                

                <h1 className="lg:text-4xl text-2xl md:mb-5 lg:leading-normal mb-4 font-semibold
                md:w-2/5"><span className="text-black">¡Conéctate con la Naturaleza!</span> Todo para la Pesca</h1>

                <img src={bass} className="h-32 md: m-auto"></img>

    </div>



    <ItemsContainer/>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8"
    >
      <span>2023. Derechos Reservados.</span>
      <span>Términos - Política de Privacidad</span>
      <SocialIcons Icons={Icons}/>
    </div>
    </footer>;
  };

export default Footer;