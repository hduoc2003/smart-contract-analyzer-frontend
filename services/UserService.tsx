// import axios from '../utils/Axios/BaseAxios';
import { urlLogin, urlSignup } from './ApiService';
import { LoginFormState, SignupFormState } from '../interfaces';
import axios from 'axios';

export const handleLogin = async (formVal : LoginFormState) => {
    return await axios.post(
        urlLogin,
        {username: formVal.username, password: formVal.password},
    )
}

export const handleSignUp = async (formVal : SignupFormState) => {
    return await axios.post(
        urlSignup,
        {name:formVal.name, email: formVal.email, username: formVal.username, password: formVal.password},
    )
}