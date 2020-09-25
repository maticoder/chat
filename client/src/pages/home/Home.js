import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import conversation from "../../images/conversation.svg";

const Home = () => {
    return (
        <div className="home">
            <Grid className="home-container" container>
                <Grid item xs={7} sm={5} md={4} lg={4}>
                    <h1 className="text-center">Chat</h1>
                    <div className="image-container">
                        <img src={conversation} alt="conversation" />
                    </div>
                    <h2>Made by Mati</h2>
                    <div className="buttons">
                        <Link to="/login">
                            <Button variant="contained" color="primary">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="contained" color="secondary">
                                Register
                            </Button>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
