import { api } from "../api";
import jwtDecode from "jwt-decode";
import { storage } from "../utils/storage";
import Toast from "react-native-toast-message";

export const setProgram = (data) => {
  global.isLoading = true;
  global.program = data;
};

export const setLoading = (data) => {
  global.isLoading = true;
  global.isLoading = data;
};

export const setMessageNotification = async (numMessages) => {
  global.isLoading = true;
  try {
    let numNotification = 0;
    for await (let numMessage of numMessages) {
      numNotification += numMessage.num;
    }
    global.numNotification = numNotification;
  } catch (err) {
    console.error(err);
  }
};

export const setNumMessages = async () => {
  global.isLoading = true;
  try {
    const res = await api.unreadNumMessage();
    // let numMessages = 0;
    // for await (let numMessage of data) {
    //   numMessages += numMessage.num
    // }
    // dispatch({ type: SET_NUM_MESSAGES, payload: { numMessages: numMessages, unReadMessages: data } });
    // dispatch({ type: SET_NUM_MESSAGES, payload: { numMessages: numMessages, unReadMessages: data } });
  } catch (err) {
    console.error(err);
  }
};

export const getChats = async () => {
  global.isLoading = true;
  try {
    const res = await api.getChats();
    if (res.data.success) {
      global.chats = res.data.data;
      return res.data.data;
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
  }
};

export const getNotifications = async () => {

  const res = await api.getNotifications();
  return res.data.data;
};

export const getChat = async (id, post_id) => {
  global.isLoading = true;
  try {
    const res = await api.getChat(id, post_id);
    // if (res.data.success) {

    //   dispatch({ type: GET_CHAT, payload: res.data.data });
    // } else {
    //   dispatch({
    //     type: SET_COMMON_STATUS,
    //     payload: [false, true, "server_error"],
    //   });
    // }
  } catch (err) {
    console.error(err);
  }
};

export const getusers = async () => {
  const res = await api.getusers();
  if (res.data.success) {
    return res.data.data;
  } else {
    return [];
  }
};

export const getAllCategories = async () => {
  global.isLoading = true;
  try {
    const res = await api.getAllCategories();
    if (res.data.success) {
      global.allcategories = res.data.data;
    } else {
      console.log(res.data.success);
    }
  } catch (err) {
    console.error(err);
  }
};

export const getAllParentCategories = async () => {
  const res = await api.getAllParentCategories();
  if (res.data.success) {
    global.allparentcategories = res.data.data;
    return res.data.data;
  } else {
    return [];
  }
};

export const getPopularCategories = async () => {
  global.isLoading = true;
  try {
    const res = await api.getPopularCategories();
    if (res.data.success) {
      global.popularcategories = res.data.data;
    } else {
      console.log(res.data.success);
    }
  } catch (err) {
    console.error(err);
  }
};

export const getCategoryArray = async (data) => {
  const res = await api.getCategoryArray();
  if (res.data.success) {
    global.categoryArray = res.data.data;
    return res.data.data;
  } else {
    return [];
  }
};

export const getSubCategory = async (id) => {
  global.isLoading = true;
  try {
    const res = await api.getSubCategories(id);
    if (res.data.success) {
      global.subcategories = res.data.data;
    } else {
      console.log(res.data.success);
    }
  } catch (err) {
    console.error(err);
  }
};

export const getReviewsByPost = async (id) => {
  const res = await api.getReviewsByPost(id);
  if (res.data.success) {
    return res.data.data;
  } else {
    return [];
  }
};

export const setCategory = async (data) => {
  global.isLoading = true;
  try {
    global.pCategory = data;
  } catch (err) {
    console.error(err);
  }
};
