import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import {ACCESS_TOKEN,REFRESH_TOKEN} from '../constants';
import {useState, useEffect} from 'react';



function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {// On component mount, check authentication status
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {// Make API call to refresh the token
            const response =  await api.post('api/token/refresh/', {
                refresh : refreshToken
            });
            // If refresh is successful, store the new access token
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }

        } catch (error) {// Handle errors (e.g., refresh token expired)
            console.error("Error refreshing token:", error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        // Check for access token
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) { // No token found, not authorized
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000;

        // If token is expired, try to refresh
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }

    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;


}
export default ProtectedRoute;