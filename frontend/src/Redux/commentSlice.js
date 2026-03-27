import { createSlice } from "@reduxjs/toolkit"



const commentSlice = createSlice({
    name:"comment",
    initialState:{
        loading:false,
        comment:"",
    },
    reducers:{
        //action
        setLoadingComment:(state,action)=>{
            state.loading = action.payload
        },
        setComment:(state,action)=>{
            state.comment = action.payload
        }
    }
})

export const {setLoadingComment, setComment} = commentSlice.actions;
export default commentSlice.reducer;