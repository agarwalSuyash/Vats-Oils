import React, { Fragment, useState } from 'react';
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../images/Profile.png"
import "./Navbar.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';

const UserOptions = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    const moreOptions = [
        { icon: <AddShoppingCartIcon />, name: "Shop", func: shop },
        { icon: <RateReviewIcon />, name: "Blog", func: blog },
        { icon: <ShoppingCartIcon />, name: "Cart", func: cart }
    ];


    if (user && user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }

    function signin() {
        navigate("/login");
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }
    function shop() {
        navigate("/products");
    }
    function blog() {
        navigate("/blog");
    }
    function cart() {
        navigate("/cart");
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user?.avatar?.url ? user?.avatar?.url : profile}
                        alt="Profile"
                    />
                }
            >
                {isAuthenticated === true ? options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 991 ? true : false}
                    />
                )) : <SpeedDialAction
                    key="Sign In"
                    icon={<AccountBoxIcon />}
                    onClick={signin}
                    tooltipTitle="Sign In"
                />
                }
                {window.innerWidth < 991 && moreOptions.map((item) => (<SpeedDialAction
                    key={item.name}
                    icon={item.icon}
                    tooltipTitle={item.name}
                    onClick={item.func}
                    tooltipOpen={true}
                />))}

            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;
