import axios from 'axios';
import localStorage from 'local-storage';

const callApi = async (data, method, url) => {
    console.log('---Api file---')
    try {
        const baseUrl = `http://localhost:9000/api/user${url}`;
        console.log('base url', baseUrl);
        const { email, password } = data;
        const response = await axios({
            method,
            url: baseUrl,
            data: {
                email,
                password,
            },
        });
        localStorage.set('token', response.data);
        const token = localStorage.get('token');
        console.log('Token:', token);
    } catch (error) {
        console.log('Inside catch', error);
        return { status: 'error', message: 'Login Incorrect' };
    }
};

export default callApi;