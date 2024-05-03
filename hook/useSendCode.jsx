import axiosInstanceParking from '../src/axiosConfig/instanc';

export default function useSendCode() {
  const handleChange = async () => {
    try {
      await axiosInstanceParking.get(`/users/me/confirm-email`);
    } catch (error) {
      console.error("Error occurred while confirming email:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };
  return handleChange;
}
