import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { auth } from "../firebase";
import '../css/Login.css';

function Login({ onLogin, isLoggedIn }) { 
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            alert('Registered successfully');
            onLogin();
            navigate('/login',); 
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    const handleLogin = async () => {
        
        setLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password);
            alert('Logged in successfully');
            onLogin();
            navigate('/dashboard'); 
        } catch (error) {
            alert("User not found");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <img
                    src="https://c4.wallpaperflare.com/wallpaper/764/505/66/baby-groot-4k-hd-superheroes-wallpaper-preview.jpg"
                    alt="Loading"
                />
                <h1>Please Wait...</h1>
            </div>
        );
    }

    return (
        <div className="login">
            {register ? (
                <div className="loginContainer">
                    <div className="logo">
                        <img
                            src="https://theuniqueacademy.co.in/assets/images/test.png"
                            alt="logo"
                        />
                        <h3>Register</h3>
                        <h5>Create Account to continue..</h5>
                    </div>
                    <div className="loginContent">
                        <input
                            value={email}
                            required={true}
                            onChange={(event) => setEmail(event.target.value)}
                            type="text"
                            placeholder="Email"
                        />
                        <input
                            value={password}
                            required={true}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        <button type="submit" onClick={handleRegister}>Register</button>
                    </div>
                    <p onClick={() => setRegister(false)}>Login</p>
                </div>
            ) : (
                <div className="loginContainer">
                    <div className="logo">
                        <img
                            src="https://www.hdcarwallpapers.com/thumbs/2023/lamborghini_revuelto_4k-t2.jpg"
                            alt="logo"
                        />
                        <h3>Sign in</h3>
                    </div>
                    <div className="loginContent">
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="text"
                            placeholder="Email"
                        />
                        <input
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        <button type="submit" onClick={handleLogin}>Login</button>
                    </div>
                    <p onClick={() => setRegister(true)}>SignUp</p>
                </div>
            )}
        </div>
    );
};

export default Login;
