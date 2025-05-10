// import { AUTH_API } from "./../../service/apiEndPoints/authAPI";
// import { saveToken, saveRefreshToken } from "../../storages/localStorage";
// import axios from "axios";
// import { AuthService } from "../../service/httpConfiguration/superInterceptor";

// AuthService functions
// const authService = {
//     login: async (email: any, password: any) => {
//         try {
//             const response = await AxiosInstance.post(AUTH_API.LOGIN_AUTH, { email, password });
//             const { accessToken, refreshToken } = response.data;

//             // Save tokens
//             saveToken(accessToken);
//             saveRefreshToken(refreshToken);

//             return { accessToken };
//         } catch (error : any) {
//             throw error.response?.data?.message || 'Login failed';
//         }
//     },

//     //  add more auth-related services here, e.g., logout, refresh token, etc.
// };

// // AuthActions functions
// export const login = (email: string, password: string) => async (dispatch: any) => {
//     try {
//         dispatch({ type: 'LOGIN_REQUEST' });

//         const { accessToken } = await authService.login(email, password);

//         dispatch({
//             type: 'LOGIN_SUCCESS',
//             payload: { token: accessToken },
//         });

//         // Optionally, redirect after login
//         // history.push('/dashboard');
//     } catch (error : any) {
//         dispatch({
//             type: 'LOGIN_FAILURE',
//             payload: error,
//         });

//         if (error.response?.status === 401) {
//             // Handle unauthorized errors, e.g., redirect to login
//         }
//     }
// };

// export const logout = () => (dispatch: any) => {
//     // Remove tokens from storage
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('refreshToken');

//     // Dispatch logout action
//     dispatch({ type: 'LOGOUT' });

//     // Optionally, redirect to login
//     // history.push('/login');
// };

// AuthService functions
// const authService = {
//   login: async (email: string, password: string) => {
//     try {
//       const response = await AuthService.post(AUTH_API.LOGIN_AUTH, {
//         email,
//         password,
//       });
//       const { accessToken, refreshToken } = response.data?.data;
//       // Save tokens
//       saveToken(accessToken);
//       saveRefreshToken(refreshToken);

//       return { accessToken };
//     } catch (error: any) {
//       throw error.response?.data?.message || "Login failed";
//     }
//   },

//   // can add more auth-related services here, e.g., logout, refresh token, etc.
// };

// Exporting login function
export const loginUser = async (email: string, password: string) => {
  // try {
  //   const { accessToken } = await authService.login(email, password);
  //   return { accessToken };
  // } catch (error: any) {
  //   throw new Error(error || "Login failed");
  // }
};

// Exporting logout function
export const logoutUser = () => {
  // Remove tokens from storage
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userDetails");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userPermission");
};
