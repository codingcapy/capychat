
/*
author: Paul Kim
date: February 8, 2024
version: 1.0
description: router for CapyChat client
 */

import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ForgotUsernamePage from "./pages/ForgotUsernamePage"

export function Router() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route path="/capychat/" element={<HomePage />} />
                <Route path="/capychat/users/login" element={<LoginPage />} />
                <Route path="/capychat/users/signup" element={<SignupPage />} />
                <Route path="/capychat/dashboard/:userId" element={<Dashboard />} />
                <Route path="/capychat/about" element={<AboutPage />} />
                <Route path="/capychat/contact" element={<ContactPage />} />
                <Route path="/capychat/forgotpassword" element={<ForgotPasswordPage />} />
                <Route path="/capychat/forgotusername" element={<ForgotUsernamePage />} />
            </Route>
        )
    )
    return router;
}