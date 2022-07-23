import React,{useState,useEffect,useReducer} from 'react'
import Document from './Document';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {BsBookmark} from 'react-icons/bs'
// import {FcBookmark} from 'react-icons/fc'
import {FiSave} from 'react-icons/fi'
import { DocsState } from './context/Context';


export default function Home({id,dropdown,setDropdown,searchResults,isAuthenticated,setIsAuthenticated})
{
    // const[data,setData]=useState([])
    const{homeState:{homeNotes}}=DocsState();
    
    console.log(homeNotes)
console.log(searchResults);
    const navigate = useNavigate();
   
// useEffect(()=>{
// try{
//     axios
//     .get(`https://edshareback.herokuapp.com/gethomepdfs`)
//     .then(res => {
//       console.log(res.data)
//     //  dispatch({type:'FETCH',payload:res.data});
//     setData(res.data);
      
//       })
//       .catch(err => {
//           console.log(err)
//       })
// }
// catch(err){
//     console.log(err);
// }
// },[])

const handleLogin=()=>{
    navigate('/login')
}
// let i=0;
const handleDropdown=()=>{
    if(dropdown===true)
      setDropdown(false)
  }
    return(
        // <Context.Provider value={providerState} >
        <div onClick={handleDropdown} className='bg-white h-full '>
        <div className='grid grid-cols-3 md:grid-cols-1 gap-y-12 md:mx-8 md:mt-40 mt-10 h-full place-items-center  text-main  '>
        {searchResults.length===0?(homeNotes.map((item)=>{
           
           return(
            <div className={`w-5/6 rounded overflow-hidden my-4 hover:-translate-y-2 hover:shadow-2xl shadow-lg hover:transition-all hover:duration-150 hover:ease-linear hover:delay-100`}>
  
            <div className="px-6 py-4">
   <div className={`font-bold text-xl mb-2`}>{item.title}</div>
            
              
              <p className="text-gray-700 text-base">
                {item.description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between">
            <div onClick={handleLogin} className={`text-sm underline text-blue hover:text-d-blue hover:cursor-pointer font-pat font-bold`}>See document</div>
            <div> <span className=" inline-block  hover:cursor-pointer font-semibold font-pat  mr-2 mb-2"><BsBookmark size={20} color="black" onClick={handleLogin} /></span>
            <span onClick={handleLogin} className="inline-block hover:cursor-pointer ml-2 mb-2"><FiSave size={25} color="black"/></span></div>
             
          
            </div></div>
           )
       })):(searchResults.map((item)=>{
        return(
          <div className={`w-5/6 rounded overflow-hidden my-4 hover:-translate-y-2 hover:shadow-2xl shadow-lg hover:transition-all hover:duration-150 hover:ease-linear hover:delay-100`}>
  
          <div className="px-6 py-4">
 <div className={`font-bold text-xl mb-2`}>{item.title}</div>
          
            
            <p className="text-gray-700 text-base">
              {item.description}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2 flex justify-between">
          <div onClick={handleLogin} className={`text-sm underline text-blue hover:text-d-blue hover:cursor-pointer font-pat font-bold`}>See document</div>
          <div> <span className=" inline-block  hover:cursor-pointer font-semibold font-pat  mr-2 mb-2"><BsBookmark size={20} color="black" onClick={handleLogin} /></span>
          <span onClick={handleLogin} className="inline-block hover:cursor-pointer ml-2 mb-2"><FiSave size={25} color="black"/></span></div>
           
        
          </div></div>
        )
    }))}  </div>
      
               
        </div>
        
    )
}