import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {BiError} from 'react-icons/bi'
import {BsPatchCheckFill} from 'react-icons/bs'
import axios from 'axios'

export default function Register()
{
    const navigate = useNavigate();
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const[qualification,setQualification]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[bio, setBio]=useState('')
    const[message,setMessage]=useState('')
//    const [base64urlimage,setbase64urlimage]=useState('')
    const handleClick=()=>{
        navigate('/login');

    }
        const handleClickBtn=async()=>{
            // navigate('/home');
            //console.log(selectedFile)
            if(!(name===''||email===''||password===''||confirmPassword===''||bio===''||qualification==='')){
            const formdata=new FormData();
            formdata.append('data',selectedFile);
            formdata.append('name',name);
            formdata.append('email',email);
            formdata.append('password',password);
            formdata.append('confirmpassword',confirmPassword);
            formdata.append('bio',bio);
            formdata.append('qualification',qualification);
            console.log(selectedFile);
            const url="https://edshareback.herokuapp.com/adduser";
            axios.post(url,formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
            .then(res=>{
                console.log(res.data);
                if(res.data.message==="Succesfully Register - Verify your account"){
                    setMessage(res.data.message)
                    setTimeout(()=>{
                        navigate(`/registerverify/${email}`);
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
        // try{
        //     if(!(name===''||email===''||password===''||confirmPassword===''||bio===''))
        //     {
        //     const body={name:name,email:email,password:password,confirmpassword:confirmPassword,qualification:qualification,bio:bio,data:selectedFile};
        //     console.log(body);
           
        // //     const response= await fetch("https://edshareback.herokuapp.com/adduser", {
        // //         method:"POST",
        // //         headers:{ "Content-Type": "multipart/form-data" },
        // //         body: body
        // //     });
        // //    // const response = await axios.post('https://edshareback.herokuapp.com/adduser', body);
        // //     const parseRes=await response.json();
        // //     console.log(parseRes)
        //     if(parseRes.message==="Succesfully Register - Verify your account"){
        //     setMessage(parseRes.message)
            
        //     console.log(message);
            //   setChange(true);
            //   window.location.reload(false);
           
            
            
            
           
            //console.log("hi");
            // setCheck(true);
            // console.log(check);
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

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    


    return(
        <div  className=" h-screen md:h-full bg-white">
        <div className="grid grid-cols-2 md:grid-cols-1 items-center md:h-full md:mb-20">
        
        <div className='translate-y-12'> <h3 className='text-center font-pat font-bold text-3xl md:text-xl md:mb-4 text-blue  translate-y-16'>Create an account on EdShare</h3><lottie-player src="https://assets5.lottiefiles.com/packages/lf20_s6bvy00o.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player></div>
        <div className=''>
       {message?(message==="Succesfully Register - Verify your account"?<div className='text-green flex justify-center mt-2 rounded-lg mx-4 '><BsPatchCheckFill size={20} color='green '/><h1 className='mx-2 text-center'>{message}</h1></div>:<div className='text-red flex justify-center mt-2 rounded-lg mx-4 '><BiError size={20} color="red"/><h1 className='mx-2 text-center'> {message}</h1></div>):null}
        
        <div className='mx-8 my-8'>
        <label className='mb-2 text-main text-sm'>Name<span className='text-red'>*</span></label>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="px-3 h-3 py-3 required  text-main relative bg-white  rounded text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="text" name="username" placeholder="Lakshya Gupta" />
        </div>
        <div className='mx-8 my-8'>
        <label className='mb-2 text-main text-sm'>Email<span className='text-red'>*</span></label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="px-3 h-3 py-3 required text-main relative bg-white  rounded text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="email" name="email" placeholder="abc@gmail.com" />
        </div>
        
        <div className='mx-8 my-8'>
        <label className='mb-2 text-main text-sm'>Qualification<span className='text-red'>*</span></label>
        <select value={qualification} onChange={(e)=>setQualification(e.target.value)} className="px-1 py-1 text-main  required relative bg-white  rounded text-xs  shadow outline-none focus:outline-none focus:ring w-full " type="text" name="qualification" placeholder="graduate" >
  
<option value="1st to 10th class" >1st to 10th class</option>
<option value="10th pass" >10th Pass</option>
  <option value="12th pass" >12th Pass</option>
  <option  value="Graduate" >Graduate</option>
  <option value="Post Graduate" >Post Graduate</option>
</select>
       
        </div>
        <div className='mx-8 mt-6 mb-7'>
        <label className='mb-2 text-main text-sm'>Bio<span className='text-red'>*</span></label>
        <textarea value={bio} onChange={(e)=>setBio(e.target.value)} className="px-3 py-3  required text-main relative bg-white  rounded text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="text" name="bio" placeholder="I am the best" />
        </div>
        <div className='mx-8 my-8'>
        <label className='mb-2 text-sm text-main'>Password<span className='text-red'>*</span></label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} className="px-3 h-3 py-3 required text-main relative bg-white  rounded text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="password" name="email" placeholder="h1g23ww$$" />
        </div>
        <div className='mx-8 my-8'>
        <label className='mb-2 text-sm text-main'>Confirm Password<span className='text-red'>*</span></label>
        <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="px-3 h-3 py-3 required text-main relative bg-white  rounded text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="password" name="email" placeholder="h1g23ww$$" />
        </div>
        <div className='mx-8 mt-8 mb-4'>
        <label className='mb-2 text-sm text-main'>Profile picture (optional)</label>
        <input onChange={onSelectFile} className="px-3 py-3  text-main relative bg-white file:rounded-full file:text-xs rounded file:hover:cursor-pointer text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="file" name="picture"  />
        </div>
        <h1 onClick={handleClick} className='text-center  mb-4 text-sm underline  text-blue'><span className='hover:text-d-blue hover:cursor-pointer'>Already have an account?</span></h1>
        <button onClick={handleClickBtn}  className=' bg-blue w-11/12 md:w-9/12  text-sm text-white hover:bg-d-blue hover:-translate-y-1 hover:ease-linear hover:transition-all hover:duration-150 rounded-lg p-4 mx-8  '>Create account</button>
        
        
        
        </div>
       
        
        </div>
        
        </div>
    )
}