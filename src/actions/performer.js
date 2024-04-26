import { api } from "../api";
import jwtDecode from "jwt-decode";
import { storage } from "../../utils/storage";
import Toast from "react-native-toast-message";


export const getPrograms = async (index) => {

  global.isLoading = true;
  try {
    const res = await api.getPerformerPrograms(index);
    if (res.data.success) {
      if (index == 1) {
        global.pPrograms = res.data.data.programs;
      } else if (index == 2) {
        global.pHPrograms = res.data.data.programs;
      } else if (index == 3) {
        // dispatch({ type: GET_C_CPROGRAMS, payload: res.data.data.programs });
      }
      return res.data.data.programs;
    } else {
      return [];
    }
  } catch (err) {
  }
};

export const getPProgramsByCategory = async (id) => {
  global.isLoading = true;
  const res = await api.getPProgramsByCategory(id);
  if (res.data.success) {
    global.pCPrograms = res.data.data.programs;
    return res.data.data.programs;
  } else {
    return [];
  }

};

export const getReservations = async (id) => {
  const res = await api.getReservations(id);
  if (res.data.success) {
    return res.data.data;
  } else {
    return [];
  }

};

export const completeProgram = async (id) => {
  const res = await api.completePProgram(id);
  if (res.data.success) {
    global.pPendingPoints = res.data.data;
    return res.data.data;
  } else {
    return 0;
  }
};

export const approveReservation = async (id) => {
  global.isLoading = true;
  try {
    const res = await api.approveReservation(id);
    if (res.data.success) {

    } else {

    }
  } catch (err) {

  }
};

export const rejectionReservation = async (id) => {
  const res = await api.rejectionReservation(id);
  return res;
};

export const createProgram = async (data) => {
  const res = await api.createProgram(data);
  return res;
};

export const updateProgram = async (data) => {
  const res = await api.updateProgram(data);
  return res;
};

export const deleteProgram = async (id) => {
  const res = await api.deleteProgram(id);
  return res.data.success;
};
