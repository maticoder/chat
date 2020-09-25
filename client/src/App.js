import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloProvider from "./ApolloProvider";

import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/home/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/message";
import DynamicRoute from "./util/DynamicRoute";

import "./App.css";

const App = () => {
    return (
        <ApolloProvider>
            <AuthProvider>
                <MessageProvider>
                    <div className="app">
                        <Router>
                            <Navbar />
                            <Switch>
                                <DynamicRoute
                                    exact
                                    path="/"
                                    component={Home}
                                    guest
                                />
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
                                <DynamicRoute
                                    path="/profile"
                                    component={Profile}
                                    authenticated
                                />
                            </Switch>
                        </Router>
                    </div>
                </MessageProvider>
            </AuthProvider>
        </ApolloProvider>
    );
};

export default App;
