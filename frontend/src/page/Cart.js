import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assets/CarritoVacio.gif"
import { toast } from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  
  
  const handlePayment = async()=>{

      if(user.email){
          
          const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
          const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,{
            method : "POST",
            headers  : {
              "content-type" : "application/json"
            },
            body  : JSON.stringify(productCartItem)
          })
          if(res.statusCode === 500) return;

          const data = await res.json()
          console.log(data)

          toast("Redireccionando a Pasarela de pago...!")
          stripePromise.redirectToCheckout({sessionId : data}) 
      }
      else{
        setTimeout(()=>{
          navigate("/login")
          toast("No has iniciado Sesión!")
        },1000)
      }
    
  }
  return (
    <>
    
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Artículos en el Carrito
        </h2>

         

        {productCartItem[0] ?
        <div className="my-4 flex flex-col gap-3">
          {/* display cart items  */}
          <div className="w-full max-w-3xl ">
            {productCartItem.map((el) => {
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>

          {/* total cart item  */}
          <div className="w-full max-w-md  ml-auto">
            <h2 className="bg-yellow-600 text-white p-2 text-lg">Resumen</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total de Artículos:</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Precio Total:</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-600">$</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-600 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Total a Pagar
            </button>
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className=" w-full max-w-sm "/>
            <p className="text-slate-500 text-3xl font-bold">Carrito Vacio</p>
          </div>
        </>
      }
      </div>
    
    </>
  );
};

export default Cart;