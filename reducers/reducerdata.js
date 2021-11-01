
const initState = {
    datacomment:[],
    loading:true
}

export const reducer = (state = initState,action)=>{
    if(action.type=="ADD_DATACM"){
         return {
             ...state,
             data:action.payload
         }
    }
    if(action.type=="SET_LOADINGCM"){
        return {
            ...state,
            loading:action.payload
        }
    }
    
    return state
}


