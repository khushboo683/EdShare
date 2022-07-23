import React,{useState,useEffect,useReducer} from 'react'
import {BsPencilSquare} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import {MdPublic} from 'react-icons/md'
import {RiGitRepositoryPrivateFill} from 'react-icons/ri'
// material ui dialogue box
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import { DocsState } from './context/Context';
// import { useModal } from 'react-hooks-use-modal';
// material ui dialogue box



// import { data } from 'autoprefixer';
export default function Settings({id,dropdown,setDropdown,isAuthenticated,setIsAuthenticated})
{

// dialogue box code
// const[mode,setMode]=useState('');
// console.log(mode)
const{modestate,modedispatch}=DocsState();

const [open, setOpen] = React.useState(false);
const [open1, setOpen1] = React.useState(false);
  
const handleClickOpen = () => {
  setOpen(true);
//   console.log('clicked db')
  
};
const handleClickOpen1 = (e) => {
  e.preventDefault();
    setOpen1(true);
  //   console.log('clicked db')
    
  };

const handleClose = () => {
  setOpen(false);
};
const handleClose1 = () => {
  setOpen1(false);
};

// dialogue box code

// const[boxHeight,setBoxHeight]=useState('1/2')
    const navigate=useNavigate();
    
    const[message,setMessage]=useState('');
    const[showEditEmail,setShowEditEmail]=useState(false);
    const[showEditPassword,setShowEditPassword]=useState(false);
    const[newPassword,setNewPassword]=useState('');
    const[oldPassword,setOldPassword]=useState('');
    const[confirmNewPassword,setConfirmNewPassword]=useState('');
    const[password,setPassword]=useState(null)
    const[Otp,setOtp]=useState('');
    
    // const[email,setEmail]=useState(id);
    const[newEmail,setNewEmail]=useState('');
    const editEmail=()=>{
      
        if(showEditEmail===false)
setShowEditEmail(true);
else setShowEditEmail(false)
    }
    const editPassword=()=>{
        if(showEditPassword===false)
setShowEditPassword(true);
else setShowEditPassword(false)
    }
    const handleCancelEditEmail=()=>{
        // navigate('/settings')
        if(showEditEmail===false)
setShowEditEmail(true);
else setShowEditEmail(false)
    }
    const handleCancelEditPassword=()=>{
        if(showEditPassword===false)
        setShowEditPassword(true);
        else setShowEditPassword(false)
    }

const[OTPBox,setOTPBox]=useState(false);
// const[DMessage,setDMessage]=useState('')

    const saveSettingsEmail=async()=>{

// setEmail(newEmail);
try{
  console.log('enter send otp to second email')
  const response=await fetch('https://edshareback.herokuapp.com/sendotpsecemail',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({secemail:newEmail,email:id,password:password})
  })
  const parseRes=await response.json();
  if(parseRes.message==='OTP sent'){
    console.log('otp is sent')
    setOpen1(false);
    setMessage(parseRes.message);
    setTimeout(()=>{
      setOTPBox(true);
    },1000)
     
      
      
    
  }
  else {
    setOpen1(false);
      setMessage(parseRes.message);
      setTimeout(()=>{
          setMessage('');
         },2000)

  }

}
catch(err){
console.log(err);
setMessage('Some error occurred');
setTimeout(()=>{
  setMessage('')
},5000)
}



    }
    const saveSettingsPassword=async()=>{
      try{
        console.log(newPassword)
        console.log(confirmNewPassword)
        console.log(oldPassword)
        console.log(id)
        const response=await fetch('https://edshareback.herokuapp.com/changepassword',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({newpassword:newPassword,confirmnewpassword:confirmNewPassword,email:id,oldpassword:oldPassword})
        })
        const parseRes=await response.json();
        if(parseRes.message==='Password Updated Successfully'){
            setMessage(parseRes.message);
         setShowEditPassword(false);
         setTimeout(()=>{
         setMessage('')
         },2000)
        }
        else {
            setMessage(parseRes.message);
            setTimeout(()=>{
                setMessage('');
               },2000)
      
        }
      
      }
      catch(err){
      console.log(err);
      setMessage('Some error occurred');
      setTimeout(()=>{
        setMessage('')
      },5000)
      }
    }

const handleDeleteAccount=async()=>{
    console.log('delete clicked')
    try{
        const response=await fetch('https://edshareback.herokuapp.com/deleteuser',{
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email:id})
        })
        const parseRes=await response.json();
        if(parseRes.message==='User successfully deleted'){
            setMessage(parseRes.message);
            localStorage.removeItem('token')
            setIsAuthenticated(false)
            setTimeout(()=>{
             navigate('/login');
            },2000)
        }
        else {
            setMessage(parseRes);
            setTimeout(()=>{
                setMessage('');
               },2000)

        }

    }
    catch(err){
console.log(err);
setMessage('Some error occurred');
setTimeout(()=>{
  setMessage('')
},5000)
    }
}


// if(open){
//     return ( 
//         <div>
          
//         </div>
//       );
   
// }
   

   

const handleDropdown=()=>{
    if(dropdown===true)
      setDropdown(false)
  }
  const handleMode=async()=>{
    // let body=await {profilemode:''};
    // if(mode===false)
    // setMode(true);
    
    // else setMode(false)
   
    
try{

    // if(body.profilemode!==''){
    // await console.log(body)
    console.log(id)
    let docmod="Public";
    // console.log(mode)
    if(modestate===true)
    {
      docmod="Private";
    } 
    //
    const response= await fetch(`https://edshareback.herokuapp.com/profilemode/${id}`, {
        method:"POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({profilemode:modestate,docmode:docmod})
    });
    const parseRes=await response.json();
    if(parseRes.message==='Successfully updated'){
    //  await  modedispatch('toggle')
        setMessage(parseRes.message);
        setTimeout(()=>{
            setMessage('');
            },2000)
    }
    else {
        setMessage(parseRes.message);
        setTimeout(()=>{
        setMessage('');
        },2000)
    // }
}
}
catch(err)
{
console.log(err);
setMessage('Some error occurred')
setTimeout(()=>{
  setMessage('')
},5000)
}
        }
       const changeEmail=async()=>{
        try{
          console.log('enter edit email')
          const response=await fetch('https://edshareback.herokuapp.com/editemail',{
              method:'PUT',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({email:id,otp:Otp,secemail:newEmail})
          })
          const parseRes=await response.json();
          if(parseRes.message==='Email Updated Successfully'){
            setOTPBox(false);
            console.log('successful')
              setMessage(parseRes.message);
              localStorage.removeItem('token')
              setIsAuthenticated(false)
              setTimeout(()=>{
               navigate('/login');
              },2000)
          }
          else {
              setMessage(parseRes);
              setTimeout(()=>{
                  setMessage('');
                 },2000)
  
          }
  
      }
      catch(err){
  console.log(err);
  setMessage('Some error occurred');
  setTimeout(()=>{
    setMessage('')
  },5000)
      }
       }
       const [data1,setData1]=useState([]);
       async function getData(email) {
        const data = await axios.get(`https://edshareback.herokuapp.com/userdetails/${email}`)
            .then(promise => {
              console.log(promise.data)
                return promise.data;
                
            })
            .catch(e => {
                console.error(e);
            })
            return data;
      }
// useEffect(() => {
//   axios.get(`https://edshareback.herokuapp.com/userdetails/${id}`)
//   .then(promise => {
//     console.log(promise.data.private_profile)
//     // setMode(promise.data.private_profile);
      
//   })
//   .catch(e => {
//       console.error(e);
//   })
//   // return data;
// // const data=getData(id);

// // console.log(mode);
// // console.log(data1);
// },[])

    return(
        <div onClick={handleDropdown} className='h-full bg-white '>
        { <div className='mt-20 text-center'><span className={`font-pat font-bold text-xl ${message==='Successfully updated'|| message==='User successfully deleted' || message==='Email Updated Successfully'|| message==='OTP sent' || message==='Password Updated Successfully'?'text-green':'text-red'}`}>{message}</span></div>}
<div className='grid grid-cols-2 md:grid-cols-1 md:mt-0 h-full mb-8  '>
<div className='h-full mt-0 md:mt-0 md:h-96'><lottie-player src="https://assets5.lottiefiles.com/packages/lf20_hxz9xsfz.json"  background="transparent"  speed="1"    loop  autoplay></lottie-player></div>
<div className={`mt-40 md:mt-0 md:ml-0  h-${showEditEmail || showEditPassword?'38':'1/2'}  rounded-xl p-4  w-1/2 md:w-full ml-10 text-center`}><div className=""><div className=''>
<div className='flex justify-center '><h1 className='my-2 mr-4 text-blue font-pat font-bold  text-2xl  md:text-xl'>Registered email</h1><span onClick={editEmail} className='translate-y-3 hover:cursor-pointer'><BsPencilSquare/></span></div>
{!showEditEmail && <h2 className='font-pat text-xl md:text-lg font-bold'>{id}</h2>}
</div>
{showEditEmail && <><div className='mt-4 flex flex-col mx-4 '>
<label className='mb-2 text-main md:text-sm text-lg'>Enter new email</label>
        <input value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} className="px-3 py-3 required text-main relative bg-white  rounded text-sm  shadow outline-none focus:outline-none focus:ring w-full" type="email" name="email" />
</div>
<div className=' flex mt-6 w-1/3 justify-start mx-4'><button onClick={handleCancelEditEmail} className='p-1 border-2 border-silver font-pat font-bold md:text-xs text-sm hover:bg-silver rounded-lg'>Cancel</button><button onClick={handleClickOpen1} className='py-1 border-2 ml-4 px-2 font-pat font-bold rounded-lg border-green  text-white bg-green md:text-xs text-sm hover:bg-l-green'>Save</button></div></>
}

<div className='mt-10 mb-4'>
<div className='flex justify-center'><h1 className='my-2 mr-4 text-blue font-pat font-bold md:text-xl text-2xl'>Password</h1><span onClick={editPassword} className='translate-y-3 hover:cursor-pointer'><BsPencilSquare/></span></div>
{!showEditPassword && <h2 className='text-xl md:text-lg'>**********************</h2>}
</div>
{showEditPassword && <div>
    <div className='mt-0 flex flex-col mx-4 '>
<label className='mb-2 text-main md:text-sm text-lg'>Enter old password</label>
 <input value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} className="px-3 py-3 required text-main relative bg-white  rounded text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="password" name="oldpassword" placeholder="xxxxxxxxxxx" />
<span onClick={()=>navigate('/forgotpassword')} className="text-blue mt-2 underline text-sm  hover:text-d-blue hover:cursor-pointer ">Forgot password?</span>
       
</div>
    <div className='mt-4 flex flex-col mx-4'>
<label className='mb-2 text-main text-lg md:text-sm'>Enter new password</label>
        <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="px-3 py-3 required text-main relative bg-white  rounded text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="password" name="newpassword" placeholder="xxxxxxxxxxx" />
</div>
<div className='mt-4 flex flex-col mx-4'>
<label className='mb-2 text-main text-lg md:text-sm'>Confirm new password</label>
        <input value={confirmNewPassword} onChange={(e)=>setConfirmNewPassword(e.target.value)} className="px-3 py-3 required text-main relative bg-white  rounded text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="password" name="confirmnewpassword" placeholder="xxxxxxxxxxxx" />
</div>
<div className=' flex mt-6 w-1/3 justify-start mx-4'><button onClick={handleCancelEditPassword} className='p-1 border-2 border-silver font-pat font-bold md:text-xs text-sm hover:bg-silver rounded-lg'>Cancel</button><button onClick={saveSettingsPassword} className='py-1 border-2 ml-4 px-2 font-pat font-bold rounded-lg border-green text-white bg-green md:text-xs text-sm hover:bg-l-green'>Save</button></div>
</div>

}


<div className='mt-10'>
<h1 className='text-blue font-pat font-bold md:text-xl text-2xl mb-2'>Account mode</h1>

<div onClick={handleMode} className=' mt-4 flex justify-center text-main hover:cursor-pointer'>{modestate===false?<MdPublic size={25} />:<RiGitRepositoryPrivateFill size={25} />}<span className='ml-2 text-lg md:text-sm font-pat font-bold'>{modestate===false?'Public':'Private'}</span></div>
</div>
<h1 className='text-blue  font-pat font-bold text-lg md:text-sm underline my-4'><span onClick={handleClickOpen} className="hover:text-d-blue hover:cursor-pointer">Remove account?</span></h1>
</div>


</div>
</div>
<Dialog open={open} onClose={handleClose}>
            <DialogTitle color="black" >
               <span className="font-extrabold">Do you want to delete your EdShare account?</span>
              
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <span className="font-bold">Your account will be deleted permanently.</span>
              
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
               <span className="text-d-blue font-bold">No !</span>
              </Button>
              <Button onClick={handleDeleteAccount} color="primary" autoFocus>
               <span className="text-d-blue font-bold">Yes, delete it!</span>
              </Button>
            </DialogActions>
          </Dialog>
        
          <Dialog open={open1} onClose={handleClose1}>
            <DialogTitle color="black" >
              <label className="font-extrabold mb-2">Password</label>
              <br/><input value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-white border-2 border-blue text-main rounded p-1 font-sm font-extrabold " type="text"></input>
              
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                
              <span onClick={()=>navigate('/forgotpassword')} className="text-blue underline text-sm hover:text-d-blue hover:cursor-pointer font-bold">Forgot password?</span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose1} color="primary">
               <span className="font-bold hover:text-d-blue">Cancel</span>
              </Button>
              <Button onClick={saveSettingsEmail} color="primary" autoFocus>
              <span className="font-bold hover:text-d-blue">Okay</span>
              </Button>
            </DialogActions>
          </Dialog>
        


          <Dialog open={OTPBox} onClose={()=>setOTPBox(false)}>
            <DialogTitle color="black" >
              <label className="font-extrabold mb-2">Enter OTP send to your new email</label>
              <br/><input value={Otp} onChange={(e)=>setOtp(e.target.value)} className="bg-silver text-main rounded p-1 font-sm " type="password"></input>
              
            </DialogTitle>
           
            <DialogActions>
              
              <Button onClick={changeEmail} color="primary" autoFocus>
              <span className="font-bold hover:text-d-blue">Okay</span>
              </Button>
            </DialogActions>
          </Dialog>
        


        
        </div>
    )
}