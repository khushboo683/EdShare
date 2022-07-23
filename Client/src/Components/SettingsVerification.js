import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
export default function SettingsVerification()
{
    const navigate=useNavigate();
    const[password,setPassword]=useState('');
    const handleClickForgotPassword=()=>{
        navigate('/forgotpassword');
            }
            const allowForSettings=()=>{
                navigate('/settings')
            }
    return(
        <div className='bg-white h-screen flex justify-center items-center'>
        <div className='w-1/2 h-1/3 shadow md:w-4/5'>
    <h1 className='p-4 text-2xl font-pat font-bold text-blue text-center md:text-sm '>Enter your password</h1>
        <div className='m-4'>
        <label className='mb-2 text-lg text-main font-pat font-bold md:text-xs'>Password</label>
        <input onChange={(e)=>{setPassword(e.target.value)}} className="px-3 py-3  text-main relative bg-white file:rounded-full file:text-xs rounded file:hover:cursor-pointer text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="password" name="email" placeholder='XXXXXXXXXX' />
        </div>
        <div onClick={handleClickForgotPassword} className='m-4'><h1 className='text-center hover:cursor-pointer font-pat font-bold text-blue underline hover:text-d-blue'>Forgot password?</h1></div>
        
        
        
        <div className='mx-4 mt-4 md:mt-5'>
        
        { <button onClick={allowForSettings}  className="bg-blue font-pat  hover:bg-d-blue font-bold p-4 w-full text-white text-sm md:text-xs rounded-lg">Okay</button>}
        </div>
        </div>
        
        </div>
        
        
    )
}