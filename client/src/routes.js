import React from "react"
import {Routes, Route} from 'react-router-dom'
import LinksPage from "./pages/LinksPage"
import CreatePage from "./pages/CreatePage"
import DetailPage from "./pages/DetailPage"
import AuthPage from "./pages/AuthPage"

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return (
            <Routes>
                <Route path="/links" exact element={<LinksPage></LinksPage>}/> 

                <Route path="/create" exact element={<CreatePage></CreatePage>}/> 

                <Route path="/detail/:id" element={<DetailPage></DetailPage>}/>  

                <Route path="/*" element={<CreatePage></CreatePage>}/> 

            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" exact element={<AuthPage></AuthPage>}/>

            <Route path="/*" exact element={<AuthPage></AuthPage>}/>
        </Routes>
    )
}