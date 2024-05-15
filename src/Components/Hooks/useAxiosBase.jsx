import axios from "axios";

const axiosBase = axios.create({
    baseURL: 'https://fire-blog-server.vercel.app',
    // baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosBase = () => {
    return axiosBase;
};

export default useAxiosBase;