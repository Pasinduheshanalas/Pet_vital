export interface RouteInfo {
    path: string;
    component: any;
    permissions?: string[];
    children?: RouteInfo[]
}