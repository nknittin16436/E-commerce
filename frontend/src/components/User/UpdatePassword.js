import React, { Fragment, useState, useEffect, useRef } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";

import MetaData from '../layout/MetaData'

const UpdatePassword = () => {


  let navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();
  const registerTab = useRef(null);


  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldPassword",oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword",confirmPassword);

    // console.log("Sign Up Form Submitted");

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated Succesfully");
      navigate('/account');


      dispatch({
        type: UPDATE_PASSWORD_RESET
      })
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title={`Update Password`} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>
              <form
                className="updatePasswordForm"
                ref={registerTab}
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input type="submit" value="Change" className="updatePasswordBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  )
}

export default UpdatePassword