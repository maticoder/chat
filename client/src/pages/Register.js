import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

import { Grid, TextField, Button } from "@material-ui/core";

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        ) {
            username
            email
            createdAt
        }
    }
`;

const Register = (props) => {
    const [variables, setVariables] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update: (_, __) => props.history.push("/login"),
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    });

    const submitRegisterForm = (e) => {
        e.preventDefault();

        registerUser({ variables });
    };

    return (
        <div className="register">
            <Grid className="register-container" container>
                <Grid item xs={7} sm={5} md={4} lg={4}>
                    <h1 className="text-center">Register</h1>
                    <form onSubmit={submitRegisterForm}>
                        <div className="form-input">
                            <TextField
                                type="email"
                                color="secondary"
                                value={variables.email}
                                error={errors.email ? true : false}
                                label={errors.email ?? "Email"}
                                onChange={(e) =>
                                    setVariables({
                                        ...variables,
                                        email: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </div>
                        <div className="form-input">
                            <TextField
                                type="text"
                                color="secondary"
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
                                color="secondary"
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
                        <div className="form-input">
                            <TextField
                                type="password"
                                color="secondary"
                                value={variables.confirmPassword}
                                error={errors.confirmPassword ? true : false}
                                label={
                                    errors.confirmPassword ?? "Confirm password"
                                }
                                onChange={(e) =>
                                    setVariables({
                                        ...variables,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                fullWidth
                            />
                        </div>
                        <div className="register-buttons">
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "loading..." : "Register"}
                            </Button>
                            <br />
                            <small>
                                Already have an account?{" "}
                                <Link to="/login">Login</Link>
                            </small>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default Register;
