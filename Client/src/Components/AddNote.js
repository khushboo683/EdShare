import React,{useState} from 'react'
import {MdPublic} from 'react-icons/md'
import {RiGitRepositoryPrivateFill} from 'react-icons/ri'
import { AiFillCaretDown} from "react-icons/ai"
import { Viewer } from '@react-pdf-viewer/core'; 
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core'; 
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import {zoomPlugin } from '@react-pdf-viewer/zoom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function AddNote({id,dropdown,setDropdown})
{
//     const zoomPluginInstance = zoomPlugin();
//     const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;
//     const getFilePluginInstance = getFilePlugin();
// const { Download } = getFilePluginInstance;
//     const defaultLayoutPluginInstance = defaultLayoutPlugin();
const[mode,setMode]=useState('Public');
const[title,setTitle]=useState('');
const[message,setMessage]=useState('');
const[description,setDescription]=useState('');
    const[pdfFile,setPdfFile]=useState(null);
    const[pdfFileError,setPdfFileError]=useState('');
    const[viewPdf,setViewPdf]=useState(null)
const fileType=['application/pdf']
const[selectedFile,setSelectedFile]=useState(null);
//     const handlePdfFileSubmit=()=>{
// // e.preventDefault();
// console.log(pdfFile);
// if(pdfFile!==null){
//     setViewPdf(pdfFile);
//   }
//   else{
//     setViewPdf(null);
//   }
//     }
const navigate=useNavigate();
    const handlePdfFileChange=async(e)=>{
await setSelectedFile(e.target.files[0]) ;
//console.log(e.target.files[0]);
if(e.target.files[0])
{
if(fileType.includes(e.target.files[0].type)){
    let reader=await new FileReader();
    await reader.readAsDataURL(e.target.files[0]);
    reader.onloadend=async(e)=>{
        await setPdfFile(e.target.result);
       await  setPdfFileError('');
      // console.log(e.target.result);
       await setPdfFile(e.target.result);
       await setViewPdf(e.target.result);
    }
}
else{
    await setPdfFile(null);
    await setPdfFileError('Please select valid pdf file');
    setTimeout(()=>{
setPdfFileError('');
    },3000)
    
}
}
else {
    console.log('select your file');
}

    }
    const handleAddNote=async()=>{
try{
    if(selectedFile!==''){
    const formdata=await new FormData();
    console.log(selectedFile);
     await formdata.append('newpdf',selectedFile);
     await formdata.append('title',title);
     await formdata.append('description',description);
     await formdata.append('mode',mode);
    // for (var value of formdata.values()) {
    //     console.log(value);
    //  }
    // console.log(formdata);
    const url=await `https://edshareback.herokuapp.com/uploadpdf/${id}`;
    await axios.post(url,formdata,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    .then(res=>{
        console.log(res.data);
        if(res.data.message==="Successfully uploaded"){
            setMessage(res.data.message)
           setTimeout(()=>{
           navigate(`/mynotes/${id}`)
           window.location.reload();
           },1000)
        }
        else{
            //   setChange(true);
            
            setMessage(res.data.message)
            setTimeout(()=>{
            setMessage('');
            },5000)
            }
    })
}
}
catch(err){
    console.log(err);
    setMessage('Something went wrong!')
            setTimeout(()=>{
              setMessage('')
            },5000)
}
    }




















   
    const handleMode=()=>{
if(mode==='Public')
setMode('Private');
else setMode('Public')
    }
    const handleDropdown=()=>{
        if(dropdown===true)
        setDropdown(false);
    }
    return (
        <div onClick={handleDropdown} className='bg-white h-full '>
        {message && <div className={`mt-20 text-center text-xl font-pat ${message==='Successfully uploaded'?'text-green':'text-red'} font-bold`}><h1>{message}</h1></div>}
        <div className=' grid grid-cols-2 md:grid-cols-1 h-screen md:h-full md:mb-10 items-center '>
        <div className=' md:mt-10 '>
        <div className=' h-96 md:h-80 ml-20 w-full md:ml-16 md:w-2/3  bg-silver'>
        
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
        <Viewer fileUrl={viewPdf}
         />
    </Worker></>}
        
        {!viewPdf&&<h1 className='font-pat font-bold text-xs'>No pdf file selected</h1>}</div>
        {viewPdf&&<div className='my-4 text-xs text-center'>* Choose another file to replace this file</div>}
  </div>
        <div className='h-96 ml-60 md:mx-4'> 
       
        {pdfFileError?<div className='my-1'><h1 className='text-sm font-pat font-bold text-red'>{pdfFileError}</h1></div>:null}
        <div className="flex flex-col font-pat font-bold text-sm"><label>Note file</label>
        <input onChange={handlePdfFileChange} className="px-3 py-3 font-pat font-bold  text-main relative bg-white file:rounded-full file:text-sm rounded file:hover:cursor-pointer text-xs  shadow outline-none focus:outline-none focus:ring w-2/3 md:w-full" type="file" /></div>
        <div className='my-4 flex flex-col font-pat font-bold text-sm'><label>Title</label><input value={title} onChange={(e)=>setTitle(e.target.value)} className="px-3 py-3  text-main relative bg-white file:rounded-full font-pat font-bold  text-sm  shadow outline-none focus:outline-none focus:ring w-2/3 md:w-full" type="text" /></div>
        <div className="my-4 flex flex-col font-pat font-bold text-sm"><label>Description</label><textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="px-3 py-3  text-main relative font-pat font-bold  bg-white  rounded text-sm  shadow outline-none focus:outline-none focus:ring w-2/3 md:w-full" type="text" /></div>
        <div onClick={handleMode} className=' flex text-main hover:cursor-pointer'>{mode==='Public'?<MdPublic size={20} />:<RiGitRepositoryPrivateFill size={20} />}<span className='ml-2 text-sm font-pat font-bold'>{mode}</span></div>
        
     
        <div className='mt-10 flex justify-start'><button onClick={()=>navigate('/home')} className='py-2 px-4 ml-2 rounded text-sm text-main border-2 border-silver hover:bg-silver'>Cancel</button><button onClick={handleAddNote} className='py-2 px-6 ml-2 rounded text-sm text-white hover:bg-l-green bg-green'>Add</button></div>
     
       </div>
        </div>
        </div>
    )
}