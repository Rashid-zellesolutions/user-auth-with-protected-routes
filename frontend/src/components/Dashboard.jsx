import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Dashboard = () => {
    const { token, loading } = useContext(AuthContext);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const decodeToken = () => {
            try {
                const decodedToken = jwtDecode(token); // Decode the JWT token
                setUserName(decodedToken.username); // Extract the username from the decoded token
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        };

        if (token) {
            decodeToken();
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <h3>Welcome {userName}! This is your protected Dashboard</h3>;
}

export default Dashboard;
