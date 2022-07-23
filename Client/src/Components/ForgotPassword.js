import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
export default function ForgotPassword({id})
{
    const[hidden,setHidden]=useState(false)
    const[hideOTP,setHideOTP]=useState(false)
    const[message,setMessage]=useState('')
    const[registeredEmail,setRegisteredEmail]=useState('')
    const[otp,setOtp]=useState('');
    const navigate=useNavigate();
    // const isOTPcorrect=true;
    const handleClick=async()=>{


try{
    console.log(registeredEmail)
    const response= await fetch("https://edshareback.herokuapp.com/sendotp", {
        method:"POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({email:registeredEmail})
    });
    const parseRes=await response.json();
    if(parseRes.message==='OTP sent'){
        setHideOTP(true);
        setHidden(true);
      setMessage('OTP has been sent to your email for verification.');
     
    }
    else {
        setHideOTP(false);
        setHidden(false);
        setMessage(parseRes.message);
        setTimeout(()=>{
            setMessage('');
          },2000)

    }
}
catch(err)
{
console.log(err);
setMessage('Something went wrong!!');
}

    
    }
    const handleVerify=async()=>{
        setHidden(false);
       
        try{
           
            console.log(registeredEmail)
            const response= await fetch("https://edshareback.herokuapp.com/checkotp", {
                method:"POST", 
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify({email:registeredEmail,otp:otp})
            });
            const parseRes=await response.json();
            if(parseRes.message==='OTP Verified'){
              setMessage(parseRes.message);
              setTimeout(()=>{
                navigate(`/resetpassword/${registeredEmail}`);
              },2000)
            }
            else {
                setMessage(parseRes.message);
                setTimeout(()=>{
                    setMessage('');
                  },2000)
        
            }
        }
        catch(err)
        {
        console.log(err);
        setMessage('Something went wrong!!');
        }
        
        
            }
            
    return(
        <div className='bg-white h-screen flex justify-center items-center'>
        <div className={`w-1/2 ${hidden?'h-2/3':'h-1/2'} shadow md:w-4/5`}>
    <h1 className='p-8 text-2xl font-pat font-bold text-blue text-center md:text-sm '>Enter your registered email</h1>
        <div className='m-4'>
        <label className='mb-2 text-lg text-main font-pat font-bold md:text-xs'>Email</label>
        <input value={registeredEmail} onChange={(e)=>setRegisteredEmail(e.target.value)}  className="px-3 py-3  text-main relative bg-white file:rounded-full file:text-xs rounded file:hover:cursor-pointer text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="text" name="email" placeholder='abc123@gmail.com' />
        </div>
        {hideOTP && <div className='mx-4 mt-10 md:mt-4'>
        <label className='mb-2 text-lg text-main font-pat font-bold md:text-xs'>OTP</label>
        <input  value={otp} onChange={(e)=>setOtp(e.target.value)} className="px-3 py-3  text-main relative bg-white file:rounded-full file:text-xs rounded file:hover:cursor-pointer text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="text" name="otp" placeholder='XXXXX' />
        </div>}
        {hideOTP && <div className='m-4 '><h1 className={`text-center text-${message==='OTP has been sent to your email for verification.' || message==='Password Updated Successfully'?'green':'red'} md:text-xs`}> {message}</h1></div>}
        
        <div className='mx-4 mt-10 md:mt-5'>
        {!hidden && <button onClick={handleClick} className="bg-blue font-pat  hover:bg-d-blue font-bold p-4 w-full text-white text-sm md:text-xs rounded-lg">Send OTP</button>}
        {hidden && <button onClick={handleVerify} className="bg-blue font-pat  hover:bg-d-blue font-bold p-4 w-full text-white text-sm md:text-xs rounded-lg">Verify</button>}
        </div>
        </div>
        
        </div>
    )
}