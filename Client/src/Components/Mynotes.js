import React,{useState,useEffect,useReducer} from 'react'
import Document from './Document';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { DocsState } from './context/Context';


export default function Mynotes({id,dropdown,setDropdown,savedDocs,mynotes})
{
    
  const{myNotesState:{my_notes}}=DocsState();
  console.log(my_notes);
//   const{state:{savedDocuments}}=DocsState();

   
     
   const navigate = useNavigate();
  
const handleAddNote=()=>{
    navigate('/addnote')
}

// let i=0;
const handleDropdown=()=>{
    if(dropdown===true)
      setDropdown(false)
  }
    return(
        // <Context.Provider value={providerState} >
        <div onClick={handleDropdown} className='bg-white h-screen md:h-full '>
        {my_notes!==undefined ?<div className='grid grid-cols-3 md:grid-cols-1 md:mt-20 h-screen md:h-full md:mb-4 place-items-center  text-main   '>
        {my_notes.map((item)=>{
           
           return(
<Document proitem={item} key={item._id} pdfId={item._id} id={id} title={item.title} description={item.description} docurl={item.docurl} showMenu={true}  mynotes={mynotes}/>
           )
       })}  </div>:<div className='grid grid-cols-2 md:grid-cols-1 m-20 items-center'><div><lottie-player src="https://assets6.lottiefiles.com/packages/lf20_h6kmaudq.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player></div><div className='md:mt-8 text-center'><h1 className='font-pat font-bold text-main md:text-lg text-2xl'>Oops! Looks like you haven't uploaded any document yet. Upload your first document by clicking on add note button below.</h1><button onClick={handleAddNote} className='mt-8 bg-blue font-pat font-bold text-white hover:bg-d-blue md:text-sm md:p-2 rounded-lg p-4'>Add note</button></div></div>}
      
               
        </div>
        // </Context.Provider>
    )
}