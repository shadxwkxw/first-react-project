import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router/index";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/loader";

const AppRoute = () => {

    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth)

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Routes>
            {privateRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={isAuth ? route.element : <Navigate to="/login" replace />}
                />
            ))}
            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={!isAuth ? route.element : <Navigate to="/posts" replace />}
                />
            ))}
            <Route path="*" element={<Navigate to={isAuth ? '/posts' : '/login'} replace />} />
        </Routes>
    );
}

export default AppRoute;