import {RouteInfo} from "../types/RouteInfo";
import {Outlet, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import React from "react";

const RouteWithSubRoutes = (route: RouteInfo) => {
    const Component = route.component;
    return (
        <Route
            key={route.path}
            path={route.path}
            element={
                route.permissions?.length ? (
                    <PrivateRoute permissions={route.permissions}>
                        <Component />
                    </PrivateRoute>
                ) : (
                    <>
                        <Component />
                        {
                            route.children && route.children.length > 0 &&
                            <Outlet/>
                        }
                    </>
                )
            }
        >
            {route.children && route.children.map((child: any) => RouteWithSubRoutes(child))}
        </Route>
    );
};

export default RouteWithSubRoutes;