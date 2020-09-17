import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ApolloProvider from "./ApolloProvider";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./context/auth";
import DynamicRoute from "./util/DynamicRoute";

import "./App.css";

const App = () => {
    return (
        <ApolloProvider>
            <AuthProvider>
                <Router>
                    <Container className="pt-5">
                        <Switch>
                            <DynamicRoute
                                exact
                                path="/"
                                component={Home}
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
                    </Container>
                </Router>
            </AuthProvider>
        </ApolloProvider>
    );
};

export default App;
