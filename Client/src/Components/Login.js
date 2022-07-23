import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Login({isAuthenticated,setIsAuthenticated,setId,getData1,getData2,getData3,setAllPdfs,setCheck1,setCheck2,setCheck3,setSavedDocs,setMynotes,check1,check2,check3})
{


    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[message,setMessage]=useState('')
    
    const handleLogin=async()=>{
        console.log('clicked')
          
        try{
            if(!(username===''||password===''))
            {
            const body={email:username,password:password};
            
            const response= await fetch("https://edshareback.herokuapp.com/login", {
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
           // const response = await axios.post('https://edshareback.herokuapp.com/adduser', body);
            const parseRes=await response.json();
            console.log(parseRes)
            if(parseRes.message==="User is not verified.Verify your account using OTP")
            {
                setTimeout(()=>{
                    navigate(`/registerverify/${username}`);
                },2000)
            }
            else if(parseRes.message==="login"){
            setMessage('You are logged in, welcome!')
            setId(username)
          //  console.log(username);
            setIsAuthenticated(true);
            const data1 = await getData1(username);
            const data2 =await getData2(username);
            const data3=await getData3();
             console.log(data1);
            // console.log(data2)
             setSavedDocs(data1);
             setMynotes(data2)
             setAllPdfs(data3)
             if(check1===0){
             setCheck1(1);
             }
             if(check2===0){
              setCheck2(1);
              }
              if(check3===0)
              setCheck3(1);
            console.log(message);
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
              }
            //   return response.data;
            //   setChange(true);
            //   window.location.reload(false);
            setTimeout(()=>{
                navigate(`/home`);
            },2000)
            
            }
            else{
            //   setChange(true);
            
            setMessage('Incorrect email or password')
            setTimeout(()=>{
            setMessage('');
            },5000)
            }
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
    const navigate=useNavigate();
    const handleClickRegister=()=>{
        navigate('/register');
    }
    const handleClickForgotPassword=()=>{
        navigate('/forgotpassword');
            }
    return(
        <div id="homeId" className="bg-white h-screen   ">
        { <div className='mt-20'><h1 className={`text-center font-pat font-bold text-xl ${message==='You are logged in, welcome!'?'text-green':'text-red'}`}>{message}</h1></div>}
        <div className='grid h-screen md:grid-cols-1 grid-cols-2 items-center '>
        <div className='h-1/2 '>
  <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_2h9zxa42.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player>
  </div>
        <div className='text-blue md:m-0  md:ml-4 md:px-3.5 my-4 md:p-5 md:-translate-y-12  h-96 mr-10'>
  <div>
  
  <h1 className='text-4xl md:text-2xl sm:text-2xl  text-center md:mx-4 md:p-0 font-pat font-bold'>Login To Your Account</h1>
  </div>
 
  <div className='text-5xl md:text-2xl md:text-center text-center font-pat font-bold text-blue my-8'>
  
  
  <div className='mx-8 my-10'>
  <input value={username} onChange={(e)=>setUsername(e.target.value)} className="px-3 py-3 font-bold text-main relative bg-white  rounded text-sm  shadow outline-none focus:outline-none focus:ring w-full" type="text" name="username" placeholder="username" />
  </div>
  <div className='mx-8 my-10'>
  <input value={password} onChange={(e)=>setPassword(e.target.value)} className="px-3 py-3 font-bold text-main relative bg-white  rounded text-sm  shadow outline-none focus:outline-none focus:ring w-full" type="password" name="password" placeholder="password" />
  </div>
  <h1  className='text-center  text-sm mb-4 underline flex justify-between text-blue'><span className="ml-9 hover:cursor-pointer hover:text-d-blue" onClick={handleClickRegister}>Don't have an account?</span><span className="hover:cursor-pointer mr-9 hover:text-d-blue" onClick={handleClickForgotPassword}>Forgot password?</span></h1>
  <div className='mx-8  mt-4'>
  <button onClick={handleLogin} className="bg-blue hover:bg-d-blue font-bold p-4 w-full text-white text-sm rounded-xl hover:-translate-y-1 hover:ease-linear hover:transition-all hover:duration-150 ">Login</button>
  </div>
  
  
  </div>
 

  </div>
  
  
        </div>
        </div>
    )
}