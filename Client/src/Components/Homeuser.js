import React,{useState,useEffect,useReducer} from 'react'
import Document from './Document';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { DocsState } from './context/Context';



export default function Homeuser({id,dropdown,setDropdown,isAuthenticated,searchResults,setIsAuthenticated})
{
    // const[data,setData]=useState([])
    // const[name,setName]=useState('');

    const{homeState:{homeNotes}}=DocsState();
    console.log(homeNotes)
    // const[docs,setDocs]=useState([]);
    // useEffect(()=>{
    //  if(searchResults===undefined || searchResults.length===0)
    //  setDocs(homeNotes);
    //  else setDocs(searchResults);
    // },[])
    // console.log(savedDocuments[0]);

    const navigate = useNavigate();
   
console.log(searchResults);
// console.log(docs);

// let i=0;
const handleDropdown=()=>{
    if(dropdown===true)
      setDropdown(false)
  }
    return(
        // <Context.Provider value={providerState} >
        <div onClick={handleDropdown} className='bg-white h-full '>
        <div className='grid grid-cols-3 md:grid-cols-1 gap-y-12 md:mx-8 md:mt-40 mt-10 h-full mb-4 place-items-center  text-main  '>
        {searchResults.length===0?(homeNotes.map((item)=>{
           
           return(
           <Document proitem={item} key={item._id} pdfId={item._id} id={id} title={item.title}  email={item.email} description={item.description} isAuthenticated={isAuthenticated} docurl={item.docurl} showMenu={false}/>
           )
       })):(searchResults.map((item)=>{
           return(
            <Document proitem={item} key={item._id} pdfId={item._id} id={id} title={item.title}  email={item.email} description={item.description} isAuthenticated={isAuthenticated} docurl={item.docurl} showMenu={false}/>
           )
       }))}  </div>
      
               
        </div>
        // </Context.Provider>
    )
}