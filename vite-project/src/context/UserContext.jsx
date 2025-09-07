import { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext(null);

const UserContext = ({ children }) => {

    const [user, setUser] = useState(() => {
        // Load from localStorage on first render
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : {
            email: '',
            fullName: '',
            company: '',
            contactNo: ''
        };
    });

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user && user.email) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </>
    )
};

export default UserContext;