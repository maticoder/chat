import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { Grid, TextField, Button } from "@material-ui/core";

import { useAuthState, useAuthDispatch } from "../context/auth";

const UPDATE_IMAGE = gql`
    mutation updateImageUrl($imageUrl: String!) {
        updateImageUrl(imageUrl: $imageUrl)
    }
`;

const Profile = (props) => {
    const [variables, setVariables] = useState({
        username: "cos",
        imageUrl: "",
    });

    const [errors, setErrors] = useState({});

    const state = useAuthState();
    const dispatch = useAuthDispatch();

    const [updateImage, { loading }] = useMutation(UPDATE_IMAGE, {
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
        onCompleted(data) {
            window.location.href = "/dashboard";
        },
    });

    useEffect(() => {
        setVariables({
            ...variables,
            username: state.user.username,
        });
    }, [variables.username]);

    const submitProfileForm = (e) => {
        e.preventDefault();

        updateImage({ variables });
    };

    return (
        <div className="login">
            <Grid className="login-container" container>
                <Grid item xs={7} sm={5} md={4} lg={4}>
                    <h1 className="text-center">Profile</h1>
                    <form onSubmit={submitProfileForm}>
                        <div className="form-input">
                            <TextField
                                type="text"
                                value={variables.username}
                                label={"Username"}
                                fullWidth
                                disabled={true}
                            />
                        </div>
                        <div className="form-input">
                            <TextField
                                type="text"
                                value={variables.imageUrl}
                                label={"Image Url"}
                                onChange={(e) =>
                                    setVariables({
                                        ...variables,
                                        imageUrl: e.target.value,
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
                                {loading ? "loading..." : "Update"}
                            </Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;
