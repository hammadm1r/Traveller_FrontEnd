import React, { useEffect ,useState } from 'react'
import './UpdateProfile.css';
import proDummyImg from "../../asserts/images/user.png"
import { useSelector,useDispatch } from 'react-redux';
import { updateMyProfile } from '../../redux/slices/appConfigSlice';

function UpdateProfile() {
  const myProfile = useSelector((state)=> state.appConfigReducer.myProfile);
  const [name, setName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [bio, setBio] = useState('');
  const dispatch = useDispatch();
  useEffect(()=>{
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url);
  },[myProfile]);
  function handleImageChange(e){
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
      if(fileReader.readyState === fileReader.DONE){
        setUserImg(fileReader.result)
        console.log('img data' , fileReader.result);
      }
    }
  }
  function handleSubmit(e){
    e.preventDefault();
    dispatch(updateMyProfile({
      name,
      bio,
      userImg
    }));
  }

  return (
    <div className='UpdateProfile'>
      <div className="Container" style={{paddingTop: "20px"}}>
        <div className="left-part">
          <div className="input-user-image">
            <label htmlFor="inputImg" className='labelImg-Pro'><img src={userImg || proDummyImg} alt={name} className = "userImg"/></label>
            <input type="file" accept="image/*" id="inputImg" className='inputImg' onChange={handleImageChange}/>
          </div>
        </div>
        <div className="right-part">
          <form>
            <input value={name} type="text" placeholder='Your Name'  onChange={(e)=> setName(e.target.value)}/>
            <input value={bio} type="text" placeholder='Your Bio' onChange={(e)=> setBio(e.target.value)} />
            <input type="submit" className='btn-primery'onClick={handleSubmit} />
          </form>
          <button className='delete-account'>Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile