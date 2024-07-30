import React from 'react'
import './Feed.css'
import Post from '../post/Post'
import Follower from '../follower/Follower'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getFeedData } from '../../redux/slices/feedSlice'
function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData)
  useEffect(() => {
      dispatch(getFeedData());
    },[dispatch]) 
  return (
    <div className='Feed'>
      <div className="container">
        <div className="leftPart">
          {feedData?.posts?.map(post => <Post key={post._id} post={post} />)}

        </div>
        <div className="rightPart">
          <div className='following card'>
            <h3 className='title'>You Are Following</h3>            
            {feedData?.followings?.map(user=><Follower key={user._id} user={user}/>)}
          </div>
          <div className='Suggestions card'>
            <h3 className='title'>Suggested For You</h3>
            {feedData?.suggestions?.map(user=><Follower key={user._id} user={user}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed