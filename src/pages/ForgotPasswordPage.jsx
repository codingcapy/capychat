
/*
author: Paul Kim
date: February 8, 2024
version: 1.0
description: forgot password page for CapyChat client
 */

import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import useAuthStore from "../store/AuthStore";

export default function ForgotPasswordPage() {

    const navigate = useNavigate();
    const { loginService, authLoading, user } = useAuthStore((state) => state);
    const [message, setMessage] = useState("");

    function handleRecovery(e) {
        e.preventDefault();
        let email = e.target.email?.value;
    }

    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 mx-auto">
                    <form onSubmit={handleRecovery} className="flex flex-col">
                        <h2 className="py-10 text-2xl text-indigo-600 font-medium text-center">Forgot Password</h2>
                        <div className="flex flex-col">
                            <label htmlFor="username">Email</label>
                            <input type="email" name="email" id="email" placeholder="Your Email" required className="px-2 border rounded-lg border-slate-700 py-1" />
                        </div>
                        <button className="rounded-xl my-5 py-2 px-2 bg-indigo-600 text-white">Send</button>
                        <div>Returning User? <NavLink to="/capychat/users/login" className="text-center text-indigo-600">Login</NavLink></div>
                        <div>New User? <NavLink to="/capychat/users/signup" className="text-center text-indigo-600">Sign Up</NavLink></div>
                        <div>Forgot Username? <NavLink to="/capychat/forgotusername" className="text-center text-indigo-600">Recover</NavLink></div>
                    </form>
                    {authLoading ? <h2>Loading...</h2> : null}
                    <p>{message}</p>
                </main>
                <Footer />
            </div>
        </div>
    )
}