import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";

const Products = () => {
  const {filterby} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector(state => state.product.productList);
  
  const productDisplay = productData.filter(el => el._id === filterby)[0];

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay))
  };

  return (
    <div className='p-2 md:p-4'>
    <div className='w-full max-w-4xl m-auto md:flex bg-white'>
      <div className='max-w-lg overflow-hidden'>
        <img src={productDisplay.image} className="scale-75 hover:scale-90 transition-all"/>
      </div>
      <div className='m-5 flex flex-col gap-1'>
        <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className="text-slate-500  font-medium text-2xl">{productDisplay.category}</p>
          <p className="font-bold md:text-2xl">
            <span className="text-red-500">$</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3">
           {/* <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-700 hover:text-yellow-300 px-4 py-1">Comprar</button> */}
            <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-700 hover:text-yellow-300 px-4 py-1">Agregar al Carrito</button>
          </div>
          <div className='py-2'>
          <p className="text-slate-600 font-medium">Descripción : </p>
          <p>{productDisplay.description}</p>
          </div>

      </div>
        
      
    </div>

      <AllProduct heading={"Producto Relacionado"}/>

    </div>

 
    )
}


//const Products = () => {
 // return (
   // <div>Products</div>
 // )
//}

export default Products