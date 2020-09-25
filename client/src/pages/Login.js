import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

import { Grid, TextField, Button } from "@material-ui/core";

import { useAuthDispatch } from "../context/auth";

const LOGIN_USER = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            email
            createdAt
            token
        }
    }
`;

const Login = (props) => {
    const [variables, setVariables] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const dispatch = useAuthDispatch();

    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
        onCompleted(data) {
            dispatch({
                type: "LOGIN",
                payload: data.login,
            });
            window.location.href = "/dashboard";
            // props.history.push("/dashboard");
        },
    });

    const submitLoginForm = (e) => {
        e.preventDefault();

        loginUser({ variables });
    };

    return (
        <div className="login">
            <Grid className="login-container" container>
                <Grid item xs={7} sm={5} md={4} lg={4}>
                    <h1 className="text-center">Login</h1>
                    <form onSubmit={submitLoginForm}>
                        <div className="form-input">
                            <TextField
                                type="text"
                                value={variables.username}
                                error={errors.username ? true : false}
                                label={errors.username ?? "Username"}
                                onChange={(e) =>
                                    setVariables({
                                        ...variables,
                                        username: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </div>
                        <div className="form-input">
                            <TextField
                                type="password"
                                value={variables.password}
                                error={errors.password ? true : false}
                                label={errors.password ?? "Password"}
                                onChange={(e) =>
                                    setVariables({
                                        ...variables,
                                        password: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </div>
                        <div className="login-buttons">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "loading..." : "Login"}
                            </Button>
                            <br />
                            <small>
                                Don't have an account?{" "}
                                <Link to="/register">Register</Link>
                            </small>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
