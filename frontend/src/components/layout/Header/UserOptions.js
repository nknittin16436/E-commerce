import React, { Fragment, useState } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
// import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import Backdrop from '@mui/material/Backdrop';
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import "./Header.css";
import { logoutUser } from "../../../actions/userAction";

const UserOptions = ({ user }) => {


  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}}/>, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardCustomizeIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logout() {
    dispatch(logoutUser());

    alert.success("Succesfully Logged Out");
    navigate('/login');
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction="down"
        className="speedDial"
        // icon={<SpeedDialIcon/>}
        icon={
          <img
            src={user.avatar.url ? user.avatar.url : "./Profile.png"}
            alt="user avatar"
            className="SpeedDialIcon"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
