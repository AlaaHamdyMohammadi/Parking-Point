import { useEffect, useState } from "react";
import axiosInstanceParking from "../src/axiosConfig/instanc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../src/store/slices/authSlice";

export default function useLogInUserData() {
    const [user, setuser] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const getLogInUser = async () => {
            try {
                const response = await axiosInstanceParking.get('/users/me'
                );
                setuser(response.data.doc);
                return response.data.doc;
            } catch (error) {
                if (error.response.data.error == 'the user isnt exist anymore') {
                    dispatch(logout());
                    await axiosInstanceParking.post(`/users/logout`);
                    navigate("/");
                }
            }
        };
        getLogInUser()
    }, []);
    return user;
}
