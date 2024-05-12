import { useEffect, useState } from "react";
import axiosInstanceParking from "../src/axiosConfig/instanc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../src/store/slices/authSlice";
import Cookies from 'js-cookie';
export default function useLogInUserData() {
    const token = Cookies.get('token');
    console.log(token);
    const [user, setuser] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useEffect(() => {
    //     const getLogInUser = async () => {
    //         try {
    //             const response = await axiosInstanceParking.get('/users/me'
    //             );
    //             setuser(response.data.doc);
    //             return response.data.doc;
    //         } catch (error) {
    //             if (error.response.data.error == 'the user isnt exist anymore' || error.response.status==401) {
    //                 dispatch(logout());
    //                 await axiosInstanceParking.post(`/users/logout`);
    //                 navigate("/");
    //             }
    //         }
    //     };
    //     getLogInUser()
    // }, [dispatch,navigate]);
    useEffect(() => {
        const getLogInUser = async () => {
            try {
                const response = await axiosInstanceParking.get("/users/me");
                setuser(response.data.doc);
            } catch (error) {
                if (
                    error.response &&
                    (error.response.data.error === "the user isnt exist anymore" ||
                    error.response.status === 401)
                ) {
                    dispatch(logout());
                    await axiosInstanceParking.post(`/users/logout`);
                    navigate("/");
                }
            }
        };

        if (token) {
            getLogInUser();
            console.log(token);
        } else {
            // If there's no token, logout the user
            // dispatch(logout());
            // navigate("/");
            console.log('token');
        }
    }, [dispatch, navigate, token]);
    return user;
}
