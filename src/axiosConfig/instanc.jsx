import axios from "axios"

const axiosInstanceProducts= axios.create({
baseURL:'',
})

axiosInstanceProducts.interceptors.request.use((req)=>{

        return req
    },(err)=>{
        return Promise.reject(err)
    })

    axiosInstanceProducts.interceptors.response.use((res)=>{
    
        return res
    },(err)=>{
        return Promise.reject(err)
    })

export default axiosInstanceProducts;