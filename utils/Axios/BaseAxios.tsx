import axios from "axios"

const Fetcher = axios.create({
    baseURL: process.env.SERVER_BASE_API,
});

export default Fetcher;
