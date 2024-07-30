import React from 'react'
import { useEffect,useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.css'
import { useSelector,useDispatch } from 'react-redux'
import { followAndUnfollowUser } from '../../redux/slices/feedSlice'
import { useNavigate } from 'react-router-dom'
function Follower({user}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector(state => state.feedDataReducer.feedData);
  const [isFollowing, setIsFollowing] = useState();
  useEffect(()=>{
    setIsFollowing(feedData.followings.find((item) => item._id === user._id ))
  },[feedData])
  function handleUserFollow(){
    dispatch(followAndUnfollowUser({userIdToFollow:user._id}))
  }
  return (
    <div className='Follower'>
        <div className='userInfo' onClick={()=> navigate(`/profile/${user._id}`)} >
            <Avatar src={user?.avatar?.url} />
            <h4 className='name'>{user?.name}</h4>
        </div>
        <h5 onClick={handleUserFollow} className={isFollowing? "btn-unfollow hover-link follow-link" : "btn-follow"}>{isFollowing? "Unfollow" : "Follow"}</h5>

    </div>
  )
}

export default Follower