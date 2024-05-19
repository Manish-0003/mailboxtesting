import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { auth } from "./firebase";
import './Login.css';

const Login = ({ onLogin, isLoggedIn }) => {
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
            navigate('/dashboard'); // Redirect to dashboard page
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
            navigate('/dashboard'); // Redirect to dashboard page
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
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif"
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
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email"
                        />
                        <input
                            value={password}
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        <button type="submit" onClick={handleRegister}>Register</button>
                    </div>
                    <p onClick={() => setRegister(false)}>Login?</p>
                </div>
            ) : (
                <div className="loginContainer">
                    <div className="logo">
                        <img
                            src="https://media.licdn.com/dms/image/D5612AQGk64ycsAchYw/article-cover_image-shrink_720_1280/0/1685813144705?e=2147483647&v=beta&t=Soh9RFURdLWq1XkYL5jLoqDudGtDHMLwoH1ND8cLN8A"
                            alt="logo"
                        />
                        <h3>Sign in</h3>
                    </div>
                    <div className="loginContent">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email"
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
