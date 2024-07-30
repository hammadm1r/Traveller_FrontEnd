import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosClient} from "../../utils/axiosClient"
import { setLoading } from "./appConfigSlice";
export const getFeedData = createAsyncThunk("user/getFeedData",async () =>{
    try {
        
        const response = await axiosClient.get("/user/getFeedData");
        console.log('userProfile',response);
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
});
export const followAndUnfollowUser = createAsyncThunk('user/followAndUnfollow',async(body)=>{
    try {
        const response = await axiosClient.post("/user/follow",body);
        return response.result.user;
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

const feedSlice = createSlice({
    name: "feedSlice",
    initialState:{
        feedData:{}
    },
    extraReducers: (builder) =>{
        builder.addCase(getFeedData.fulfilled,(state,action) =>{
            state.feedData = action.payload;
    })
    .addCase(likeAndUnlikePost.fulfilled,(state,action)=>{
        const post = action.payload;
        console.log('Like Post');
        const index = state.feedData.posts.findIndex(item => item._id === post._id);
        if( index != -1){
            state.feedData.posts[index]= post;
        }
    })
    .addCase(followAndUnfollowUser.fulfilled,(state,action)=>{
        const user = action.payload;
        const Index = state?.feedData?.followings.findIndex(item => item._id == user._id)
        if(Index != -1){
            state?.feedData.followings.splice(Index,1);
        }
        else {
            state?.feedData.followings.push(user);
        }

    })

}
})


export default feedSlice.reducer;
