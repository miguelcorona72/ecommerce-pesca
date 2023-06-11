import React from "react";
import { Link } from 'react-router-dom';
import pelicanofish from "../assets/pelicanofish.gif";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl p-2  rounded-full cursor-pointer ${isActive ? "bg-red-600 text-white" : "bg-yellow-500 hover:bg-yellow-700"}`}>

       <Link to={""}>
                <div className='h-20 w-20'>
                    <img src={pelicanofish} className="h-full rounded-full" />
                </div>          
        </Link>
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;