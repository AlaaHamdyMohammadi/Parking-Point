import axios from "axios"

const axiosInstanceParking= axios.create({
baseURL:'http://localhost:3000',
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