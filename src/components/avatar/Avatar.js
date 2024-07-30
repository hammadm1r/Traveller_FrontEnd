import React from 'react';
import './avatar.css'
import userImg from '../../asserts/images/user.png'

function Avatar({src}) {
  return (
    <div className="Avatar">
        <img className='userAvatar' src={src? src : userImg} alt="user Avatar" />
    </div>
  )
}

export default Avatar