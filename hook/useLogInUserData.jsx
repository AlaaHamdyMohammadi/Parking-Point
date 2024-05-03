import { useEffect, useState } from "react";
import axiosInstanceParking from "../src/axiosConfig/instanc";

export default function useLogInUserData() {
    const [user, setuser] = useState({})
    useEffect(() => {
        const getLogInUser = async () => {
            try {
                const response = await axiosInstanceParking.get('/users/me'
                );
                setuser(response.data.doc);
                return response.data.doc;
            } catch (error) {
                console.log(error);
            }
        };
        getLogInUser()
    }, []);
    return user;
}
