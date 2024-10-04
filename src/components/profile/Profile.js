import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import './Profile.css'
import proDummyImg from "../../asserts/images/user.png"
import { useNavigate, useParams } from 'react-router-dom';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postSlice'
import { getFeedData } from '../../redux/slices/feedSlice';

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  
  
  const userProfile = useSelector(state => state.postsReducer.UserProfile);
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);
  const feedData = useSelector(state => state.feedDataReducer.feedData);
  const dispatch = useDispatch();
  const [isMyProfile,setIsMyProfile] = useState(false);
  const [isFollowing,setIsFollowing] = useState(false);
  useEffect(()=>{
    
    dispatch(getUserProfile({
      userId:params.userId
    }));
    dispatch(getFeedData({
      userId:params.userId
    }));
    setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(feedData?.followings?.find((item) => item._id === params.userId ));
  },[]);
  function handleUserFollow(){
    dispatch(followAndUnfollowUser({userIdToFollow:params.userId}))
  };
  return (
    <>
    <div className="Profile">
      <div className="container">
      <div className="leftPart">
          {isMyProfile && <CreatePost />}
          {userProfile?.posts?.map(post => <Post  key={post._id} post={post}/> )}
      </div>
      <div className="rightPart">
        <div className="profile-card">
          <img className="UserImg" src={userProfile?.avatar?.url || proDummyImg} alt='U' />
          <h3 className='userName'>{userProfile?.name}</h3>
          <p>{userProfile?.bio}</p>
          <div className="followerInfo">
            <h4>{`${userProfile?.followers?.length} Followers`}</h4>
            <h4>{`${userProfile?.followings?.length} Followings`}</h4>
          </div>
          {!isMyProfile &&
          <h5 onClick={handleUserFollow} className={isFollowing? "btn-unfollow hover-link follow-link" : "btn-follow"}>{isFollowing? "Unfollow" : "Follow"}</h5>
          }
          {isMyProfile &&
          <button className='update-profile btn-secondry' onClick={()=>{navigate('/updateProfile')}}>Update Profile</button>}
        </div>
      </div>
      </div>
    </div>
        </>
  )
}

export default Profile