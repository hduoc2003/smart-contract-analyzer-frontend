import { urlGetUser, urlDeleteUser, urlUpdateUser } from './ApiService';
import axios from 'axios';

export const handleGetAllUser = async () => {
    try {
        const response = await axios.get(urlGetUser);
        console.log(response.data);
        return response.data;
    } catch (err) {
        throw err;
    }
};