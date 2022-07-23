import React,{useEffect, useState, useReducer} from 'react'
import {BsBookmark} from 'react-icons/bs'
import {FcBookmark} from 'react-icons/fc'
import {FiSave} from 'react-icons/fi'
import{FcDownload} from'react-icons/fc'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {BsPencilSquare} from 'react-icons/bs'
import { MdDelete } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import {GrView} from 'react-icons/gr'
import {CgProfile} from 'react-icons/cg'
import { saveAs } from "file-saver";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {FaEye} from 'react-icons/fa'
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import { DocsState } from './context/Context';


  
export default function Document({pdfId,id,title,email,description,showMenu,isAuthenticated,docurl,profile,proitem})
{
   const{state:{savedDocuments},dispatch}=DocsState();
   const{myNotesState:{my_notes}, mynotesDispatch}=DocsState();
  // // console.log(savedDocuments[0]);
  //console.log(proitem)
const[savedDocs,setSavedDocs]=useState(savedDocuments)
const [check,setcheck]=useState(false);

  const find=(pdfId)=>{
    if(savedDocs!==undefined && savedDocs.length!==0){
      const found = savedDocs.some(el => el._id === pdfId);
      // console.log(found);
      console.log(found);
      console.log(pdfId);
      if(!found)return false;
      return true;
    }
    
  }
 const[author,setAuthor]=useState('');
 const[authorId,setAuthorId]=useState('');
  const saveFile = () => {
    saveAs(
      docurl,
      title
    );
  };
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  //const[savedDocss,setSavedDocs]=useState([]);
    // const[isSave,setIsSave]=useState(false);
   
   
    
    const[openMenu,setOpenMenu]=useState(false);
    const[message,setMessage]=useState('')
  
    const handleSave=async()=>{
      // if(data.includes(pdfId))
      // return;
if(isAuthenticated===false){
  return navigate('/login');
}
if(find(pdfId))
return;
      // if(data.includes(pdfId)===false){
        
        try{
          setcheck(true);
          dispatch({
            type:'add_to_saved',
            payload:proitem
          })
          console.log('saved!!')
          console.log(pdfId);
          console.log(proitem)
          const response=await fetch(`https://edshareback.herokuapp.com/savedoc/${id}/${pdfId}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'}
        })
        const parseRes=response.json();
        console.log(parseRes.message);
        if(parseRes.message==='Successfully saved'){
          setMessage(parseRes.message);
          console.log(parseRes.message);
          setTimeout(()=>{
            setMessage('');
          },2000)
        }
        else {
          console.log(parseRes.message);
          setMessage(parseRes.message);
          setTimeout(()=>{
            setMessage('');
          },2000)
        
      }
        }
        catch(err)
        {
          console.log(err);
          setMessage('Something went wrong!')
            setTimeout(()=>{
              setMessage('')
            },5000)
        }
      // }
      // else {
        // setIsSave(false)
      }
        const handleUnSave=async()=>{
          try{
            setcheck(false);
            dispatch({
              type:'remove_from_saved',
              payload:proitem
            })
            console.log(proitem)
            const response=await fetch(`https://edshareback.herokuapp.com/deletesavedoc/${id}/${pdfId}`,{
              method:'DELETE',
              headers:{'Content-Type':'application/json'}
          })
          const parseRes=response.json();
          if(parseRes.message==='Successfully removed'){
            setMessage(parseRes.message);
            console.log(parseRes.message);
            setTimeout(()=>{
              setMessage('');
            },2000)
          }
          else {
            console.log(parseRes.message);
            setMessage(parseRes.message);
            setTimeout(()=>{
              setMessage('');
            },2000)
          }
          }
          catch(err)
          {
            console.log(err);
            setMessage('Something went wrong!')
            setTimeout(()=>{
              setMessage('')
            },5000)
          }
        // }
        }
       


    
   
            const handleDocMenu=()=>{
              if(openMenu===false)
              setOpenMenu(true)
              else setOpenMenu(false);
            }
            const openEditDocument=()=>{
            navigate(`/editdocument/${pdfId}`);
            }
            const handleDeleteDocument=async()=>{
              
              try{
                mynotesDispatch({
                  type:'delete',
                  payload: proitem
                })
                const response=await fetch(`https://edshareback.herokuapp.com/deletepdf/${id}/${pdfId}`,{
                  method:'DELETE',
                  headers:{'Content-Type':'application/json'},
                  body:JSON.stringify({email:id,pdfid:pdfId})
              })
              const parseRes=response.json();
              if(parseRes.message==='Successfully deleted'){
                setMessage(parseRes.message);
                console.log(parseRes.message);
                setTimeout(()=>{
                  setMessage('');
                },2000)
              
              }
              else {
                console.log(parseRes.message);
                setMessage(parseRes.message);
                setTimeout(()=>{
                  setMessage('');
                },2000)
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
            const handleSeeDocument=()=>{
              if(isAuthenticated===false)
              return navigate('/login')
              window.open(docurl)
            }
            const handleClickOpen = () => {
              setOpen(true);
            //   console.log('clicked db')
              
            };
            const handleClose = () => {
              setOpen(false);
            };
            useEffect(()=>{
              let isMounted = true;
              try{
                if(savedDocs!==undefined && savedDocs.length!==0){
                  const found = savedDocs.some(el => el._id === pdfId);
                  console.log(found);
                  setcheck(found);
                }
                axios
                .get(`https://edshareback.herokuapp.com/userdetails/${email}`)
                .then(res => {
                  // console.log(res.data.name)
                //  dispatch({type:'FETCH',payload:res.data});
                if(isMounted){
                  setAuthor(res.data.name);
                  setAuthorId(proitem.email);
                }
               
                  
                  })
                  .catch(err => {
                      console.log(err)
                  })
                
            }
            catch(err){
                console.log(err);
                setMessage('Something went wrong!')
                setTimeout(()=>{
                  setMessage('')
                },5000)
            }
            return () => { isMounted = false };
            },[])


            const openProfile=()=>{
              if(id!==authorId){
                console.log(authorId);
                navigate(`/viewprofile/${authorId}`,{authorId:authorId})
              }
              else {
                navigate(`/profile/${id}`);
              }
              
             
            }
    return(
       
        
        <div className={`${profile===true?'w-5/6':'w-2/3 md:w-full'} rounded hover:-translate-y-2 hover:transition-all hover:duration-75 hover:ease-linear hover:delay-75  overflow-hidden hover:shadow-2xl shadow-lg m-10 md:ml-8`}>
        
  <div className={`${profile===true?'px-2':'pl-12 pr-10'} py-2`}>
  <div className='flex justify-between'><div className={`font-bold ${profile===true?'text-md':'text-xl'} mb-2 md:text-lg`}>{title}</div>{showMenu &&  <div onClick={handleDocMenu} className="hover:cursor-pointer "><BsThreeDotsVertical size={20}/> {showMenu && openMenu && <div className=" flex flex-col absolute items-center z-50  md:h-20 h-20 w-12 bg-white rounded shadow-xl "><h1 onClick={openEditDocument} className='flex items-center mb-2 mr-2 hover:cursor-pointer pt-2 '><BsPencilSquare size={20}/> </h1><h1 onClick={handleClickOpen} className='flex items-center mr-2 hover:cursor-pointer md:mt-2 pt-2 pl-2'><MdDelete size={25}/></h1></div>}</div>}</div>
 
    
    <p className="text-gray-700 text-sm mb-8 md:text-sm">
      {description}
    </p>
    {author && <div className=''><h1  className='flex items-center  md:mt-4 mt-6   font-pat font-bold text-sm'>Created by  <span onClick={openProfile} className="text-d-blue hover:cursor-pointer hover:underline ml-2 text-extrabold">{author}</span></h1></div>}
  </div>
  <div className="px-6 pt-2 md:pt-2 md:pb-1 pb-0 flex justify-between">
  <div onClick={handleSeeDocument} className={`${profile===true?'text-xs':'text-sm'}  text-eye-blue hover:text-eye-d-blue hover:cursor-pointer font-pat font-bold`}><FaEye  size={30}/></div>
  <div> <span className=" inline-block  hover:cursor-pointer font-semibold font-pat  mr-2 mb-2">{check?<FcBookmark size={profile===true?20:25} onClick={handleUnSave} />:<BsBookmark size={profile===true?15:20} color="black"  onClick={handleSave} />}</span>
  <span onClick={saveFile} className="inline-block hover:cursor-pointer text-d-blue  ml-2 mb-2"><FcDownload size={profile===true?20:30}  /></span></div>
   

  </div>
  <Dialog open={open} onClose={handleClose}>
            <DialogTitle variant="h5" sx={{ fontWeight: 'bold' }} color="black" >
               <span className='font-black'>Do you want to delete this document?</span>
               
            </DialogTitle>
            <DialogContent>
              <DialogContentText variant="h6">
                <span className="font-black">Your document will be deleted permanently.</span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
              <span className="text-d-blue hover:text-h-blue hover:transition-all hover:duration-75 hover:ease-linear hover:delay-150 hover:border-h-blue rounded-lg border-2 border-blue p-2 font-bold"> No ! Keep it</span>
              </Button>
              <Button onClick={handleDeleteDocument} color="primary" autoFocus>
              <span className="text-white bg-blue p-2 rounded-lg hover:bg-d-blue font-bold"> Yes ! Delete it</span>
              </Button>
            </DialogActions>
          </Dialog>
</div>
    
    )
}