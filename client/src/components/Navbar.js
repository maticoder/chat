import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useAuthDispatch, useAuthState } from "../context/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MenuAppBar() {
    const classes = useStyles();

    const authDispatch = useAuthDispatch();
    const { user } = useAuthState();

    const logout = () => {
        authDispatch({
            type: "LOGOUT",
        });

        window.location.href = "/login";
    };

    const navbarMarkup = !user ? (
        <Fragment>
            <Button color="inherit">
                <Link to="/login">Login</Link>
            </Button>
            <Button color="inherit">
                <Link to="/register">Register</Link>
            </Button>
        </Fragment>
    ) : (
        <Fragment>
            <Link to="/profile">
                <IconButton>
                    <AccountCircleIcon style={{ color: "white" }} />
                </IconButton>
            </Link>
            <Link to="/dashboard">
                <Button color="inherit">Dashboard</Button>
            </Link>
            {/* <Button color="inherit">
                <Link to="/profile">Profile</Link>
            </Button> */}
            <Button color="inherit" onClick={logout}>
                Logout
            </Button>
        </Fragment>
    );

    return (
        <div className="nav">
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/">Chat</Link>
                    </Typography>

                    {navbarMarkup}
                </Toolbar>
            </AppBar>
        </div>
    );
}
