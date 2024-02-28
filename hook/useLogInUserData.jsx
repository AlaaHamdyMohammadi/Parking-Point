import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogInUser } from "../src/store/slices/logInUser";

export default function useLogInUserData() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.loggedIn.token)
    useEffect(() => {
        if (token) {
            dispatch(getLogInUser(token));
        }
    }, []);
    const user = useSelector((state) => state.logInUser.logInUser)
    console.log(user);
  return user;
}
