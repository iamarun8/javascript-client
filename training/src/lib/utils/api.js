import axios from 'axios';
import localStorage from 'local-storage';

const callApi = async (url, method, data) => {
    console.log('<<',url,method,data,'>>');
    try {
        const baseUrl = `http://localhost:9000/api/${url}`;
        console.log('baseURL--',baseUrl);
        const response = await axios({
            method,
            url: baseUrl,
            data,
            headers: {
                Authorization: localStorage.get('token'),
            }
        });
        console.log('--API___',response.data);
        return response.data;
    } catch (error) {
        console.log('Inside catch', error);
        return { status: 'error', message: 'Login Incorrect' };
    }
};

export default callApi;