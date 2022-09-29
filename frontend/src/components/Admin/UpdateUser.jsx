import React, { Fragment, useEffect, useState } from 'react'
import './NewProduct.css';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import Sidebar from './Sidebar';
import MetaData from '../../components/layout/MetaData';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstant';
import { getUserDetails, updateUser, clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (user && user._id !== id) {

            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User updated Succesfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, id, updateError, user]);


    const createUserUpdateHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(id, myForm));
    };


    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {
                        loading ?
                            <Loader /> :

                            <form
                                className="createProductForm"
                                encType="multipart/form-data"
                                onSubmit={createUserUpdateHandler}
                            >
                                <h1>Update User</h1>

                                <div>
                                    <PersonIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <MailOutlineIcon />
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <VerifiedUserIcon />
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Choose Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <Button
                                    id="createProductBtn"
                                    type="submit"
                                    disabled={updateLoading ? true : false || role === "" ? true : false}
                                >
                                    Update
                                </Button>
                            </form>
                    }
                </div>
            </div>

        </Fragment>
    )
}
export default UpdateUser
