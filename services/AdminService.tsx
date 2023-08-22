import { urlGetUser, urlDeleteUser, urlUpdateUser } from './ApiService';
import axios from 'axios';

export const handleGetAllUser = async () => {
    try {
        const response = await axios.get(urlGetUser);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const handleDeleteUserById = async ( userId : string ) => {
    try {
        const response = await axios.delete(`${urlDeleteUser}${userId}`);
        return response;
    } catch (err) {
        throw err;
    }
}

export const handleUpdateUserById = async ( userId : string ) => {
    try {
        const response = await axios.put(`${urlUpdateUser}${userId}`);
        return response;
    } catch (err) {
        throw err;
    }
}