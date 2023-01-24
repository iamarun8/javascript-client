import axios from 'axios';
import localStorage from 'local-storage';

const callApi = async (url, method, data) => {
    try {
        const baseUrl = `http://localhost:9000/api/${url}`;
        const response = await axios({
            method,
            url: baseUrl,
            data,
            headers: {
                Authorization: localStorage.get('token'),
            }
        });
        return response.data;
    } catch (error) {
        console.log('Inside catch', error);
        return { status: 'error', message: 'Login Incorrect' };
    }
};

export default callApi;