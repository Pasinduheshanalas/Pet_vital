import { RouteInfo } from "./types/RouteInfo";
import { lazy } from "react";
const Login = lazy(() => import("../pages/login/index"));
const SIGNUP = lazy(() => import("../pages/signup/index"));
const Home = lazy(() => import("../pages/home/index"));
const Restricted = lazy(() => import("../pages/restricted/index"));
const NotFound = lazy(() => import("../pages/not-found/index"));
const PetInformation = lazy(() => import("../pages/pet-information/index"));
const Appoinments = lazy(() => import("../pages/appoinments/index"));
const Orders = lazy(() => import("../pages/orders/index"));
const Products = lazy(() => import("../pages/products/index"));
const ManageVaccine = lazy(() => import("../pages/manage-vaccine/index"));
const Event = lazy(() => import("../pages/event/index"));

export const routeNames = {
  HOME: "/",
  MASTER_DATA: "/master-data",
  RESTRICTED: "/restricted",
  NOT_FOUND: "/not-found",
  PET_INFORMATION: "/:petId",
  APPOINMENTS: "/appoinments",
  ORDERS: "/orders",
  PRODUCT: "/products",
  MANAGE_VACCINE: "/manage-vaccine",
  LOGIN: "/login",
  SIGNUP: "/signup",
  EVENT: "/event",
};

export const routeInfo: RouteInfo[] = [
  {
    path: routeNames.LOGIN,
    component: Login,
    children: [],
    // auth: false,
  },
  {
    path: routeNames.SIGNUP,
    component: SIGNUP,
    children: [],
    // auth: false,
  },
  {
    path: routeNames.HOME,
    component: Home,
    permissions: [], // ['user', 'admin'] this logic will be checked on private route
    children: [],
  },
  {
    path: routeNames.MASTER_DATA,
    component: NotFound,
    permissions: [], // ['user', 'admin'] this logic will be checked on private route
    children: [],
  },
  {
    path: routeNames.RESTRICTED,
    component: Restricted,
  },
  {
    path: routeNames.NOT_FOUND,
    component: NotFound,
  },
  {
    path: routeNames.PET_INFORMATION,
    component: PetInformation,
  },
  {
    path: routeNames.APPOINMENTS,
    component: Appoinments,
  },
  {
    path: routeNames.ORDERS,
    component: Orders,
  },
  {
    path: routeNames.PRODUCT,
    component: Products,
  },
  {
    path: routeNames.MANAGE_VACCINE,
    component: ManageVaccine,
  },
  {
    path: routeNames.EVENT,
    component: Event,
  },
];
