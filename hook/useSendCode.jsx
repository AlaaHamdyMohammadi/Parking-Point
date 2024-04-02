import { useSelector } from 'react-redux';
import axiosInstanceParking from '../src/axiosConfig/instanc';
import { toast } from 'react-toastify';
// import { useEffect } from 'react';

export default function useSendCode() {
    const token = useSelector((state) => state.loggedIn.token);
    // useEffect(() => {
        const handleChange = async () => {
            try {
              const res = await axiosInstanceParking.get(`/users/me/confirm-email`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              // console.log("send:", res);
              // toast.success("تم ارسال رمز التاكيد بنجاح");
            } catch (error) {
              console.error("Error occurred while confirming email:", error);
              if (error.response) {
                console.error("Response data:", error.response.data);
              }
            }
          };
      
    // }, []);
    return handleChange;
}
