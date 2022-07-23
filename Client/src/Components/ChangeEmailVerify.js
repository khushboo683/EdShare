import React,{useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
export default function ChangeEmailVerify()
{
    const[otp,setOtp]=useState('')
    const[hideOTP,setHideOTP]=useState(false)
    const[message,setMessage]=useState('')
    const navigate=useNavigate();
    // const isOTPcorrect=true;
    let { id } = useParams();

//     const handleClick=()=>{
// // setHidden(true);
// setHideOTP(true);
//     }
    const handleVerify=async()=>{
        console.log(id);
        // setHidden(false);
        try{
            const response= await fetch("https://edshareback.herokuapp.com/checkotp", {
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify({otp:otp,email:id})
            });
           // const response = await axios.post('https://edshareback.herokuapp.com/adduser', body);
            const parseRes=await response.json();
            console.log(parseRes)
            if(parseRes.message==="OTP Verified"){
            setMessage(parseRes.message)
            // setOtp('')
            console.log(message);
            setTimeout(()=>{
                navigate('/login');
            },3000)
          
            
        }else{
            navigate('/register');
        }
       
        
        
        
            }
            catch(err){
                console.log(err)
            }
        }
            
    return(
        <div className='bg-white h-screen flex justify-center items-center'>
        <div className='w-1/2 h-1/2 shadow md:w-4/5'>
    <h1 className='p-8 text-xl font-pat font-bold text-blue text-center md:text-sm '>Verify your account by entering the OTP sent to your new  email address.</h1>
        
        { <div className='mx-4 mt-10 md:mt-4'>
        <label className='mb-2 text-lg text-main font-pat font-bold md:text-xs'>OTP</label>
        <input onChange={(e)=>setOtp(e.target.value)} className="px-3 py-3  text-main relative bg-white file:rounded-full file:text-xs rounded file:hover:cursor-pointer text-xs  shadow outline-none focus:outline-none focus:ring w-full" type="text" name="otp" placeholder='XXXXX' />
        </div>}
        {message && <div className='m-4 '><h1 className={`text-center text-${message==='Incorrect OTP'?'red':'green'} md:text-xs`}> {message}</h1></div>}
        
        <div className='mx-4 mt-10 md:mt-5'>
        {<button onClick={handleVerify} className="bg-blue font-pat  hover:bg-d-blue font-bold p-4 w-full text-white text-sm md:text-xs rounded-lg">Verify</button>}
        
        </div>
        </div>
        
        </div>
    )
}