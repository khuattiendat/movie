import HomeAdmin from "./pages/admin/HomeAdmin/HomeAdmin.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/admin/login/Login.jsx";
import "./styles/global.scss";
import './styles/responsive.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import New from "./pages/admin/New/New.jsx";
import List from "./pages/admin/list/List.jsx";
import React from "react";
import LayoutAdmin from "./pages/layout/LayoutAdmin/LayoutAdmin.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutAdmin/>,
            children: [
                {path: "/", element: <HomeAdmin/>},
            ]
        },
        {
            path: "/admin",
            element: <LayoutAdmin/>,
            children: [
                {path: "/admin", element: <HomeAdmin/>},
                //user
                {path: "/admin/user/danh-sach", element: <List type='user'/>},
                {path: "/admin/user/them-moi", element: <New type='user'/>},
                {path: "/admin/user/sua/:id", element: <New type='user' isEdit={true}/>},
                //category
                {path: "/admin/category/danh-sach", element: <List type='category'/>},
                {path: "/admin/category/them-moi", element: <New type='category'/>},
                {path: "/admin/category/sua/:id", element: <New type='category' isEdit={true}/>},
                // movie
                {path: "/admin/movie/danh-sach", element: <List type='movie'/>},
                {path: "/admin/movie/them-moi", element: <New type='movie'/>},
                {path: "/admin/movie/sua/:id", element: <New type='movie' isEdit={true}/>},
                //actor
                {path: "/admin/actor/danh-sach", element: <List type='actor'/>},
                {path: "/admin/actor/them-moi", element: <New type='actor'/>},
                {path: "/admin/actor/sua/:id", element: <New type='actor' isEdit={true}/>},
            ],
        },
        {path: "/admin/login", element: <Login/>},
    ]);
    return <RouterProvider router={router}/>;
}

export default App;