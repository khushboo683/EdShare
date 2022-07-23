import React from 'react'
import { useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";
export default function Welcome()
{
    const navigate=useNavigate();
    return(
        <div className='bg-white h-screen'>
        <div className='grid grid-cols-2 md:grid-cols-1 '>
        
        <div className=' mt-52'>
        <h1 className='ml-40 md:ml-10 text-main font-pat font-bold md:text-5xl text-6xl'>Welcome to EdShare</h1>
        <h1 className=' ml-24 md:ml-10 md:text-2xl text-3xl text-main font-pat font-bold my-10'>A platform built for you to <span className=' inline-block ml-2 text-4xl text-d-blue text-center font-pat font-extrabold'><Typewriter

        options={{
          strings: ['Share','Read', 'Save'],
          autoStart: true,
          loop: true,
        }}
        /></span> documents!</h1>
        <h1 className='ml-20 md:mx-2 mt-20 mb-8 text-xl text-center text-main font-pat font-bold'>Start your sharing journey right away. Explore documents shared by people from around the world!</h1>
        <div className='text-center md:ml-0 ml-20'><button onClick={()=>navigate('/home')} className='rounded-lg px-4 py-2 bg-blue text-white hover:bg-d-blue'>Explore</button>
        </div>
        </div>
        <div className='h-2/3 mt-20'> <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_suoaboye.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player></div>
        </div>
        </div>
    )
}