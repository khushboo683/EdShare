export const savedDocsReducer = (state, action) => {
    switch (action.type) {
      case 'fetchSavedDocs':
        return {...state,
          savedDocuments:[action.payload.map((c)=>c)]}
      case 'add_to_saved':
        return {...state,
           savedDocuments: [...state.savedDocuments,{...action.payload}] }
        case "remove_from_saved":
          return {
            ...state,
            savedDocuments: state.savedDocuments.filter((c) => c._id !== action.payload._id),
          };
      default:
        return state;
    }
  };
  
  export const myNotesReducer = (state, action) => {
    switch (action.type) {
      case 'fetchmynotes':
        return {...state,
          my_notes:[...state.my_notes,{...action.payload}]}
    case 'delete':
          return{
          ...state,
          my_notes: state.my_notes.filter((c) => c._id !== action.payload._id)
          }
          case 'add':
            return {...state,
               my_notes: [...state.my_notes,{...action.payload}] }
      default:
        return state;
    }
  };
  
  export const homeReducer = (state, action) => {
    switch (action.type) {
      case 'fetchhomenotes':
        return {...state,
          homeNotes:[...state.homeNotes,{...action.payload}]}
          case 'delete_from_home':
          return{
          ...state,
          homeNotes: state.homeNotes.filter((c) => c._id !== action.payload._id)
          }
          case 'add_to_home':
            return {...state,
               homeNotes: [...state.homeNotes,{...action.payload}] }
      default:
        return state;
    }
  };
  export const reducer = (state, action) => {
    switch (action) {
      case 'toggle':
        return  !state 
      default:
        return state
    }
  };