import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";
import cl from '../Navbar/Navbar.module.css'

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                <Link to="/about" className={cl.btns__in__navbar}>О сайте</Link>
                <Link to="/posts" className={cl.btns__in__navbar}>Посты</Link>
            </div>
        </div>
    )
}

export default Navbar;