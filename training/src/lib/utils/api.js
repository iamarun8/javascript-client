import axios from 'axios';
import localStorage from 'local-storage';

const callApi = async (data, method, url, islogin) => {
    console.log('---Api file---', localStorage.get())
    try {
        const baseUrl = `http://localhost:9000/api/${url}`;
        console.log('base url', baseUrl);
        const { email, password } = data;
        const response = await axios({
            method,
            url: baseUrl,
            data: {
                email,
                password,
            },
            headers: {
                Authorization: localStorage.get('token'),
            }
        });
        if(islogin) {
            localStorage.set('token', response);
        }
        const token = localStorage.get('token');
        console.log('Token:', token);
        console.log('--ResponseToken--:',response);
        return response.data;
    } catch (error) {
        console.log('Inside catch', error);
        return { status: 'error', message: 'Login Incorrect' };
    }
};

export default callApi;