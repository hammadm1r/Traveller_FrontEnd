import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosClient} from "../../utils/axiosClient"
import { setLoading } from "./appConfigSlice";
export const getUserProfile = createAsyncThunk("user/getUserProfile",async () =>{
    try {
        const response = await axiosClient.post("/user/getUserProfile");
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
});

export const likeAndUnlikePost = createAsyncThunk('post/likeAndUnlike', async (body) => {
    try {
        const response = await axiosClient.post("/posts/like", body);
        return response.result.post;
    } catch (error) {
        return Promise.reject(error);
    }
})


const postsSlice = createSlice({
    name: "postsSlice",
    initialState:{
        UserProfile:{}
    },
    extraReducers: (builder) =>{
        builder.addCase(getUserProfile.fulfilled,(state,action) =>{
            state.UserProfile = action.payload;
    })
    .addCase(likeAndUnlikePost.fulfilled,(state,action)=>{
        const post = action.payload;
        const index = state?.UserProfile?.posts?.findIndex(item => item._id === post._id);
        if( index !== -1){
            state.UserProfile.posts[index]= post;
        }
    }
)
}
})


export default postsSlice.reducer;
