
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RenterGuard({children}) {
    const isLoggedIn = useSelector((state) => state.loggedIn.loggedIn);
    const user = useSelector((state) => state.user.user)
    if (isLoggedIn == false) {
      return <Navigate to="/register" />;
    }else if(user.role !== 'renter' && isLoggedIn== true){
        return <Navigate to="**" />
    } else {
      return children;
    }
}
