/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isAdminLogin, setIsAdminLogin] = useState(false); // New state for admin login
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
 
    const loginHandler = () => {
        setIsLogin(!isLogin);
        setIsAdminLogin(false);
    }

    const adminLoginHandler = () => {
        setIsAdminLogin(!isAdminLogin);
        setIsLogin(false);
    }
    
    const getInputData = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (isLogin || isAdminLogin) {
            // Login
            const user = { email, password }; 
            try {
                const res = await axios.post("http://localhost:3000/api/v1/user/login", user, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    console.log(res.data);
                    localStorage.setItem('jwtToken', res.data.token);
                    if (isAdminLogin) {
                        if (res.data.user.isadmin) {
                            navigate("/admin"); // Redirect to /admin upon successful admin login
                        } else {
                            alert("Unauthorized access");
                        }
                    } else {
                        navigate("/home"); // Redirect to /home upon successful user login
                    }
                } else {
                    navigate("/");
                }
            } catch (error) {
                alert("User not found");
                console.error(error);
                // Handle error
            } finally {
                setIsLoading(false);
            }
        } else {
            // Register
            setIsLoading(true);
            const user = { fullName, email, password };
            try {
                const res = await axios.post("http://localhost:3000/api/v1/user/register", user, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    setIsLogin(true);
                }
            } catch (error) {
                alert("User Already Registered");
                console.error(error);
                // Handle error
            } finally {
                setIsLoading(false);
            }
        }
        setFullName("");
        setEmail("");
        setPassword("");
    }
    
    return (
        <div>
            <div className='absolute'>
                <img className='w-[100vw] h-[120vh] bg-cover object-fill' src="./images/login wallpaper.jpg" alt="banner" />
            </div>

            <form onSubmit={getInputData} className='flex flex-col w-3/12 p-12 my-36 left-0 right-0 mx-auto items-center justify-center absolute rounded-md bg-black opacity-90'>
                <h1 className='text-3xl text-white mb-5 font-bold'>{isAdminLogin ? "Admin Login" : (isLogin ? "Login" : "Signup")}</h1>
                <div className='flex flex-col'>
                    {
                        !isLogin && !isAdminLogin && <input value={fullName} onChange={(e)=>setFullName(e.target.value)} type='text' placeholder='Fullname' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
                    }
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
                    <button type='submit' className='bg-indigo-700 mt-6 p-3 text-white rounded-sm font-medium'>{`${isLoading ? "loading..." : (isAdminLogin ? "Admin Login" : (isLogin ? "Login" : "Signup"))}`}</button>
                    <p className='text-white mt-2'>{isLogin ? "New to Netflix?" : "Already have an account?"}<span onClick={loginHandler} className='ml-1 text-blue-900 font-medium cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></p>
                    <p className='text-white mt-2'>{isAdminLogin ? "" : <span onClick={adminLoginHandler} className='text-blue-900 font-medium cursor-pointer'>Admin Login</span>}</p>
                </div>
            </form>
        </div>
    )
}

export default Login;
