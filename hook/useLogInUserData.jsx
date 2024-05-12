import { useEffect, useState } from "react";
import axiosInstanceParking from "../src/axiosConfig/instanc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../src/store/slices/authSlice";
import Cookies from "js-cookie";
export default function useLogInUserData() {
    const token = Cookies.get("token");
    const [user, setuser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = async () => {
        try {
            await axiosInstanceParking.post(`/users/logout`);
            dispatch(logout());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const getLogInUser = async () => {
            try {
                const response = await axiosInstanceParking.get("/users/me");
                setuser(response.data.doc);
                return response.data.doc;
            } catch (error) {
                if (
                    error.response.data.error == "the user isnt exist anymore" ||
                    error.response.status == 401
                ) {
                    dispatch(logout());
                    await axiosInstanceParking.post(`/users/logout`);
                    navigate("/");
                }
            }
        };
        getLogInUser();
    }, [dispatch, navigate]);
    useEffect(() => {
        console.log(token);
        if (!token) {
            console.log("notToken");
            logOut()
        }
    }, [token,logOut]);
    return user;
}
