import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./Components/AppRoute";
import Navbar from "./Components/UI/Navbar/Navbar";
import "./styles/App.css";
import { AuthContext } from "./context";

function App() {

	const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{
			isAuth,
			setIsAuth,
            isLoading
		}}>
            <BrowserRouter>
                <Navbar />
                <AppRoute />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
