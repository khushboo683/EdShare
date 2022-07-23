import React,{useState,useRef,useEffect} from 'react'
import {Link} from 'react-scroll'
import {FaBars} from 'react-icons/fa'
import { CgProfile } from "react-icons/cg";
import { AiFillCaretDown, AiFillCaretUp} from "react-icons/ai"
import { GrLogout} from "react-icons/gr"
import {FcSettings} from 'react-icons/fc'
import {useNavigate,useParams} from 'react-router-dom';
import {AiFillFileAdd} from 'react-icons/ai'
import {ImCross} from 'react-icons/im'
import {MdClose} from 'react-icons/md'
import './search-bar.css'
// import { BsMoonFill, BsFillSunFill } from "react-icons/bs"
// import { GrDocumentNotes } from "react-icons/gr"


export default function Header({isAuthenticated,setIsAuthenticated,id,dropdown,setDropdown,searchKeyWord})
{
    // const[dropdown,setDropdown]=useState(false);
    // const[pathname,setPathname]=useState(window.location.pathname)
    // useEffect(() => {
    //  setPathname(window.location.pathname)
    
      
    // }, [])
    const[open,setOpen]=useState(false);
    const[menu,setMenu]=useState('md:hidden');
    // let {id}=useParams();
    let navigate=useNavigate();
    const handlelogin = () => {
        navigate('/login');
    };
    const handleRegister = () => {
        navigate('/register');
    };
    const handleDropdown= () => {
        if(dropdown===false)
        setDropdown(true)
       else setDropdown(false);
       
    };
    const handleProfile = () => {
        navigate(`/profile/${id}`);
    };
    const handleMyNotes = () => {
        navigate(`/mynotes/${id}`);
    };
    const handleSavedNotes = () => {
        navigate(`/savednotes/${id}`);
    };
    const handleSettings = () => {
        navigate(`/settings/${id}`);
    };
    const handleHome=()=>{
        navigate(`/`)
    }
    console.log(dropdown);
    const handleClick=()=>{
if(menu==='md:hidden')
setMenu('');
else setMenu('md:hidden')
setOpen(true);
console.log(open)
    }
    const handleCross=()=>{
        if(menu==='md:hidden')
setMenu('');
else setMenu('md:hidden')
setOpen(false);
    }
    const handleLogout=()=>{
        if(dropdown===true)
        setDropdown(false);
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setTimeout(()=>{
            navigate('/')
        },2000)
        
    }
    const handleAddNote=()=>{
        navigate('/addnote')
      }
      const inputEl=useRef(null);
      const inputE2=useRef(null);

const getSearchTerm=()=>{
 console.log(inputEl.current.value);

searchKeyWord(inputEl.current.value);
}
const getSearchTerm2=()=>{
    console.log(inputE2.current.value);
   
   searchKeyWord(inputE2.current.value);
   }
    // const pathname=window.location.pathname;
    return(
        <div className={`bg-white  z-50  inset-0 h-16 font-bold fixed w-full  text-main text-lg transition-all duration-100 ease-in-out delay-100`} >
<div className={`flex bg-white transition-all duration-150 ease-in-out delay-150 justify-between items-center p-2 font-pat ${menu!=='md:hidden' && 'flex-col'}`}>
<div className='flex text-2xl ml-2 justify-between w-full'><h1 onClick={handleHome} className='hover:cursor-pointer'>EdShare</h1><span className="flex">{isAuthenticated && <AiFillFileAdd onClick={handleAddNote} className=' mr-4 -translate-y-1 md:flex lg:hidden xl:hidden 2xl:hidden' size={30}/>}{open?<MdClose onClick={handleCross} className={`lg:hidden xl:hidden 2xl:hidden md:flex sm:flex md:mr-2 font-light hover:cursor-pointer `}/>:<FaBars className={`lg:hidden xl:hidden 2xl:hidden md:flex sm:flex md:mr-2 hover:cursor-pointer ${menu}`} onClick={handleClick}/>}</span></div>
{window.location.pathname==='/home' && <div className='search-bar flex text-lg mr-10'><input ref={inputE2} onChange={getSearchTerm2} type='text' placeholder='Enter search query..' className='w-full mx-2 border-b-2 outline-none text-main border-silver-shadow font-pat font-extrabold'></input></div>}


<div className='bg-white' >

<ul className='flex md:hidden sm:hidden bg-white'>

{!isAuthenticated && <li className={`mx-2 bg-white hover:bg-silver-shadow hover:cursor-pointer rounded-md p-2`} onClick={handlelogin} >Login</li>}
{!isAuthenticated && <li className={`mx-2 bg-white hover:bg-silver-shadow hover:cursor-pointer rounded-md p-2`} onClick={handleRegister}> Register</li>}
{isAuthenticated && <li className={`mx-2 bg-white flex  hover:cursor-pointer rounded-md py-2`} onClick={handleAddNote} ><AiFillFileAdd size={30}/></li>}
{isAuthenticated && <li className={`mx-2 bg-white flex hover:cursor-pointer rounded-md p-2`} onClick={handleDropdown} ><CgProfile size={30}/>{dropdown===false?<span className='translate-y-1'><AiFillCaretDown size={20}/></span>:<span className='translate-y-1'><AiFillCaretUp size={20}/></span>}</li>}

</ul>
</div>
    
{dropdown && <div className='z-50 md:hidden mt-12  py-2 bg-white  text-left rounded absolute top-0 right-0'>
<ul className=' border-2 bg-white opacity-100 w-40 h-54 shadow-lg font-pat font-bold mr-4 p-2 text-center rounded-lg'>
<li className='pr-4 py-2 bg-white hover:bg-silver-shadow hover:cursor-pointer rounded-md' onClick={()=>navigate('/home')}>Home</li>
<li className='pr-4 py-2 bg-white hover:bg-silver-shadow hover:cursor-pointer rounded-md' onClick={handleProfile}>Your profile</li>
<li className='pr-4 py-2 bg-white hover:bg-silver-shadow hover:cursor-pointer rounded-md' onClick={handleMyNotes}>Your notes</li>
<li className='pr-4 py-2 bg-white hover:bg-silver-shadow hover:cursor-pointer rounded-md' onClick={handleSavedNotes}>Saved notes</li>
<li className='pr-4 py-2 bg-white hover:bg-silver-shadow hover:cursor-pointer rounded-md' onClick={handleSettings}>Settings</li>

{isAuthenticated && <li onClick={handleLogout} className='pr-4 py-2 flex justify-center hover:bg-silver-shadow hover:cursor-pointer rounded-md'><span className='mr-1'>Logout</span><span className='translate-y-1 ml-1'><GrLogout size={20}/></span></li>}
</ul>

</div>}

</div>
<div className={`lg:hidden bg-white xl:hidden 2xl:hidden shadow-xl md:flex items-start font-pat transition-all duration-100 ease-in-out delay-100 flex-col ${menu}`}>
<ul>

{!isAuthenticated && <li className='mx-2 hover:bg-h-blue rounded-md p-2' onClick={handlelogin}>Login</li>}
{!isAuthenticated && <li className='mx-2 hover:bg-h-blue rounded-md p-2' onClick={handleRegister}>Register</li>}
{isAuthenticated && <li className='mx-2 hover:bg-h-blue rounded-md p-2' onClick={()=>navigate('/home')}>Home</li>}
{isAuthenticated && <li className='mx-2 hover:bg-h-blue rounded-md p-2' onClick={handleProfile}>Your profile</li>}
{isAuthenticated && <li className='mx-2 hover:bg-h-blue rounded-md p-2' onClick={handleMyNotes}>Your notes</li>}
{isAuthenticated && <li className='mx-2 hover:bg-h-blue rounded-md p-2' onClick={handleSavedNotes}>Saved notes</li>}
{isAuthenticated && <li className='mx-2 hover:bg-h-blue rounded-md p-2' onClick={handleSettings}>Settings</li>}
{isAuthenticated && <li onClick={handleLogout} className='mx-2 hover:bg-h-blue rounded-md p-2 flex'><span className='mr-1'>Logout</span><span className='translate-y-1 ml-1'><GrLogout size={20}/></span></li>}



</ul>
</div>
{window.location.pathname==='/home' && <div className='search-bar2 flex text-lg mt-4 ml-20 '><input ref={inputEl} onChange={getSearchTerm} type='text' placeholder='Enter search query..' className='w-2/3 mx-2 border-b-2 outline-none text-main border-silver-shadow font-pat font-extrabold'></input></div>}
</div>


       
    )
}