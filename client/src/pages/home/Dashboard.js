import React, { Fragment, useEffect } from "react";
import { gql, useSubscription } from "@apollo/client";

import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useMessageDispatch } from "../../context/message";

import { Grid } from "@material-ui/core";

import Users from "./Users";
import Messages from "./Messages";

const NEW_MESSAGE = gql`
    subscription newMessage {
        newMessage {
            uuid
            from
            to
            content
            createdAt
        }
    }
`;

const NEW_REACTION = gql`
    subscription newReaction {
        newReaction {
            uuid
            content
            message {
                uuid
                from
                to
            }
        }
    }
`;

const Dashboard = ({ history }) => {
    const authDispatch = useAuthDispatch();
    const messageDispatch = useMessageDispatch();

    const { user } = useAuthState();

    const { data: messageData, error: messageError } = useSubscription(
        NEW_MESSAGE
    );

    const { data: reactionData, error: reactionError } = useSubscription(
        NEW_REACTION
    );

    useEffect(() => {
        if (messageError) console.log(messageError);

        if (messageData) {
            const message = messageData.newMessage;
            const otherUser =
                user.username === message.to ? message.from : message.to;

            messageDispatch({
                type: "ADD_MESSAGE",
                payload: {
                    username: otherUser,
                    message,
                },
            });
        }
    }, [messageError, messageData]);

    useEffect(() => {
        if (reactionError) console.log(reactionError);

        if (reactionData) {
            const reaction = reactionData.newReaction;
            const otherUser =
                user.username === reaction.message.to
                    ? reaction.message.from
                    : reaction.message.to;

            messageDispatch({
                type: "ADD_REACTION",
                payload: {
                    username: otherUser,
                    reaction,
                },
            });
        }
    }, [reactionError, reactionData]);

    const logout = () => {
        authDispatch({
            type: "LOGOUT",
        });

        window.location.href = "/login";
    };

    return (
        <div className="dashboard">
            <Grid container direction="row">
                <Users />
                <Messages />
            </Grid>
        </div>
    );
};

export default Dashboard;
