import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
    const { user } = useContext(UserDataContext);

    // If user is NOT logged in → redirect to login
    if (!user || !user.email) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, show the page
    return children;
}