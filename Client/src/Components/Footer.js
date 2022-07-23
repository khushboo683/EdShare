import React from 'react'
// import { BsGithub, BsLinkedin, BsInstagram, BsFacebook } from "react-icons/bs"
import {FaRegCopyright} from 'react-icons/fa'
export default function Footer({dropdown,setDropdown})
{
    const handleDropdown=()=>{
        if(dropdown===true)
          setDropdown(false)
      }
return(
    
    <div onClick={handleDropdown} className=' bg-blue flex justify-center fixed text-center text-white inset-x-0 bottom-0 p-2 '><div  className='mx-4 flex hover:cursor-pointer'><FaRegCopyright size={30} color='white'/><span className='text-lg mx-2'>EdShare</span></div>
    </div>
   
)
}