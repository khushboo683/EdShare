import React,{useState,useEffect} from 'react'
import Document from './Document';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { DocsState } from './context/Context';
export default function SavedNotes({id,dropdown,setDropdown,isAuthenticated,setIsAuthenticated})
{
    // const[data,setData]=useState([])
    const{state:{savedDocuments}}=DocsState();
   console.log(savedDocuments);
   

   

    // const navigate = useNavigate();
   
const handleDropdown=()=>{
    if(dropdown===true)
      setDropdown(false)
  }
    return(
        
        <div onClick={handleDropdown} className='bg-white h-screen md:h-full mt-20 '>
        {savedDocuments!==undefined && savedDocuments.length!==0?<div className='grid grid-cols-3 md:grid-cols-1 gap-y-20  h-screen md:h-full md:mb-4 place-items-center  text-main  '>
        {savedDocuments.map((item)=>{
           
           return(
<Document proitem={item} key={item._id} email={item.email} pdfId={item._id} id={id} title={item.title} description={item.description} isAuthenticated={isAuthenticated} docurl={item.docurl} showMenu={false} savedDocs={savedDocuments[0]} />
           )
       })}  </div>:<div className='grid grid-cols-2 md:grid-cols-1 m-20 items-center'><div><lottie-player src="https://assets6.lottiefiles.com/packages/lf20_h6kmaudq.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player></div><div className='md:mt-8 text-center'><h1 className='font-pat font-bold text-main md:text-lg text-2xl'>Oops! Looks like you haven't saved any document yet.</h1></div></div>}
      
               
        </div>
        
    )
}