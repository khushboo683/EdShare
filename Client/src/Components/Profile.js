import React,{useState, useEffect} from 'react'
import axios from 'axios'
// import Mynotes from './Mynotes'
// import SavedNotes from './SavedNotes'
import {useNavigate,useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {BsPencilSquare} from 'react-icons/bs'
import { FcSettings,FcReading, FcBookmark, FcDocument } from "react-icons/fc"
import {AiFillFileAdd} from 'react-icons/ai'
import Document from './Document'
import { DocsState } from './context/Context';
export default function Profile({id,dropdown,setDropdown, isAuthenticated})
{
  // let {email}=useParams();
  const{state:{savedDocuments}}=DocsState();
  const[name,setName]=useState('');
  const[bio,setBio]=useState('');
  const[qualification,setQualification]=useState('');
  const[profileUrl,setProfileUrl]=useState('');
  const[data,setData]=useState([]);
  // const[description,setDescription]=useState('');
  // const[mode,setMode]=useState('');
  // const[pdfFile,setPdfFile]=useState('');

  
  useEffect(()=>{

    axios
    .get(`https://edshareback.herokuapp.com/userdetails/${id}`)
    .then(res => {
      console.log(res)
      setName(res.data.name)
      setBio(res.data.bio)
      setQualification(res.data.qualification)
      setProfileUrl(res.data.profileurl)
      
      
      })
      .catch(err => {
          console.log(err)
      })

      // pdfs
      axios
      .get(`https://edshareback.herokuapp.com/getallpdf/${id}`)
      .then(res => {
        const data1=[];
        console.log(res)
        for(let i=0;i<res.data.length && i<6;i++){
          data1.push(res.data[i]);
        }
       setData(data1);
        
        })
        .catch(err => {
            console.log(err)
            
        })



  },[])

    const navigate = useNavigate();
    const handleClick=()=>{
        navigate(`/editprofile/${id}`);
        
    }
    const handleMyNotes = () => {
      navigate(`/mynotes/${id}`);
  };
    const handleDropdown=()=>{
      if(dropdown===true)
        setDropdown(false)
    }
    const handleAddNote=()=>{
      navigate('/addnote')
    }
    const handleSavedNotes=()=>{
      navigate(`/savednotes/${id}`)
    }
    
    return(
         <div onClick={handleDropdown} className=' h-screen md:h-full bg-white'>

       <div className='grid grid-cols-2 md:grid-cols-1 md:mb-4'>
       <div className='md:flex  ml-10 md:ml-0 justify-center'><div className='md:mt-20 md:ml-4 md:mb-0 mt-40 ml-20 mb-10 '><img className='border-2 rounded-full h-80 w-80 md:h-24 md:w-24  ' src={profileUrl} alt=".."/></div><div className='md:ml-2 ml-28 md:mt-20 text-main '><h3 className="md:text-2xl md:mt-8 text-4xl font-pat font-bold md:text-center mb-2">{name}</h3><p className='md:text-sm text-lg mb-4 md:mt-10 md:ml-0 font-pat'>{bio}</p>
       <div className=' text-xl  flex my-4'><FcReading size={30}/> <span className='text-lg mx-2'>{qualification}</span></div>
       <div onClick={handleClick} className='text-sm text-main flex border-2 border-silver hover:border-silver-shadow hover:bg-silver hover:cursor-pointer md:w-full w-1/3 justify-center py-2 rounded-lg '><BsPencilSquare size={20}/><span className='mx-2'>Edit profile</span></div>
       </div></div>
<div className='flex flex-col'>


<div className='mt-40 md:justify-center md:ml-4 md:text-sm mb-10 flex justify-start'>
<div onClick={handleAddNote} className='mx-10 md:mx-4  flex h-10'><AiFillFileAdd size={30} color='black'/><span className='mx-2 font-pat font-bold hover:font-light hover:cursor-pointer text-lg'>Add note</span></div>
<div onClick={handleMyNotes} className='mx-10  md:mx-4 flex h-10'><FcDocument size={30}/><span className='mx-2 font-pat font-bold hover:font-light hover:cursor-pointer text-lg'>My notes</span></div>
<div onClick={handleSavedNotes} className='mx-10  md:mx-4 flex h-10'><FcBookmark size={30}/><span className='mx-2 font-pat font-bold hover:font-light hover:cursor-pointer text-lg'>Saved notes</span></div>

</div>
<div>
 {data.length>0 ?<div className='grid grid-cols-3 md:grid-cols-1 mt-10  mr-8 md:mr-0  text-main  '>
{data.map((item)=>{
   
   return(
<Document proitem={item} key={item._id} pdfId={item._id} id={id} title={item.title} description={item.description} profile={true} savedDocs={savedDocuments[0]} />
   )
})}  </div>:<div className='grid grid-cols-2 md:grid-cols-1 m-20 items-center'><div><lottie-player src="https://assets6.lottiefiles.com/packages/lf20_h6kmaudq.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player></div><div className='md:mt-8 text-center'><h1 className='font-pat font-bold text-main md:text-sm text-lg'>Oops! Looks like you haven't uploaded any document yet. Upload your first document by clicking on add note button below.</h1><button onClick={handleAddNote} className='mt-8 bg-blue font-pat font-bold text-white hover:bg-d-blue md:text-sm md:p-1 rounded-lg p-2'>Add note</button></div></div>}

</div>
</div>




       </div>
 
 
       
 
        
         </div>
        
         
       
        
    )
}