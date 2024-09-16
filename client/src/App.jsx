import HomeAdmin from "./pages/admin/HomeAdmin/HomeAdmin.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/admin/login/Login.jsx";
import "./styles/global.scss";
import './styles/responsive.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewUser from "./pages/admin/newUser/NewUser.jsx";
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
                {path: "/admin/user/them-moi", element: <NewUser type='user'/>},
                {path: "/admin/user/sua/:id", element: <NewUser type='user' isEdit={true}/>},
                //category
                {path: "/admin/category/danh-sach", element: <List type='category'/>},
                {path: "/admin/category/them-moi", element: <NewUser type='category'/>},
                {path: "/admin/category/sua/:id", element: <NewUser type='category' isEdit={true}/>},
                // movie
                {path: "/admin/movie/danh-sach", element: <List type='movie'/>},
                {path: "/admin/movie/them-moi", element: <NewUser type='movie'/>},
                {path: "/admin/movie/sua/:id", element: <NewUser type='movie' isEdit={true}/>},
                //actor
                {path: "/admin/actor/danh-sach", element: <List type='actor'/>},
                {path: "/admin/actor/them-moi", element: <NewUser type='actor'/>},
                {path: "/admin/actor/sua/:id", element: <NewUser type='actor' isEdit={true}/>},
            ],
        },
        {path: "/admin/login", element: <Login/>},
    ]);
    return <RouterProvider router={router}/>;
}

export default App;