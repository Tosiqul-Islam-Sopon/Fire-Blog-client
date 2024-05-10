import axios from "axios";

const axiosBase = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosBase = () => {
    return axiosBase;
};

export default useAxiosBase;