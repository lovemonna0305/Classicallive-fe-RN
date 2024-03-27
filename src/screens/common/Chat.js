import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AppBar, Spacer } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import themeContext from "../../theme/themeContex";
import { SafeAreaView } from "react-native-safe-area-context";


import io from "socket.io-client";
import { api } from "../../api";

let socket, selectedChatCompare;

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Chat() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user } = useSelector((state) => state.auth);


  const fetchMessages = async () => {
    // if (!selectedChat) return;
    console.log('chat data');

    try {
      setLoading(true);


      const { data } = await api.selectChats(user._id);
      console.log('--------------->data', data);

      // if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      // setSelectedChat(data);

      // const { data1 } = await api.get(`/api/v1/message/${selectedChat._id}`);

      // setMessages(data1);
      // setLoading(false);
      // socket.emit("join-chat", selectedChat._id);
    } catch (error) {
      toast.error(error);
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop-typing", selectedChat._id);
      try {
        const { data } = await api.post(`/api/v1/message/`, {
          message: newMessage,
          chatId: selectedChat._id,
        });

        setNewMessage("");
        socket.emit("new-message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    // socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
    socket = io('http://localhost:5000/');
    socket.emit("setup", user);

    fetchMessages();

    socket.on("connected", () => setSocketConnected(true));

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });


  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 10 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000' : '#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false} /> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="Edward Alesky"
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity
              onPress={() => navigation.navigate("Messagedelete")}
            >
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: Colors.secondary }}
                color="black"
                size={40}
              />
            </TouchableOpacity>
          }
        />




        {/* <View style={{ paddingTop: 20, flexDirection: "row" }}>
          <Avatar.Image
            source={require("../../assets/image/chat1.png")}
            size={40}
          />
          <Image
            source={require("../../assets/image/bluedot.png")}
            style={{
              height: 10,
              width: 10,
              marginTop: 50,
              marginLeft: 30,
              position: "absolute",
            }}
          />
          <View style={{ marginLeft: 15 }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                backgroundColor: Colors.bord,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <Text style={[style.subtxt, { color: Colors.disable }]}>
                Lorem ipsum dolor sit et,
              </Text>
              <Text style={[style.subtxt, { color: Colors.disable }]}>
                {" "}
                consectetur adipiscing.
              </Text>
            </View>
            <Text
              style={{
                color: "#9CA4AB",
                marginTop: 5,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              15:42 PM
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 20,
            justifyContent: "flex-end",
          }}
        >
          <View style={{ marginRight: 15 }}>
            <View
              style={{
                backgroundColor: Colors.primary,
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 25,
              }}
            >
              <Text
                style={{ color: Colors.secondary, fontFamily: "Plus Jakarta Sans" }}
              >
                Lorem ipsum dolor sit et
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  color: "#9CA4AB",
                  marginTop: 5,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                15:42 PM
              </Text>
            </View>
          </View>
          <Avatar.Image
            source={require("../../assets/image/chat2.png")}
            size={40}
            // style={{alignItems:'flex-end'}}
          />
        </View>
        <View style={{ paddingTop: 20, flexDirection: "row" }}>
          <Avatar.Image
            source={require("../../assets/image/chat1.png")}
            size={40}
          />
          <Image
            source={require("../../assets/image/bluedot.png")}
            style={{
              height: 10,
              width: 10,
              marginTop: 50,
              marginLeft: 30,
              position: "absolute",
            }}
          />
          <View style={{ marginLeft: 15 }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                backgroundColor: Colors.bord,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <Text style={[style.subtxt, { color: Colors.disable }]}>
                Lorem ipsum dolor sit et,
              </Text>
              <Text style={[style.subtxt, { color: Colors.disable }]}>
                {" "}
                consectetur adipiscing.
              </Text>
            </View>
            <Text
              style={{
                color: "#9CA4AB",
                marginTop: 5,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              15:42 PM
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: theme.chat,
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 20,
              justifyContent: "space-between",
              borderColor: Colors.bord,
              borderWidth: 1,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={[style.subtxt, { color: Colors.disable }]}>
              Type your message...
            </Text>
            <Avatar.Icon
              icon="near-me"
              color="#FE970F"
              size={40}
              style={{ backgroundColor: Colors.secondary }}
            />
          </View>
        </View> */}

      </View>


    </SafeAreaView>
  );
}
