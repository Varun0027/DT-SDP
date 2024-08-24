import axios from 'axios';

const baseURL = 'http://localhost:5173'; // Ensure the base URL is correct

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const UserData = (email) => {
    console.log(email);
    return axios.get(`${baseURL}/api/users/email/${email}`);
};

const UpdateUserByID = (id, data) => axiosInstance.put(`/api/users/update/${id}`, data);

const DeleteUserByID = (id) => axiosInstance.delete(`/api/users/delete/${id}`);

const CreateUser = (name, email, phone, address, password) => 
    axiosInstance.post('/api/users/add', { name, email, phone, address, password });

const getAllUsers = () => axiosInstance.get('/api/users/all');

export { axiosInstance, CreateUser, UserData, UpdateUserByID, getAllUsers, DeleteUserByID };
