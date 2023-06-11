import React, { useState } from "react";
import loginSignupImage from "../assets/fish.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
      email: "",
      password: "",
    }); 
    const navigate = useNavigate()
    const userData = useSelector(state => state)


    const dispatch = useDispatch()




    const handleShowPassword = () => {
      setShowPassword((preve) => !preve);
    };
  
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData((preve) => {
        return {
          ...preve,
          [name] : value,
        };
      });
    };
  
    const handleSubmit = async(e)=>{
      e.preventDefault()
      const {email,password} = data
      if(email && password){        
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{                
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
        //console.log(fetchData)              
        const dataRes = await fetchData.json()
        console.log(dataRes)

        toast(dataRes.message)

        if(dataRes.alert){
          dispatch(loginRedux(dataRes))
          setTimeout(() => {
            navigate("/")
          }, 1000);          
        }

        console.log(userData)
      }
      else{
          alert("Por favor Llene los campos requeridos")
      }
    }

  return (
    <div className="p-3 md:p-4">
    <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
      {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
      <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
        <img src={loginSignupImage} className="w-full h-full"/>
      </div>

      <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo</label>
        <input
          type={"email"}
          id="email"
          name="email"
          className="mt-1 mb-2 w-full bg-slate-300 px-2 py-1 rounded focus-within:outline-blue-600"
          value={data.email}
          onChange={handleOnChange}

        />

        <label htmlFor="password">Contraseña</label>
        <div className="flex px-2 py-1 bg-slate-300 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-600">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className=" w-full bg-slate-300 border-none outline-none"
            value={data.password}
            onChange={handleOnChange}
          />
          <span
            className="flex text-xl cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>
        
        <button className="w-full max-w-[150px] m-auto bg-yellow-500 text-blue-900 hover:bg-blue-800 hover:text-yellow-300 cursor-pointer text-xl font-medium text-center py-1 rounded-full mt-4">
          Login
        </button>
      </form>
      <p className="text-left text-sm mt-2">
        No tengo cuenta ?{" "}
        <Link to={"/signup"} className="text-red-600 font-bold underline">
          Registrese aquí
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Login