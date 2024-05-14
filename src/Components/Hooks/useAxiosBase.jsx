import axios from "axios";

const axiosBase = axios.create({
    baseURL: 'https://fire-blog-server.vercel.app',
    withCredentials: true
})

const useAxiosBase = () => {
    return axiosBase;
};

export default useAxiosBase;