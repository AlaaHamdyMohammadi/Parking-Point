import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function LoginGuard({ children }) {
    const isLoggedIn = useSelector((state) => state.loggedIn.loggedIn);
    if (isLoggedIn == false) {
        return children;
    } else {
        return <Navigate to="/" />
    }
}