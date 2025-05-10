// request basic info
import {USER_API} from "../apiEndPoints/testAPI";

export const RequestInfo = {
  BASE_URL: process.env.REACT_APP_API_URL,
  REQUEST_UNAUTHORIZED:401,
  REQUEST_TIMEOUT:4000
};

// default headers for a request
export const DefaultHeaders = {
  Accept: 'application/json',
  cache: 'no-cache',
  mode: 'cors',
  redirect: 'follow',
  referrer: 'no-referrer',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Content-Type': 'application/json',
  'x-user-agent': 'test',
}

// form related headers for a request
export const FormHeaders = {
  ...DefaultHeaders,
  'Content-Type': 'multipart/form-data',
}

// defined the urls, ignore the loading process
export const LOADER_IGNORED_URLS: string[] = [

];