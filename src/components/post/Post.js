import {React, useEffect} from 'react'
import Avatar from '../avatar/Avatar'
import "./Post.css"
import dummyImage from "../../asserts/images/dummyimage.jpg"
import { FaRegHeart ,FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { likeAndUnlikePost } from '../../redux/slices/postSlice';
import { useNavigate,useParams } from 'react-router-dom';
import { getUserProfile } from '../../redux/slices/postSlice';
import { TOAST_SUCCESS } from '../../App';
import {showToast} from "../../redux/slices/appConfigSlice"
function Post({post}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(()=>{
        dispatch(getUserProfile({
          userId:params.userId
        }));
      },[]);
    async function handlePostLike(){
        dispatch(showToast({
            type:TOAST_SUCCESS,
            message:'Liked or Unliked'
        }))
        dispatch(likeAndUnlikePost({
            postId: post._id,
        }))
    }
  return (
    <div className='Post'>
        <div className='heading' onClick={()=> navigate(`/profile/${post.owner._id}`)}>
            <Avatar src={post?.owner?.avatar?.url} alt={dummyImage}/>
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className='content'>
            <img className="Image" src={post?.image?.url} alt=""/>
        </div>
        <div className='footer'>
            <div className="Like" onClick={handlePostLike}>
                {post.isLiked? <FaHeart style={{color:"red"}} className='icon' /> : <FaRegHeart className='icon' />}
                
                <h4> {`${post?.likesCount} Likes`}</h4>
            </div>
            <p className='caption'>{post?.caption}</p>
            <h6 className='timeAgo'>{post?.timeAgo}</h6>
        </div>
    </div>
  )
}

export default Post