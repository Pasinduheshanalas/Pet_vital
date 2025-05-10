import axios from "axios";
import {
  DefaultHeaders,
  LOADER_IGNORED_URLS,
  RequestInfo,
} from "./requestConfigurations";
// import {store} from "../../redux/store";
// import { processNetworkRequests } from "../../pages/home/redux/reducer/commonDataSlice";

let isRefreshing = false;
let failedQueue = [];
const requestQueue: any[] = [];

const AxiosInstance = axios.create({
  baseURL: RequestInfo.BASE_URL,
  timeout: RequestInfo.REQUEST_TIMEOUT,
  headers: DefaultHeaders,
});

/**
 * Intercepting the request
 */
AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = "";

    if (token && !config?.headers?.authorization) {
      config.headers.authorization = `Bearer ${token}`;
    }

    pushRequestQueue(config);

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * Intercepting the response
 */
AxiosInstance.interceptors.response.use(
  function (response) {
    popRequestQueue(response.request.responseURL);

    return response;
  },
  function (error) {
    popRequestQueue(error?.config?.url);

    const config = error?.config;
    const status = error?.response?.status;
    const data = error?.response?.data;

    const originalRequest = config;

    // if (status === ApiConstants.REQUEST_UNAUTHORIZED && !originalRequest._retry) {
    //     if (!isRefreshing && !unauthorizedErrorIgnoredURL.includes(config?.url)) {
    //         originalRequest._retry = true;
    //         isRefreshing = true;

    //         return new Promise((resolve, reject) => {
    //             return tokenRefreshRequest(resolve, reject);
    //         })
    //             .then((newAccessToken) => {
    //                 originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
    //                 return AxiosInstance(originalRequest);
    //             })
    //             .catch((error) => {
    //               console.log(error)
    //                 //processQueue(error, null);
    //                 //expireUserSession(true);
    //                 return Promise.reject({status, data});
    //             })
    //             .finally(() => {
    //                 isRefreshing = false;
    //             });
    //     } else {
    //         if (unauthorizedErrorIgnoredURL.includes(config?.url)) {
    //           return Promise.reject({status, data});
    //         } else {
    //           return new Promise((resolve, reject) => {
    //             failedQueue.push({ resolve, reject });
    //           })
    //             .then(() => {
    //               return AxiosInstance(originalRequest);
    //             })
    //             .catch((e) => {
    //               return Promise.reject(e);
    //             });
    //         }
    //     }
    // } else {
    //     return Promise.reject(data);
    // }
  }
);

// use to pop request queue
const popRequestQueue = (requestURL: any) => {
  let urlContent = requestURL.replace(RequestInfo.BASE_URL, "");
  urlContent = urlContent.split("?")[0];
  if (urlContent.endsWith("/")) {
    urlContent = urlContent.substring(0, urlContent.indexOf("/"));
  }
  console.log(urlContent);
  if (!LOADER_IGNORED_URLS.includes(urlContent)) {
    requestQueue.pop();
    if (requestQueue.length === 0) {
      //   store.dispatch(processNetworkRequests(false));
    }
  }
};

// use to push request queue
const pushRequestQueue = (config: any) => {
  let urlContent = config.url.replace(RequestInfo.BASE_URL, "");
  urlContent = urlContent.split("?")[0];
  if (urlContent.endsWith("/")) {
    urlContent = urlContent.substring(0, urlContent.indexOf("/"));
  }
  console.log(urlContent);
  if (!LOADER_IGNORED_URLS.includes(urlContent)) {
    if (requestQueue.length === 0) {
      //   store.dispatch(processNetworkRequests(true));
    }
    requestQueue.push(config);
  }
};

export default AxiosInstance;
