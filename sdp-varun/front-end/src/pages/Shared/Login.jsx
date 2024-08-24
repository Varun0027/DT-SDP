import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { login } from '../../services/AuthSlice'; // Adjust path as necessary
import { axiosInstance } from "../../services/api"; // Import axiosInstance
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: false, password: false });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLogin = async () => {
        const newErrors = {
            email: !validateEmail(email),
            password: !password,
        };
        setErrors(newErrors);

        if (!Object.values(newErrors).includes(true)) {
            try {
                const response = await axiosInstance.post("/api/auth/login", { email, password });
                console.log("API Response:", response.data);

                const { accessToken, role } = response.data;

                localStorage.setItem("token", accessToken);
                localStorage.setItem("role", role);
                localStorage.setItem('userEmail', email);

                dispatch(login({ email, isAdmin: role === "Admin", token: accessToken, role, isTech: role === "Technician" }));

                toast.success('Login successful!');
                switch (role) {
                    case "Admin":
                        navigate("/admin-dashboard");
                        break;
                    case "Technician":
                        navigate("/technician");
                        break;
                    default:
                        navigate("/");
                }
            } catch (error) {
                console.error('Error logging in:', error.response ? error.response.data : error.message);
                toast.error("Invalid Credentials.");
            }
        }
    };

    return (
        <div className="login-container">
            {/* ... (unchanged login image and footer) */}
            <div className="login-form-container">
                <div className="login-form-content">
                    <div className="login-logo">
                        <img src="https://merakiui.com/images/logo.svg" alt="Logo" />
                    </div>
                    <p className="login-description">Sign in to access your account</p>

                    <div className="login-card-container">
                        <Card>
                            <CardHeader className="login-card-header">
                                <CardTitle className="login-card-title">Login</CardTitle>
                                <CardDescription>
                                    Enter your email below to login
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="login-card-content">
                                <div className="login-input-container">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="example@example.com"
                                        className="login-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <p className="error-text">Valid email is required</p>}
                                </div>
                                <div className="login-input-container">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Your Password"
                                        className="login-input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <p className="error-text">Password is required</p>}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="login-button" onClick={handleLogin}>
                                    Login
                                </Button>
                            </CardFooter>
                        </Card>

                        <p className="login-signup">
                            Don't have an account yet? <a href="/register" className="login-signup-link">Sign up</a>.
                        </p>
                    </div>
                </div>
            </div>

            <footer className="footer-container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src="https://merakiui.com/images/logo.svg" alt="Logo" />
                    </div>
                    <div className="footer-links">
                        <a href="/" className="footer-link">Home</a>
                        <a href="/about" className="footer-link">About</a>
                        <a href="/contact" className="footer-link">Contact</a>
                        <a href="/privacy" className="footer-link">Privacy Policy</a>
                    </div>
                    <div className="footer-social-media">
                        <a href="https://facebook.com" className="footer-social-link">Facebook</a>
                        <a href="https://twitter.com" className="footer-social-link">Twitter</a>
                        <a href="https://instagram.com" className="footer-social-link">Instagram</a>
                        <a href="https://linkedin.com" className="footer-social-link">LinkedIn</a>
                    </div>
                </div>
            </footer>

            <ToastContainer />
        </div>
    );
};

export default Login;
