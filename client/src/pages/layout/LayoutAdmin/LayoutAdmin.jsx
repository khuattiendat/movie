import Navbar from "../../../components/navbar/Navbar.jsx";
import Menu from "../../../components/menu/Menu.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";

const queryClient = new QueryClient();
const Layout = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/admin/login')
        }
    }, [])

    return (
        <div className="main">
            <Navbar/>
            <div className="_container">
                <div className="menuContainer">
                    <Menu/>
                </div>
                <div className="contentContainer">
                    <QueryClientProvider client={queryClient}>
                        <Outlet/>
                    </QueryClientProvider>
                </div>
            </div>
        </div>
    );
};
export default Layout;