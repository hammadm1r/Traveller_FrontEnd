import React, { useState } from 'react'
import './CreatePost.css'
import Avatar from '../avatar/Avatar'
import backgroundDummyImg from "../../asserts/images/dummyimage.jpg"
import {BsCardImage} from 'react-icons/bs'
import { axiosClient } from '../../utils/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/slices/appConfigSlice'
import { getUserProfile } from '../../redux/slices/postSlice'
function CreatePost() {
    const dispatch = useDispatch();
    const [postImg,setPostImg] = useState('');
    const [caption,setCaption] = useState('');
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
      if(fileReader.readyState === fileReader.DONE){
        setPostImg(fileReader.result)
        console.log('img data' , fileReader.result);
      }
    }
    }
    const handlePostSubmit = async() => {
        try{
            const result = await axiosClient.post("/posts",{
                caption,
                postImg,
            });
            console.log("post Done" , result);
            dispatch(getUserProfile({
                userId: myProfile?._id
            }));
        }catch (error) {
            console.log(error);
        }finally{
            setCaption('');
            setPostImg('');
        }  
    }
  return (
    <div className='createPost'>
        <div className="left-Part-CP">
            <Avatar src={myProfile?.avatar?.url}/>
        </div>
        <div className="right-Part-CP">
            <input value={caption} type="text" className='captionInput' placeholder="What's on your mind?" onChange={(e) => setCaption(e.target.value)} />

            {postImg &&
            <div className="imgContainer">
                <img className='postImg' src={postImg} alt="Post Image" />
            </div>
}
            <div className="bottomPart">
                <div className="input-post-img">
                <label htmlFor="inputImg" className='labelImg'>
                <BsCardImage />
                </label>
                <input type="file" accept="image/*" id="inputImg" className='inputImg' onChange={handleImageChange}/>
                </div>
                <button className='postBtn btn-primery' onClick={handlePostSubmit}>Post</button>
            </div>
            
        </div>

    </div>
  )
}

export default CreatePost