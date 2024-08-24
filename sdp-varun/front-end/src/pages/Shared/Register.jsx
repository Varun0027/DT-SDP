import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../services/api'; // Adjust the path if necessary
import { toast, ToastContainer } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const Register = () => {
    const navigate = useNavigate(); // Use navigate for redirection
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        phone: false,
        address: false,
        password: false,
        confirmPassword: false,
        termsAccepted: false,
    });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);
    const validatePassword = (password) => password.length >= 8;

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate form data
        const newErrors = {
            name: !formData.name,
            email: !validateEmail(formData.email),
            phone: !validatePhone(formData.phone),
            address: !formData.address,
            password: !validatePassword(formData.password),
            confirmPassword: !formData.confirmPassword || formData.password !== formData.confirmPassword,
            termsAccepted: !formData.termsAccepted,
        };
        setErrors(newErrors);

        if (Object.values(newErrors).every(error => !error)) {
            try {
                const response = await axiosInstance.post(
                    "/api/auth/register",
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address,
                        password: formData.password,
                    }
                );

                // Handle successful registration logic
                console.log('Response:', response.data);

                // Store user data in local storage
                const existingUsers = JSON.parse(localStorage.getItem('user')) || [];
                existingUsers.push(response.data); // Use response.data if it contains the new user info
                localStorage.setItem('user', JSON.stringify(existingUsers));

                // Notify user of success
                toast.success("Registered successfully");

                // Redirect to login page
                navigate('/login');
            } catch (error) {
                console.error('Error submitting form:', error.response ? error.response.data : error.message);
                toast.error("Registration failed. Please try again.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div
                className="hidden bg-cover lg:block lg:w-1/2"
                style={{ backgroundImage: "url('https://preview.redd.it/made-some-pictures-of-cars-with-stable-diffusion-xl-v0-amni5nifkcjb1.png?width=1280&format=pjpg&auto=webp&s=621ea06e41d31f7d45208854f3409b0e0ae0987d')" }}
            ></div>
            <div className="w-full p-8 lg:w-1/2">
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400 mb-2" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="text-red-500 text-sm">Valid email is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400 mb-2" htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <span className="text-red-500 text-sm">Valid phone number is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400 mb-2" htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="text-red-500 text-sm">Password must be at least 8 characters</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <span className="text-red-500 text-sm">Passwords must match</span>}
                    </div>
                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                id="termsAccepted"
                                name="termsAccepted"
                                className="form-checkbox"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-400">I agree to the terms and conditions</span>
                        </label>
                        {errors.termsAccepted && <span className="text-red-500 text-sm">You must accept the terms and conditions</span>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <ToastContainer /> {/* Add ToastContainer to render notifications */}
            </div>
        </div>
    );
};

export default Register;
