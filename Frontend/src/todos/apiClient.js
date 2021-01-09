import axios from 'axios';

export const apiClient = axios.create({
    baseURL: `http://localhost:5000/`,
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});