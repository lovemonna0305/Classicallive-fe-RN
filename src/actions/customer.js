import { api } from "../api";
import jwtDecode from "jwt-decode";
import { storage } from "../utils/storage";
import Toast from "react-native-toast-message";



export const getPrograms = async (index) => {
    const res = await api.getPrograms(index);
    if (res.data.success) {
        if (index == 1) {
            global.cPrograms = res.data.data.programs;
        } else if (index == 2) {
            global.cHPrograms = res.data.data.programs;
        }
        return res.data.data.programs;
    } else {
        return [];
    }
};

export const getProgramsByPerformer = async (id) => {
    global.isLoading = true;
    const res = await api.getProgramsByPerformer(id);
    if (res.data.success) {
        global.cCPrograms = res.data.data.programs;
        return res.data.data.programs;
    } else {
        return [];
    }
};

export const getPerformer = async (data) => {
    global.isLoading = true;
    try {
        const res = await api.getPerformer(data);
        if (res.data.success) {
            dispatch({ type: GET_PERFORMER, payload: res.data.data });
        } else {
            // dispatch({ type: LOGIN_FALIED });
            dispatch({
                type: SET_COMMON_STATUS,
                payload: [false, true, "server_error"],
            });
        }
    } catch (err) {
        // dispatch({ type: LOGIN_FALIED });
        dispatch({
            type: SET_COMMON_STATUS,
            payload: [false, true, "server_error"],
        });
    }
};

export const reservProgram = async (data, coins) => {
    const res = await api.reservProgram(data.id);
    return res.data.success;
};

export const cancelProgram = async (id) => {
    const res = await api.cancelProgram(id);
    if (res.data.success) {
        return true;
    } else {
        return false;
    }

};
export const requestcancelProgram = async (id) => {
    const res = await api.requestcancelProgram(id);
    return res;
};
export const completeProgram = async (id) => {
    global.isLoading = true;
    try {
        const res = await api.completeCProgram(id);
        if (res.data.success) {
        } else {
        }

    } catch (error) {
    }
};

export const buycoins = async (data) => {
    return await api.buycoins(data);
};

export const fetchPaymentIntentClientSecret = async (data) => {
    return await api.createpaymentintent(data);
};

export const commitReview = async (data, program) => {
    const res = await api.commitreview(data);
    return res.data.success;
};

export const getCProgramsByCategory = async (id) => {
    const res = await api.getCProgramsByCategory(id);
    return res.data.data;
};

export const followuser = async (data) => {
    const res = await api.follow(data.member.id);
    if (res.data.success) {
        data.member.is_follow = res.data.data.member.is_follow;
        data.member.followers = res.data.data.member.followers;
        return res.data.data.member.is_follow;
    } else {
        return data;
    }
};

export const likepost = async (data) => {
    const res = await api.likepost(data.id);
    if (res.data.success) {
        data.is_liked = res.data.data.is_liked;
        data.likes = res.data.data.likes;
        return res.data.data.is_liked;
    } else {
        return false;
    }
};

export const uppost = async (data) => {
    const res = await api.uppost(data.id);
    if (res.data.success) {
        data.is_up = res.data.data.is_up;
        data.ups = res.data.data.ups;
        return res.data.data.is_up;
    } else {
        return data;
    }
};

export const downpost = async (data) => {
    const res = await api.downpost(data.id);
    if (res.data.success) {
        data.is_down = res.data.data.is_down;
        data.downs = res.data.data.downs;
        return res.data.data.is_down;
    } else {
        return data;
    }
};

export const updateInterCategory = async (ids, data) => {
    const res = await api.updateInterCategory(ids);
    return res.data.success;
};