import React,{useState,useEffect} from 'react'
import Header from './Components/Header'
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import RegisterVerify from './Components/RegisterVerify'
import Settings from './Components/Settings'
// import SettingsVerification from './Components/SettingsVerification'
import Homeuser from './Components/Homeuser'
import ChangeEmailVerify from './Components/ChangeEmailVerify'
import Footer from './Components/Footer'
import AddNote from './Components/AddNote'
import MyNotes from './Components/Mynotes'
import Document from './Components/Document'
import Home from './Components/Home'
import EditDocument from './Components/EditDocument'
import SavedNotes from './Components/SavedNotes'
import PasswordConfirm from './Components/PasswordConfirm'
import Context from './Components/context/Context';

import ViewProfile from './Components/ViewProfile'
import Welcome from './Components/Welcome'
import axios from 'axios'
// import Modal from './Components/Modal'
// import Dropdown from './Components/Dropdown'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import FormDialog from './Components/sample'

export default function App()
{
  // const getCurrentUser = () => {
  //   return JSON.parse(localStorage.getItem("user"));
  // };
  const[dropdown,setDropdown]=useState(false);
  // const[mode,setMode]=useState('dark');
  const[isAuthenticated,setIsAuthenticated]=useState(false);
  const[mynotes,setMynotes]=useState([])
  const[savedDocs,setSavedDocs]=useState([]);
  const[allPdfs,setAllPdfs]=useState([]);
  const[userdetails,setUserDetails]=useState({});
  const [id,setId]=useState("");
  const [check1,setCheck1]=useState(0)
  const [check2,setCheck2]=useState(0)
  const [check3,setCheck3]=useState(0)
  const getCurrentUser =async () =>{
    //console.log("check");
    //console.log(setIsAuthenticated);
    try{
      const response=await fetch("https://edshareback.herokuapp.com/check", {
        method: "POST",
        headers: {
          Authorization : "Bearer " +localStorage.token
        }
      });
      const parseRes = await response.json();
      
    console.log(parseRes);
    if(localStorage.getItem("token")){
        
        console.log(parseRes.decoded.email);
        setId(parseRes.decoded.email);
        const data1 = await getData1(parseRes.decoded.email);
        const data2 =await getData2(parseRes.decoded.email);
        const data3=await getData3();
        const data4= await getData4(parseRes.decoded.email)
         console.log(data1);
        // console.log(data2)
         setSavedDocs(data1);
         setMynotes(data2)
         setAllPdfs(data3)
         setUserDetails(data4)
         if(check1===0){
         setCheck1(1);
         }
         if(check2===0){
          setCheck2(1);
          }
          if(check3===0)
          setCheck3(1);
      setIsAuthenticated(true);
    }
    else{
        
        setIsAuthenticated(false);
        
    }
      
    }catch(err){
      
      console.log(err.message)
      return false;
    }
  };
  async function getData2(email) {
    const data = await axios.get(`https://edshareback.herokuapp.com/getallpdf/${email}`)
        .then(promise => {
            return promise.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }
  async function getData1(email) {
    const data = await axios.get(`https://edshareback.herokuapp.com/getsavedoc/${email}`)
        .then(promise => {
            return promise.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }
  async function getData3() {
    const data = await axios.get(`https://edshareback.herokuapp.com/gethomepdfs`)
        .then(promise => {
            return promise.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }
  async function getData4(email) {
    const data = await axios.get(`https://edshareback.herokuapp.com/userdetails/${email}`)
        .then(promise => {
            return promise.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }
  useEffect(async() => {
    const pathname = window.location.pathname;
    
    console.log(pathname);
  
    if(localStorage.getItem("token") !== null){
        console.log(localStorage.getItem("token"));

        const check= getCurrentUser();
        
        console.log(check);
       // checkLogin();
       
        console.log(id);
       
        
   }
   
   return () => {
    
    setIsAuthenticated(false);
    
    setId("");
  };
  },[]);
  
  
const[searchTerm,setSearchTerm]=useState('');
const[searchResults,setSearchResults]=useState([]);
  
    const searchHandler = (searchTerm) => {
      setSearchTerm(searchTerm);
      console.log('worked!!!')
      console.log(searchTerm);
      if (searchTerm !== "") {
        const newProductList = allPdfs.filter((row) => {
            console.log(Object.values(row.title).join("").toLowerCase());
            console.log(searchTerm.toLowerCase());
          return Object.values(row.title)
            .join("")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
        setSearchResults(newProductList);
    console.log(newProductList)
        
    
        console.log(searchResults);
      } else {
        setSearchResults(allPdfs);
        console.log(allPdfs);
      }
    };
  
  
  

return(
  <div>
  <Context id={id} check1={check1} mode={userdetails.private_profile} setCheck1={setCheck1} homenotes={allPdfs} check2={check2} setCheck2={setCheck2} check3={check3} setCheck={setCheck3}  savedDocs={savedDocs} mynotes={mynotes} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
  <Router>
  <Header isAuthenticated={isAuthenticated}  searchKeyWord={searchHandler} setIsAuthenticated={setIsAuthenticated} id={id} dropdown={dropdown} setDropdown={setDropdown}/>
  

  
  <Routes>
  <Route exact path="/" element={<Welcome />}/>
  <Route exact path="/login" element={<Login isAuthenticated={isAuthenticated} setId={setId} setIsAuthenticated={setIsAuthenticated} getData1={getData1} getData2={getData2} getData3={getData3} setAllPdfs={setAllPdfs} setCheck1={setCheck1} setCheck2={setCheck2} setCheck3={setCheck3} setSavedDocs={setSavedDocs} setMynotes={setMynotes} check1={check1} check2={check2} check3={check3}/>}/>
  <Route exact path="/register" element={<Register/>}/>
  <Route exact path='/profile/:id' element={<Profile id={id} isAuthenticated={isAuthenticated} dropdown={dropdown} setDropdown={setDropdown}/>}/>
  <Route exact path='/viewprofile/:id' element={<ViewProfile userid={id} isAuthenticated={isAuthenticated} dropdown={dropdown} setDropdown={setDropdown}/>}/>
  <Route exact path="/editprofile/:id" element={<EditProfile id={id} dropdown={dropdown} isAuthenticated={isAuthenticated} setDropdown={setDropdown}/>}/>
  <Route exact path="/forgotpassword" element={<ForgotPassword id={id} dropdown={dropdown} setDropdown={setDropdown}/>}/>
  <Route exact path="/resetpassword/:id" element={<ResetPassword dropdown={dropdown} setDropdown={setDropdown}/>}/>
  <Route exact path="/registerverify/:id" element={<RegisterVerify />}/>
  <Route exact path="/document" element={<Document/>}/>
  <Route exact path="/passwordconfirm/:id/:newemail" element={<PasswordConfirm id={id}/>}/>
  <Route exact path="/editdocument/:pdfId" element={<EditDocument id={id}/>}/>
  <Route exact path="/home" element={!isAuthenticated?<Home isAuthenticated={isAuthenticated} searchResults={searchResults} setIsAuthenticated={setIsAuthenticated}/>:<Homeuser id={id} dropdown={dropdown} searchResults={searchResults}  setDropdown={setDropdown} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
  <Route exact path="/savednotes/:id" element={<SavedNotes id={id} dropdown={dropdown}  setDropdown={setDropdown} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
  
  <Route exact path="/settings/:id" element={<Settings id={id} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} dropdown={dropdown} setDropdown={setDropdown}/>}/>
 
  <Route exact path="/addnote" element={<AddNote id={id} dropdown={dropdown} setDropdown={setDropdown}/>}/>
  <Route exact path="/mynotes/:id" element={<MyNotes id={id} dropdown={dropdown}  mynotes={mynotes} setDropdown={setDropdown}/>}/>
  <Route exact path="/changeemailverify/:id" element={<ChangeEmailVerify dropdown={dropdown} setDropdown={setDropdown} />}/>
  
  
 
  </Routes>
  
  </Router>
  </Context>
  <Footer dropdown={dropdown} setDropdown={setDropdown} />
  </div>
 
  
    


    
 
  
)
}