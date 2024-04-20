import axios from "axios";
import { storage } from "../utils/storage";
import { server } from "../constants";

const prefix = "/api";
export const SERVER_URL = server.url + prefix;
const API_BASE_URL = 'https://api.videosdk.live/v2';

const jwtInterceoptor = axios.create({});

const createMeeting = async ({token}) => {
  const url = `${API_BASE_URL}/rooms`;
  const options = {
    method: 'POST',
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  };

  const {roomId} = await fetch(url, options)
    .then(response => response.json())
    .catch(error => console.error('error', error));

  console.log('room', roomId);
  return roomId;
};

jwtInterceoptor.interceptors.request.use(async (config) => {
  let tokens = await storage.getItem("tokens");
  if (tokens && tokens)
    config.headers.set("Authorization", `Bearer ${tokens.accessToken}`);
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      if (error.response.status === 401) {
        const tokens = await storage.getItem("tokens");

        if (tokens && tokens.accessToken && tokens.refreshToken) {
          const payload = {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          };
          let apiResponse = await axios.post(
            `${SERVER_URL}/api/auth/refreshtoken`,
            payload
          );
          await storage.setItem("tokens", apiResponse.data.tokens);
          error.config.headers.set(
            "Authorization",
            `Bearer ${apiResponse.data.tokens.accessToken}`
          );
        }
        return axios(error.config);
      } else {
        // await storage.removeItem("tokens");
        return Promise.reject(error);
      }
    } catch (e) {
      if (error.response.status == 401)
        console.error("error", e);
    }
  }
);

const login = (data) => {
  return axios.post(`${SERVER_URL}/auth/signin`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getPrograms = (index) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/allprograms/${index}`);
};

const getProgramsByPerformer = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/programsByPerformer/${id}`);
};

const reservProgram = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/reserve/${id}`);
};
const requestcancelProgram = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/requestcancel/${id}`);
};

const cancelProgram = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/cancel/${id}`);
};
const completeCProgram = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/complete/${id}`);
};

const getusers = () => {
  return jwtInterceoptor.get(`${SERVER_URL}/users`);
};
const getAllCategories = () => {
  return jwtInterceoptor.get(`${SERVER_URL}/allcategories`);
};

const getAllParentCategories = () => {
  return jwtInterceoptor.get(`${SERVER_URL}/parentcategories`);
};

const getCategoryArray = () => {
  return jwtInterceoptor.get(`${SERVER_URL}/categoryArray`);
};

const getPopularCategories = () => {
  return jwtInterceoptor.get(`${SERVER_URL}/popularCategories`);
};

const getSubCategories = (index) => {
  return jwtInterceoptor.post(`${SERVER_URL}/subcategories/${index}`);
};

const getReviewsByPost = (index) => {
  return jwtInterceoptor.get(`${SERVER_URL}/reviewbyPost/${index}`);
};

const getCProgramsByCategory = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/programsByCategory/${id}`);
};

const buycoins = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/customer/buycoins`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const createpaymentintent = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/customer/create-payment-intent`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const commitreview = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/customer/commitreview`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}



const getPerformer = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/upostowner`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const updateInterCategory = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/customer/updateInterCategory`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}


const follow = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/follow/${id}`)
}

const likepost = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/likepost/${id}`)
}
const uppost = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/uppost/${id}`)
}
const downpost = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/downpost/${id}`)
}

const getMeetingID = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/customer/getMeetingID/${id}`)
}



















// Performer

const getPerformerPrograms = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/performer/allprograms/${id}`)
};

const getPProgramsByCategory = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/performer/programsByCategory/${id}`);
};

const createProgram = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/performer/createProgram`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateProgram = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/performer/updateProgram`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteProgram = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/performer/deleteProgram/${id}`);
};

const getReservations = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/performer/reservusers/${id}`);
}

const createMeetingID = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/performer/createMeetingID`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const completePProgram = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/performer/complete/${id}`);
}

const approveReservation = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/performer/approve/${id}`);
}

const rejectionReservation = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/performer/cancel/${id}`);
}




const sendMessage = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/message`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getMessage = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/message/${id}`);
};



const unreadNumMessage = () => {
  return jwtInterceoptor.get(`${SERVER_URL}/message/unread`);
}


// chats

const getChats = () => {
  return jwtInterceoptor.get(`${SERVER_URL}/chats`);
}

const getNotifications = () => {
  return jwtInterceoptor.get(`${SERVER_URL}/notifications`);
}

const readNotification = (id) => {
  return jwtInterceoptor.get(`${SERVER_URL}/readNotification/${id}`);
}

const getChat = (id, post_id) => jwtInterceoptor.get(`${SERVER_URL}/chat/?id=${id}&post_id=${post_id}`);









const signup = (data) => {
  return axios.post(`${SERVER_URL}/auth/signup`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const loginGoogle = (data) =>
  axios.post(`${SERVER_URL}/api/auth/loginGoogle`, data);
const signupGoogle = (data) =>
  jwtInterceoptor.post(`${SERVER_URL}/api/auth/registerGoogle`, data);

const verifyOtp = (otpCode) =>
  axios.get(`${SERVER_URL}/auth/verify-otp/${otpCode}`);

const resendOtpEmail = (email) =>
  axios.get(`${SERVER_URL}/auth/resend-otp-email/${email}`);

const forgot = (email) =>
  axios.get(`${SERVER_URL}/auth/forgot-password/${email}`);

const newpassword = (data) => {
  return axios.post(`${SERVER_URL}/auth/new-password`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateUser = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/user`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const updatePassword = (data) => {
  return jwtInterceoptor.post(`${SERVER_URL}/update-password`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

}


const updateProfile = (data) =>
  jwtInterceoptor.post(`${SERVER_URL}/api/user/updateUser`, data);

const createProfile = (data) =>
  jwtInterceoptor.post(`${SERVER_URL}/api/profile/`, data);
const getQuestions = () => jwtInterceoptor.get(`${SERVER_URL}/api/question`);
const getUser = (id) => jwtInterceoptor.get(`${SERVER_URL}/api/user/${id}/get`);
const getUsers = () => jwtInterceoptor.get(`${SERVER_URL}/api/user/all`);
const getProfile = (id) =>
  jwtInterceoptor.get(`${SERVER_URL}/api/profile/${id}`);


export const api = {
  createMeeting,
  login,
  getPrograms,
  getProgramsByPerformer,

  getusers,
  getAllCategories,
  getAllParentCategories,
  getPopularCategories,
  getSubCategories,
  getCProgramsByCategory,
  getCategoryArray,
  getReviewsByPost,

  buycoins,
  createpaymentintent,
  commitreview,
  updateInterCategory,


  follow,
  likepost,
  uppost,
  downpost,

  getReservations,
  getPerformer,
  reservProgram,
  requestcancelProgram,
  cancelProgram,
  completeCProgram,

  approveReservation,
  rejectionReservation,



  getPerformerPrograms,
  getPProgramsByCategory,
  createProgram,
  updateProgram,
  deleteProgram,
  createMeetingID,
  getMeetingID,
  completePProgram,



  loginGoogle,
  signup,
  signupGoogle,
  verifyOtp,
  newpassword,
  resendOtpEmail,
  forgot,
  updateProfile,
  updateUser,
  updatePassword,
  getQuestions,
  getUser,
  getUsers,
  getProfile,
  createProfile,

  getChats,
  getNotifications,
  getChat,
  readNotification,

  getMessage,
  sendMessage,
  unreadNumMessage,

};
