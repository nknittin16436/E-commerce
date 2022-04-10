import React, { Fragment,useState,useEffect,useRef } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import {useNavigate} from 'react-router-dom'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, clearErrors, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";

import MetaData from '../layout/MetaData'
const UpdateProfile = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();
  const registerTab = useRef(null);

  const { user } = useSelector((state) => state.user);

  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)       
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("./Profile.png");

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    // console.log("Sign Up Form Submitted");

    dispatch(updateProfile(myForm));
  };


  const updateDataChange = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {

    if(user){
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url)
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
        alert.success("Profle Updated Succesfully");
        dispatch(loadUser());
      navigate('/account');


      dispatch({
          type:UPDATE_PROFILE_RESET
      })
    }
  }, [dispatch, error, alert,isUpdated,user, navigate]);

  return (
   <Fragment>
{loading?<Loader/> :
  <Fragment>
    <MetaData title={`Update Profile`}/>
  <div className="updateProfileContainer">
    <div className="updateProfileBox">
        <h2 className="updateProfileHeading">Update Profile</h2>
      <form
        className="updateProfileForm"
        ref={registerTab}
        encType="multipart/form-data"
        onSubmit={updateSubmit}
        >
        <div className="updateProfileName">
          <InsertEmoticonIcon />
          <input
            type="text"
            placeholder="Name"
            required
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="updateProfileEmail">
          <MailOutlineIcon />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={(e)=>setName(e.target.value)}
            />
        </div>
        <div id="updateProfileImage">
          <img src={avatarPreview} alt="Avatar Preview" />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={updateDataChange}
            />
        </div>
        <input type="submit" value="Update" className="updateProfileBtn" />
      </form>
    </div>
  </div>
</Fragment>
  }
   </Fragment>
  
  )
};

export default UpdateProfile;
