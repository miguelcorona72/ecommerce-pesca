import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {MdCloudUpload} from "react-icons/md"
import { ImagetoBase64 } from '../utility/ImagetoBase64'

const Newproduct = () => {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e)=>{
    const {name, value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const uploadImage = async(e) =>{
      const data = await ImagetoBase64(e.target.files[0])
     //  console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })

  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price} = data

    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes =  await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })

    }
    else{
      toast("Capture los campos requeridos")
    }

 
}

return (
  <div className="p-4 ">
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white text-black rounded' onSubmit={handleSubmit}>
        <label htmlFor='name'>Nombre</label>
        <input type={"text"} name="name" className='bg-slate-300 text-black p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Categoria</label>
        <select className='bg-slate-300 text-black p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>select category</option>
          <option value={"senuelos"}>Señuelos</option>
          <option value={"canas"}>Cañas</option>
          <option value={"carretes"}>Carretes</option>
          <option value={"anzuelos"}>Anzuelos</option>
          <option value={"salvavidas"}>Chaleco Salvavidas</option>            
          <option value={"linea"}>Línea</option>            
        </select>

        <label htmlFor='image'>Imagen
        <div className='h-40 w-full bg-slate-300 text-black rounded flex items-center justify-center'>
          {
            data.image ? <img src={data.image} className="h-full" /> :<span className='text-7xl'><MdCloudUpload/></span>
          }
          
          
          <input type={"file"} id="image" onChange={uploadImage} className="hidden"/>      
        </div> 
        </label>

        <label htmlFor='price' className='my-1'>Precio</label>
        <input type={"text"} className='bg-slate-300 text-black p-1 my-1' name='price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description'>Descripción</label>
        <textarea rows={2} value={data.description} className='bg-slate-300 text-black p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>
      
        <button className='bg-yellow-500 text-blue-900 hover:bg-blue-800 hover:text-yellow-300 text-lg font-medium drop-shadow rounded'>Guardar</button>
      </form>  
  </div>
)
}

export default Newproduct
