import { useSelector } from 'react-redux';
import axiosInstanceParking from '../src/axiosConfig/instanc';

export default function useSendCode() {
  const token = useSelector((state) => state.loggedIn.token);
  const handleChange = async () => {
    try {
      await axiosInstanceParking.get(`/users/me/confirm-email`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error occurred while confirming email:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };
  return handleChange;
}
