import React, { useEffect, useState } from "react"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"
import axios from "axios"
import { Layout } from "antd"
import Good from "./components/Good"
import Home from "./pages/Home"
import Basket from "./pages/Basket"
import AppHeader from "./components/Header"
import AuthCheck from "./components/AuthCheck"
import { useDispatch } from "react-redux"
import { setTokenAction, setUserInfoAction } from "./slices/user"
import Auth from "./pages/Auth"
import pencil from "./pencil.png"
import { setBasketAction } from "./slices/basket"
import Orders from "./pages/Orders"

axios.defaults.baseURL = "http://localhost:8080"

function App() {
    const dispatch = useDispatch()
    const [isInit, setIsInit] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        const basket = JSON.parse(localStorage.getItem("basket") || "[]")

        dispatch(setTokenAction(token))
        dispatch(setUserInfoAction(userInfo))
        dispatch(setBasketAction(basket))
        setIsInit(true)
    }, [])

    return isInit ? (
        <BrowserRouter basename="/">
            <Layout>
                <Layout.Header className="header">
                    <NavLink to="/">
                        <img src={pencil} width={40} />
                    </NavLink>
                    <AppHeader />
                </Layout.Header>
                <Layout.Content>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route
                            path="/goods/:id"
                            element={
                                <AuthCheck>
                                    <Good />
                                </AuthCheck>
                            }
                        />
                        <Route path="/auth" element={<Auth />}></Route>
                        <Route
                            path="/basket"
                            element={
                                <AuthCheck>
                                    <Basket />
                                </AuthCheck>
                            }
                        ></Route>
                        <Route
                            path="/orders"
                            element={
                                <AuthCheck>
                                    <Orders />
                                </AuthCheck>
                            }
                        ></Route>
                    </Routes>
                </Layout.Content>
            </Layout>
        </BrowserRouter>
    ) : null
}

export default App
