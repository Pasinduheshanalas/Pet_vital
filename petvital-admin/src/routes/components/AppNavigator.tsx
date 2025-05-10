import React from 'react';
import {Routes} from "react-router-dom";
import {routeInfo} from "../configuration";
import RouteWithSubRoutes from "./RouteWithSubRoutes";

const AppNavigator = () => {

    return (
        <Routes>
            {routeInfo.map((route) => RouteWithSubRoutes(route))}
        </Routes>
    )
}

export default AppNavigator;