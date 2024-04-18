import theme from "../theme/theme";

export const genderList = [
  {
    values: "male",
    label: "Male"
  },
  {
    value: "female",
    label: "Female"
  }
];

export const server = {
  url:"https://classical613.xsrv.jp",
  member_url:"https://classical613.xsrv.jp/uploads/member/",
  media_url:"https://classical613.xsrv.jp/uploads/media/",
  default_url:"https://classical613.xsrv.jp/uploads/default/",

  // url:"http://192.168.145.168:8000",
  // member_url:"http://192.168.145.168:8000/uploads/member/",
  // media_url:"http://192.168.145.168:8000/uploads/media/",
  // default_url:"http://192.168.145.168:8000/uploads/default/",
}

export const _stripe = {
  publishableKey:"pk_test_51OwkfdGpHywwHNAD3SI2q8c6R1GQgY9eDtuKdzQ51urcYSvIACjvST0NNwySHgHybsi5e0sSLwssyx683LUsW4L1000ed2aOTX",
  secretKey:"sk_test_51OwkfdGpHywwHNADAWKssVY7c5rP6ZZ9t88E74sDulU4BInXwjjE4yYz9yIM9tSDD17zTLfk7ycPFC0F6zJDgyTr00OGTzXdgU",
}

export const _pusher = {
  apiKey:"fe31b5e33741a955cd6b",
  cluster:"ap1",
}

export const images = {
  sendmessage: require("../../assets/img/sendmessage.png"),
  media: require("../../assets/img/media.png"),
  google: require("../../assets/img/Google.png"),
  facebook: require("../../assets/img/fb.png"),
  plus: require("../../assets/img/plus.png"),
  edit: require("../../assets/img/edit.png"),
  success: require("../../assets/img/success.png"),
  notification: require("../../assets/img/notification.svg"),
}

