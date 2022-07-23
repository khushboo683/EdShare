import { createContext,useReducer,useContext, useEffect } from "react";
import { savedDocsReducer,myNotesReducer,homeReducer,reducer } from './Reducer'
// import axios from 'axios'

const SavedDocs=createContext();
const Context=({children,id,mode,savedDocs,mynotes,homenotes,isAuthenticated,setIsAuthenticated,check1,setCheck1,check2,setCheck2,check3,setCheck3})=>{
  // console.log(savedDocs)
   console.log(check3)
    console.log(homenotes)

    const initialState = mode;
    
    const [modestate, modedispatch] = useReducer(reducer,initialState)

    const [state, dispatch] = useReducer(savedDocsReducer, {
        savedDocuments:[],
      
      });
      const [myNotesState, mynotesDispatch] = useReducer(myNotesReducer, {
        my_notes:[]
      
      });
      const [homeState, homeDispatch] = useReducer(homeReducer, {
        homeNotes:[]
      
      });
     
      console.log(state)
      console.log(myNotesState)
      console.log(homeState)
      
      useEffect(()=>{
        console.log(id)
        try{
         if(check1===1)
         {
          for(let i=0;i<savedDocs.length;i++){
          dispatch({
            type:'add_to_saved',
            payload:savedDocs[i]
          })
        }
          setCheck1(2);
      }
    }
      catch(err){
          console.log(err);
      }
      },[check1])
      useEffect(()=>{
        console.log(id)
        try{
         if(check2===1)
         {
          for(let i=0;i<mynotes.length;i++){
            mynotesDispatch({
              type:'fetchmynotes',
              payload:mynotes[i]
            })
            
          }
         
          setCheck2(2);
      }
    }
      catch(err){
          console.log(err);
      }
      },[check2])

      useEffect(()=>{
        console.log(id)
        try{
         if(check3===1)
         {
          for(let i=0;i<homenotes.length;i++){
            homeDispatch({
              type:'fetchhomenotes',
              payload:homenotes[i]
            })
            
          }
         
          setCheck2(2);
      }
    }
      catch(err){
          console.log(err);
      }
      },[check3])

    return <SavedDocs.Provider value={{ state, dispatch , myNotesState, mynotesDispatch, homeState, homeDispatch}}>{children}</SavedDocs.Provider>
}

  
export default Context;
export const DocsState = () => {
  return useContext(SavedDocs);
};