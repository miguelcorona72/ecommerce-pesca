import React, { useRef } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/pelicano.gif";
import robalon from "../assets/Captura Mayor.png";
import pelicanlogo from "../assets/PELICAN LOGO5.gif";
import CardFeature from "../component/CardFeature";
//import basshunter from "../assets/basshunter.png";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";


const Home = () => {
  const productData = useSelector((state) => state.product.productList)
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListSenuelos = productData.filter(
//  const homeProductCartListVegetables = productData.filter(  
    (el) => el.category === "senuelos",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  
  return (
    <div className="p-2 md:p-3">
      <div className="md:flex gap-4 py-2">

        <div className="md:w-1/2">
          <div className="flex gap-3 px-2 items-center">
            <img src={logo} className="h-16 hover:scale-125"></img> 
            <p className="bg-yellow-400 text-black hover:bg-black hover:text-yellow-300 p-2 text-medium font-bold rounded-md drop-shadow-md shadow-md cursor-pointer">¡¡Super PROMOS cada Mes!!</p>
            
           {/* bg-blue-400 hover:bg-blue-600 cursor-pointer */}
           {/* <img src="https://thumbs.dreamstime.com/b/dise%C3%B1o-de-ilustraci%C3%B3n-vectores-peces-bass-objeto-aislado-sobre-fondo-blanco-en-187269674.jpg" className="h-12"/> */}
          </div>
            <h2 className="text-4xl md:text-7xl font-bold py-3">La Mejor Tienda de Pesca <span className="text-blue-900 text-">en Internet</span></h2>
          <div className="md:flex">
          <div className="md:w-1/2">
            <img src={ robalon } className="h-auto m-auto p-4 rounded-lg"></img>          
          </div>
          <div className="md:w-1/2 mt-5">
            <p className="text-lg md:text-lg text-black font-bold text-center">No solo vendemos artículos de pesca.</p>
            <p className="text-lg md:text-lg text-black font-bold text-center">La pesca es:</p>
            <p className="text-xl text-red-700 font-extrabold text-center underline">NUESTRA PASION</p>
            <p className="text-lg md:text-medium text-yellow-700 font-bold text-center">¡¡Gracias por tu PREFERENCIA!!</p>
           {/*} <img src={ basshunter } className="w-52 py-3 m-auto"></img> */}
            <img src={ pelicanlogo } className="w-44 py-3 m-auto hover:scale-105"></img>
          </div>
          </div>
          <div className="m-3">
            <button className="font-bold bg-black text-yellow-400 px-3 py-1 hover:bg-yellow-500 hover:text-black rounded-md drop-shadow-md shadow-md">Nuevos Productos</button>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center ">
        {
          homeProductCartList[0] && homeProductCartList.map(el =>{
              return(
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
            )
          })
        } 

          
        </div>
      </div>

     {/*} <div className="">
        <h2>Carretes</h2>
      </div>*/}

<div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Señuelos
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListSenuelos[0]
            ? homeProductCartListSenuelos.map((el) => {
                return (
                  <CardFeature
                    key={el._id+"senuelos"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Cargando..." key={index+"cartLoading"} />
              ))}
        </div>
      </div>

      <AllProduct heading={"Artículos de Pesca"}/>
    </div>
  );
};

export default Home;