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

export const tips = [
  {
    "name": "heart",
    "point": 10,
    "image": "heart.png"
  },
  {
    "name": "musical_note",
    "point": 10,
    "image": "musicnote.png"
  },
  {
    "name": "star",
    "point": 10,
    "image": "star.png"
  },
  {
    "name": "cake",
    "point": 33,
    "image": "cake.png"
  },
  {
    "name": "cookie_tin",
    "point": 33,
    "image": "cookie.png"
  },
  {
    "name": "chocolate_box",
    "point": 33,
    "image": "chocolate.png"
  },
  {
    "name": "love_letter",
    "point": 33,
    "image": "loveletter.png"
  },
  {
    "name": "clap",
    "point": 111,
    "image": "clap1.png"
  },
  {
    "name": "cracker",
    "point": 222,
    "image": "cracker.png"
  },
  {
    "name": "musical_note_shower",
    "point": 222,
    "image": "musicnoteshower.png"
  },
  {
    "name": "star_shower",
    "point": 222,
    "image": "starshower.png"
  },
  {
    "name": "heart_shower",
    "point": 222,
    "image": "heartshower.png"
  },
  {
    "name": "jewelry_shower",
    "point": 222,
    "image": "jewelryshower.png"
  },
  {
    "name": "flower_shower",
    "point": 222,
    "image": "flowershower.png"
  },
  {
    "name": "dog_stuffed_animal",
    "point": 777,
    "image": "dogstuffed.png"
  },
  {
    "name": "cat_stuffed_toy",
    "point": 777,
    "image": "catstuffed.png"
  },
  {
    "name": "kuma_stuffed",
    "point": 777,
    "image": "kumastuffed.png"
  },
  {
    "name": "rose_bouquet",
    "point": 1555,
    "image": "rosebouquet.png"
  },
  {
    "name": "colorful_bouquet",
    "point": 1555,
    "image": "colorfulbouquet.png"
  },
  {
    "name": "bouquet",
    "point": 1555,
    "image": "bouquet.png"
  },
  {
    "name": "jewelry_bouquet",
    "point": 1555,
    "image": "jewelrybouquet.png"
  }
]

export const server = {
  // url: "https://classical613.xsrv.jp",
  // member_url: "https://classical613.xsrv.jp/uploads/member/",
  // media_url: "https://classical613.xsrv.jp/uploads/media/",
  // default_url: "https://classical613.xsrv.jp/uploads/default/",
  // category_url: "https://classical613.xsrv.jp/uploads/category/",

  url: "http://192.168.144.107:8000",
  member_url: "http://192.168.144.107:8000/uploads/member/",
  media_url: "http://192.168.144.107:8000/uploads/media/",
  default_url: "http://192.168.144.107:8000/uploads/default/",
  category_url: "http://192.168.144.107:8000/uploads/category/",
}

export const _stripe = {
  publishableKey: "pk_test_51OwkfdGpHywwHNAD3SI2q8c6R1GQgY9eDtuKdzQ51urcYSvIACjvST0NNwySHgHybsi5e0sSLwssyx683LUsW4L1000ed2aOTX",
  secretKey: "sk_test_51OwkfdGpHywwHNADAWKssVY7c5rP6ZZ9t88E74sDulU4BInXwjjE4yYz9yIM9tSDD17zTLfk7ycPFC0F6zJDgyTr00OGTzXdgU",
}

export const _pusher = {
  apiKey: "fe31b5e33741a955cd6b",
  cluster: "ap1",
}

export const videosdk = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2YzU4Zjg2Zi0zNWUyLTQxZGQtOTZiOC00YzZlZjg1ZmNlMmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNDIzMDkzOSwiZXhwIjoxNzE0ODM1NzM5fQ.6EyoDVUpod4t2D2ofL3X0uYLI0aFqD3wkUlnhlPGPGE",
}

export const images = {
  logo: require("../../assets/img/apple-icon.png"),
  sendmessage: require("../../assets/img/sendmessage.png"),
  media: require("../../assets/img/media.png"),
  google: require("../../assets/img/Google.png"),
  facebook: require("../../assets/img/fb.png"),
  plus: require("../../assets/img/plus.png"),
  edit: require("../../assets/img/edit.png"),
  success: require("../../assets/img/success.png"),
  // notification: require("../../assets/img/notification.svg"),
}

