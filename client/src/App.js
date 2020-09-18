import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloProvider from "./ApolloProvider";

import Dashboard from "./pages/home/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/message";
import DynamicRoute from "./util/DynamicRoute";

import "./App.css";

const App = () => {
    return (
        <ApolloProvider>
            <AuthProvider>
                <MessageProvider>
                    <Router>
                        <Switch>
                            <DynamicRoute
                                path="/dashboard"
                                component={Dashboard}
                                authenticated
                            />
                            <DynamicRoute
                                path="/register"
                                component={Register}
                                guest
                            />
                            <DynamicRoute
                                path="/login"
                                component={Login}
                                guest
                            />
                        </Switch>
                    </Router>
                </MessageProvider>
            </AuthProvider>
        </ApolloProvider>
    );
};

export default App;
