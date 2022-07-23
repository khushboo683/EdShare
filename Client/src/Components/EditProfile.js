import React,{useState, useEffect} from 'react'
import axios from 'axios'
// import Mynotes from './Mynotes'
import './CameraInput.css'
// import SavedNotes from './SavedNotes'
import {useNavigate} from 'react-router-dom'
import Document from './Document'
import { DocsState } from './context/Context';
// import {Link} from 'react-router-dom'
import { FcSettings,FcReading, FcBookmark, FcDocument } from "react-icons/fc"
import {AiFillFileAdd, AiFillCamera} from 'react-icons/ai'
export default function EditProfile({id,dropdown,setDropdown})
{
  // let {profileId}=useParams();
  const{state:{savedDocuments}}=DocsState();
  const[name,setName]=useState('');
  const[bio,setBio]=useState('');
  const[qualification,setQualification]=useState('');
  const[profileUrl,setProfileUrl]=useState('');
  const [selectedFile, setSelectedFile] = useState('')
  // const[email,setEmail]=useState(id)
  const [preview, setPreview] = useState()
  const[data,setData]=useState([]);


  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])
const onSelectFile = e => {
  if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
  }

  // I've kept this example simple by using the first image instead of multiple
  setSelectedFile(e.target.files[0])
  // console.log(e.target.files[0])
}


  // const[newName,setNewName]=useState('');
  // const[newBio,setNewBio]=useState('');
  // const[newQualification,setNewQualification]=useState('');
  // const[newProfileUrl,setNewProfileUrl]=useState('');
  const[message,setMessage]=useState('')
  const [initial,setintial]=useState(false);

  useEffect(()=>{
    // console.log(profileUrl)
  
      // setPreview(undefined)
     
      // console.log("yes");
      if(initial===false){
    axios
    .get(`https://edshareback.herokuapp.com/userdetails/${id}`)
    .then(res => {
      console.log(res)
      setName(res.data.name)
      setBio(res.data.bio)
      setQualification(res.data.qualification)
      setProfileUrl(res.data.profileurl)
      setintial(true);
      
      })
      .catch(err => {
          console.log(err)
      })
      axios
      .get(`https://edshareback.herokuapp.com/getallpdf/${id}`)
      .then(res => {
        console.log(res)
       setData(res.data);
        
        })
        .catch(err => {
            console.log(err)
            setMessage('Something went wrong!')
            setTimeout(()=>{
              setMessage('')
            },5000)
        })

      }
    })



    const navigate = useNavigate();
   
    const handleCancel=()=>{
      navigate(`/profile/${id}`);
    }
    const handleMyNotes = () => {
      navigate(`/mynotes/${id}`);
  };
   

    const handleAddNote=()=>{
      navigate('/addnote')
    }

    useEffect(() => {
      if (!selectedFile) {
          // setPreview(undefined)
          return
      }
     
      const objectUrl = URL.createObjectURL(selectedFile)
      // setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  // const onSelectFile = e => {
  //     if (!e.target.files || e.target.files.length === 0) {
  //         setSelectedFile(undefined)
  //         return
  //     }

  //     // I've kept this example simple by using the first image instead of multiple
  //     setSelectedFile(e.target.files[0])
  //     setProfileUrl(e.target.files[0]);
  //     console.log(e.target.files[0])
  // }

const handleSave=async()=>{
 
  // setNewName(name);
  // setNewBio(bio);
  // setNewQualification(qualification);
  // // setNewProfileUrl(profileUrl);


//   console.log(name)
//     console.log(id)
//  console.log(bio)
//  console.log(qualification)
//  console.log(selectedFile)

  if(!(name===''||id===''||bio===''||qualification===''||selectedFile==='')){
    const formdata=new FormData();
    console.log(selectedFile)
    formdata.append('data',selectedFile);
    formdata.append('name',name);
    formdata.append('email',id);
    formdata.append('bio',bio);
    formdata.append('qualification',qualification);
    const url="https://edshareback.herokuapp.com/edituser";
    axios.put(url,formdata,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    .then(res=>{
        console.log(res.data);
        if(res.data.message==="Successfully updated"){
            setMessage(res.data.message)
            console.log('oKAY')
            setTimeout(()=>{
                navigate(`/profile/${id}`);
            },2000)
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
else setMessage('Input field cannot be missing')
}
const handleDropdown=()=>{
  if(dropdown===true)
    setDropdown(false)
}

    return(
         <div onClick={handleDropdown} className=' h-screen md:h-full bg-white'>
{message && <div className='mt-20' ><h1 className={`${message==='Successfully updated'?'text-green':'text-red'} text-center text-xl font-pat font-bold`}>{message}</h1></div>}
       <div className='grid grid-cols-2 md:grid-cols-1 md:mb-4'>
       <div className='md:flex-col md:ml-0 ml-10 justify-center'><div className='md:mt-20 md:mb-0 mt-32 ml-40 md:ml-28 mb-10 '><img className='border-2 rounded-full h-80 w-80 md:h-32 md:w-32   ' src={preview?preview:profileUrl} alt=".."/></div><div className='ml-20 md:ml-0 z-50 -translate-y-28 md:-translate-y-10 translate-x-72 md:translate-x-52 flex flex-col'><label htmlFor='camera' className='hover:cursor-pointer'><AiFillCamera className='CameraIcon'/></label><input id="camera" onChange={onSelectFile}  className="custom-file-input hidden " type="file" name="picture"  /></div>
       <div className='ml-20 md:mx-6  my-0 flex flex-col'>
        <label className='mb-2 text-main text-sm'>Name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="px-3  py-3 required  text-main relative bg-white  rounded text-sm  shadow outline-none focus:outline-none focus:ring w-2/3 md:w-full" type="text" name="name"  />
        </div>
       
       <div className='ml-20 md:mx-6  my-4 flex flex-col'><label className='text-sm mr-2'><FcReading size={20}/></label><select value={qualification} onChange={(e)=>setQualification(e.target.value)} className="px-3 py-3 required text-main relative bg-white  rounded text-sm  shadow outline-none focus:outline-none focus:ring w-2/3 md:w-full" type="text" name="qualification"  >
  
       <option value="1st to 10th class" className='hover:bg-h-blue'>1st to 10th class</option>
       <option value="10th pass" className='hover:bg-h-blue'>10th Pass</option>
         <option value="12th pass" className='hover:bg-h-blue'>12th Pass</option>
         <option value="Graduate" className='hover:bg-h-blue'>Graduate</option>
         <option value="Post Graduate" className='hover:bg-h-blue'>Post Graduate</option>
       </select></div>
       <div className='ml-20 md:mx-6 flex flex-col mb-4'>
       <label className='mb-2 text-main text-sm'>Bio</label>
       <textarea value={bio} onChange={(e)=>setBio(e.target.value)} className="px-3 py-3  required text-main relative bg-white  rounded text-sm  shadow outline-none focus:outline-none focus:ring w-2/3 md:w-full" type="text" name="bio" />
       </div>
       <div className='ml-20 md:ml-10 flex  w-1/3 justify-start'><button onClick={handleCancel} className='p-1 border-2 border-silver font-pat font-bold  text-sm hover:bg-silver rounded-lg'>Cancel</button><button onClick={handleSave} className='py-1 border-2 ml-4 px-2 font-pat font-bold rounded-lg border-green text-white bg-green text-sm hover:bg-l-green'>Save</button></div>
       
       </div>
       <div className='flex flex-col'>


       <div className='mt-40 md:justify-center md:ml-4 md:text-sm mb-10 flex justify-start'>
       <div onClick={handleAddNote} className='mx-10 md:mx-4  flex h-10'><AiFillFileAdd size={30} color='black'/><span className='mx-2 font-pat font-bold hover:font-light hover:cursor-pointer md:text-sm text-lg'>Add note</span></div>
       <div onClick={handleMyNotes} className='mx-10  md:mx-4 flex h-10'><FcDocument size={30}/><span className='mx-2 font-pat font-bold hover:font-light hover:cursor-pointer md:text-sm text-lg'>My notes</span></div>
       <div className='mx-10  md:mx-4 flex h-10'><FcBookmark size={30}/><span className='mx-2 font-pat font-bold hover:font-light hover:cursor-pointer md:text-sm text-lg'>Saved notes</span></div>
       
       </div>
       <div>
        {data.length>0 ?<div className='grid grid-cols-3 md:grid-cols-1 mt-10  md:mr-8 mr-20  text-main  '>
       {data.map((item)=>{
          
          return(
       <Document key={item._id} pdfId={item._id} id={id} title={item.title} description={item.description} profile={true} savedDocs={savedDocuments[0]} />
          )
       })}  </div>:<div className='grid grid-cols-2 md:grid-cols-1 m-20 items-center'><div><lottie-player src="https://assets6.lottiefiles.com/packages/lf20_h6kmaudq.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player></div><div className='md:mt-8 text-center'><h1 className='font-pat font-bold text-main md:text-sm text-lg'>Oops! Looks like you haven't uploaded any document yet. Upload your first document by clicking on add note button below.</h1><button onClick={handleAddNote} className='mt-8 bg-blue font-pat font-bold text-white hover:bg-d-blue md:text-sm md:p-1 rounded-lg p-2'>Add note</button></div></div>}
       
       </div>
       </div>
       

       </div>
 
 
        
 
        
         </div>
        
         
       
        
    )
}