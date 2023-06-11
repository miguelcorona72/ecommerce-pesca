import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Fishing Shop Logo4.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux";
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const Header = () => {
    const [showMenu,setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(userData)
    },[userData]) 

    const handleShowMenu = ()=>{
        setShowMenu((preve) => !preve);
    };
    const handleLogout = ()=>{
        dispatch(logoutRedux())
        toast("Logout exitoso")
    }

    //console.log(process.env.REACT_APP_ADMIN_EMAIL)
    const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-red-600'>
        {/* desktop */}

        <div className='flex items-center h-full justify-between'>
            <Link to={""}>
                <div className='h-10'>
                    <img src={logo} className="h-full hover:scale-105"/>
                </div>          
            </Link>

            <div className="flex items-center gap-4 md:gap-7">
                <nav className="gap-4 md:gap-6 text-white text-base md:text-lg hidden md:flex">
                    <div className="hover:text-yellow-300">
                        <Link to={""}>Home</Link>
                    </div>
                    <div className="hover:text-yellow-300">
                        <Link to={"products/647f871915b8745a77a82abb"}>Productos</Link>
                    </div>
                    <div className="hover:text-yellow-300">
                        <Link to={"about"}>Acerca</Link>
                    </div>
                    <div className="hover:text-yellow-300">
                        <Link to={"contact"}>Contacto</Link>
                    </div>
                </nav>
                <div className="text-2xl text-white hover:text-yellow-300 relative">
                    <Link to={"cart"}><FaShoppingCart/>
                        <div className="absolute -top-2 -right-2 text-white bg-black h-5 w-4 rounded-full m-0 p-0 text-sm text-center">
                            {cartItemNumber.length}
                        </div>
                    </Link>
                </div>
                <div className=" text-white hover:text-yellow-300" onClick={handleShowMenu}>
                   
                  <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
             ) : ( 
                <HiOutlineUserCircle />
             )}  
            {/*} <HiOutlineUserCircle />*/}
                    </div>
                    {showMenu && (
                        <div className="absolute right-2 bg-white text-black py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                                {
                                    userData.email === process.env.REACT_APP_ADMIN_EMAIL && ( <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer hover:bg-black hover:text-yellow-300 rounded px-2">Producto Nuevo</Link>
                                )}
                            
                            {
                              userData.image ? <Link to={""} className="cursor-pointer text-white px-2 bg-red-700 hover:bg-black hover:text-yellow-300 rounded" onClick={handleLogout}>Logout ({userData.firstName}){" "}</Link> : <Link to={"login"} className="whitespace-nowrap hover:bg-black hover:text-yellow-300 rounded cursor-pointer px-2">Login</Link>
                            } 
                            {/*<Link to={"login"} className="whitespace-nowrap cursor-pointer">Login</Link>*/}
                            
 
                                <nav className="text-base md:text-base flex flex-col">
                                    <Link to={""} className="px-2 py-1 hover:bg-black hover:text-yellow-300 rounded">Home</Link>
                                    <Link to={"products/647f871915b8745a77a82abb"} className="px-2 py-1 hover:bg-black hover:text-yellow-300 rounded">Productos</Link>
                                    <Link to={"about"} className="px-2 py-1 hover:bg-black hover:text-yellow-300 rounded">Acerca</Link>
                                    <Link to={"contact"} className="px-2 py-1 hover:bg-black hover:text-yellow-300 rounded">Contacto</Link>
                                </nav>
                            
                        </div>
                    )}
                                       
                </div>
            </div>
        </div>

        {/* mobile */}
    </header>
  );
};

export default Header;