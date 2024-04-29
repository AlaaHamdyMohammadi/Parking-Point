import axios from "axios"
const axiosInstanceParking= axios.create({
baseURL:'https://e-parking-backend.onrender.com',
withCredentials: true,
})

axiosInstanceParking.interceptors.request.use((req)=>{
        return req
    },(err)=>{
        return Promise.reject(err)
    })
    axiosInstanceParking.interceptors.response.use((res)=>{
        return res
    },(err)=>{
        return Promise.reject(err)
    })
export default axiosInstanceParking;