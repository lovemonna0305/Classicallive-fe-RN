// import { api } from "../../api";
// import jwtDecode from "jwt-decode";
// import { storage } from "../../utils/storage";
// import Toast from "react-native-toast-message";
// import { t } from "i18next";

import { storage } from "../utils/storage";

// export const login = (data) => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     const res = await api.login(data);
//     if (res.data.success) {
//       await storage.setItem("tokens", res.data.data.tokens);
//       dispatch({ type: LOGIN_SUCCESS, payload: res.data.data.user });

//     } else {
//       dispatch({ type: LOGIN_FALIED });
//       dispatch({
//         type: SET_COMMON_STATUS,
//         payload: [false, true, "server_error"],
//       });
//     }
//   } catch (err) {
//     dispatch({ type: LOGIN_FALIED });
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

// export const updateInterCate = (data) => async (dispatch) => {
//   global.isLoading=true;
//   try {

//     dispatch({ type: LOGIN_SUCCESS, payload: res.data.data.user });

//   } catch (err) {
//     dispatch({ type: LOGIN_FALIED });
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

// export const loginGoogle = (data) => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     const res = await api.loginGoogle(data);
//     await storage.setItem("access_token", res.data.access_token);
//     dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
//   } catch (err) {
//     dispatch({ type: LOGIN_FALIED });
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, "server_error"],
//     });
//   }
// };

// export const verifyOtp = (otp, setVisible) => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     const res = await api.verifyOtp(otp);
//     if (res.data.success) {
//       await storage.setItem("access_token", res.data.access_token);
//       dispatch({ type: LOGIN_SUCCESS, payload: user });
//       Toast.show({
//         type: "sucess",
//         text1: "Success",
//         text2: t(res.data.message),
//       });
//       setVisible(true);
//     } else {
//       Toast.show({
//         type: "error",
//         text1: "OTP is incorrect",
//         text2: t(res.data.message),
//       });
//       dispatch({
//         type: SET_COMMON_STATUS,
//         payload: [false, true, err.response.data.message],
//       });
//     }
//   } catch (err) {
//     Toast.show({
//       type: "error",
//       text1: "OTP is incorrect",
//       text2: "Please provide correct 4 digits.",
//     });
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

// export const updateProfile = (id, data, navigation) => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     const res = await api.updateProfile(id, data);
//     dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
//     navigation.navigate("Home");
//   } catch (err) {
//     Toast.show({
//       type: "error",
//       text1: "Server error",
//       text2: "Please check your internet connection.",
//     });
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

// export const createProfile = (data) => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     const res = await api.createProfile(data);
//     dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
//   } catch (err) {
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

// export const getUser = (id) => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     const res = await api.getUser(id);
//     dispatch({ type: GET_CURRENT_USER, payload: res.data.user });
//   } catch (err) {
//     Toast.show({
//       type: "error",
//       text1: "Server error",
//       text2: err.response.data.message,
//     });
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

// export const getFlexers = () => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     const res = await api.getUsers();

//     dispatch({ type: GET_FLEXERS, payload: res.data.users });
//   } catch (err) {
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

// export const getfriendrequests = (data) => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     const res = await api.getfriendrequests(data);
//     dispatch({ type: GET_FRIENDREQUEST, payload: res.data });
//   } catch (err) {
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

// export const setNumMessage = (data) => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     dispatch({ type: SET_NUM_MESSAGE, payload: data });
//   } catch (err) {
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

// export const updateUser = async (ids, data) => {
//     // only update Interesting Categories
//     const res = await api.updateInterCategory(ids);
//     if(res.data.success){

//     } else {

//     }
// };

// export const setNumNotification = (numMessages, friendRequests) => async (dispatch) => {
//     global.isLoading=true;
//     try {

//       let numNotification = 0;
//       for await (let numMessage of numMessages) {
//         numNotification += numMessage.num;
//       }
//       numNotification += friendRequests.length;
//       dispatch({ type: SET_NUM_NOTIFICATION, payload: numNotification });
//     } catch (err) {
//       console.error(err);
//     }
//   };

// export const getProfile = (id) => async (dispatch) => {
//   global.isLoading=true;
//   try {
//     const res = await api.getProfile(id);
//     dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
//   } catch (err) {
//     dispatch({
//       type: SET_COMMON_STATUS,
//       payload: [false, true, err.response.data.message],
//     });
//   }
// };

export const logout = async () => {
    global.isLoading = true;
    storage.removeItem('currentUser');
    storage.removeItem('tokens');
    global.isLoading = true;
    global.currentUser = {};
    global.program = {};
    global.notifications = {};
    global.numNotification = 0;
    global.users = {};
    global.allcategories = {};
    global.allparentcategories = {};
    global.popularcategories = {};
    global.subcategories = {};
    global.categoryArray = {};
    global.pCategory = 1;
    global.reviews = {};
    global.pPrograms = {};
    global.pHPrograms = {};
    global.pCPrograms = {};
    global.pPPrograms = {};
    global.pPPrograms = {};
    global.pPendingPoints = 0;
};
