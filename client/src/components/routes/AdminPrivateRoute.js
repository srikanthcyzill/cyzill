// AdminPrivateRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminPrivateRoute({ children }) {
    const { currentAdmin } = useSelector((state) => state.admin);
    return currentAdmin ? children : <Navigate to='/admin/login' />;
}
