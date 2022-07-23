import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
export default function PasswordConfirm()
{
    const[message,setMessage]=useState('Your password has been reset')
    const[hidden,setHidden]=useState(true);
    const navigate=useNavigate();
    const isPassConfirmed=true;
    const handleResetPassword=async()=>{
        setHidden(false);
        try{
            const res=await fetch('https://edshareback.herokuapp.com/sendotpsecemail',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                // body:JSON.stringify({email:id,secemail:newEmail})
            })
        
        }
        catch(err)
        {
            console.log(err);
        }

    }
    return(
        <div className='bg-white h-screen flex justify-center items-center'>
        <div className='w-1/2 h-1/2 shadow md:w-4/5'>
    <h1 className='p-4 text-2xl font-pat font-bold text-blue text-center md:text-sm '>Please enter your password</h1>
        <div className='m-4'>
        <label className='mb-2 text-lg text-main font-pat font-bold md:text-xs'>Password</label>
        <input className="px-3 py-3  text-main relative bg-white file:rounded-full file:text-xs rounded file:hover:cursor-pointer text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="text" name="password" placeholder='******' />
        </div>
        <div className='mx-4 mt-10 md:mt-4'>
        <label className='mb-2 text-lg text-main font-pat font-bold md:text-xs'>Confirm Password</label>
        <input className="px-3 py-3  text-main relative bg-white file:rounded-full file:text-xs rounded file:hover:cursor-pointer text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="text" name="confirmpassword" placeholder='******' />
        </div>
        {!hidden && <div className='m-4 '><h1 className={`text-center text-${message==='OTP sent'?'green':'red'} md:text-xs`}>{message}</h1></div>}
  
        <div className='mx-4 mt-10 md:mt-5'>
        <button onClick={handleResetPassword} className="bg-blue font-pat md:h-6 hover:bg-d-blue font-bold p-4 w-full text-white text-sm md:text-xs rounded-lg">Reset</button>
        </div>
        </div>
        
        </div>
    )
}