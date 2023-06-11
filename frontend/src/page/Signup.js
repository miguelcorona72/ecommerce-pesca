import React, { useState } from "react";
import loginSignupImage from "../assets/coolface.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    maidenName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  //console.log(data)
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
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

  const handleUploadProfileImage = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
   // console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })

  }
console.log(process.env.REACT_APP_SERVER_DOMIN)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if(firstName && email && password && confirmPassword) {
        if(password === confirmPassword) {

              const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
                
                method : "POST",
                headers : {
                  "content-type" : "application/json"
                },
                body : JSON.stringify(data)
              })
          //    console.log(fetchData)              

              const dataRes = await fetchData.json()
         //     console.log(dataRes)
           //  alert("Exitoso");
            // navigate("/login");

        // alert(dataRes.message);
        toast(dataRes.message)
        if(dataRes.alert){
          navigate("/login");
        }

        } else {
            alert("Contraseña y Confirmar Contraseña no son iguales");
        }
    }
    else{
        alert("Por favor Llene los campos requeridos")
    }
  }

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img src={data.image ? data.image :  loginSignupImage} className="w-full h-full" />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-2/7 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm text-white">Cargar</p>
            </div>
            <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}/>
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">Nombre(s)</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-300 px-2 py-1 rounded focus-within:outline-blue-600"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Apellido Paterno</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-300 px-2 py-1 rounded focus-within:outline-blue-600"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="maidenName">Apellido Materno</label>
          <input
            type={"text"}
            id="maidenName"
            name="maidenName"
            className="mt-1 mb-2 w-full bg-slate-300 px-2 py-1 rounded focus-within:outline-blue-600"
            value={data.maidenName}
            onChange={handleOnChange}
          />

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

          <label htmlFor="confirmpassword">Confirmar Contraseña</label>
          <div className="flex px-2 py-1 bg-slate-300 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-600">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className=" w-full bg-slate-300 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-yellow-500 text-blue-900 hover:bg-blue-800 hover:text-yellow-300 cursor-pointer text-xl font-medium text-center py-1 rounded-full mt-4">
            Registro
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Ya tengo cuenta ?{" "}
          <Link to={"/login"} className="text-red-600 font-bold underline">
            Login aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
