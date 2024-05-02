import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions
} from "react-native";

import Pusher from 'pusher-js/react-native';

import React, { useState, useContext, useEffect, useRef } from "react";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import io from "socket.io-client";
import { api } from "../../api";
import { getChats, setNumMessages } from "../../actions/common";

import { _pusher, images, server } from "../../constants";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";

export default function CustomerLiveChat({ route }) {
  const { changeStore, store } = useStore();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const currentUser = store.currentUser;


  const scrollViewRef = useRef(null);

  const { id, member } = route.params;

  const getTimeAgo = (timestamp) => {
    var time = new Date(timestamp).getTime();
    var currentTime = new Date().getTime();
    var diff = currentTime - time;

    if (diff < 60000) {
      return "just now";
    } else if (diff < 3600000) {
      var minutes = Math.floor(diff / 60000);
      return minutes === 1 ? "1 min ago" : minutes + " mins ago";
    } else if (diff < 86400000) {
      var hours = Math.floor(diff / 3600000);
      return hours === 1 ? "1 hour ago" : hours + " hours ago";
    } else {
      return new Date(time).toLocaleDateString();
    }
  };

  const fetchMessages = async () => {
    changeStore({ ...store, isLoading: true });
    try {
      const { data } = await api.getMessage(id);
      setMessages(data.data.messages);
      changeStore({ ...store, isLoading: false });
      // socket.emit("join-chat", selectedChat);

    } catch (error) {
      console.log("error", error);
      changeStore({ ...store, isLoading: false });
    }
  };

  useEffect(() => {

    const pusher = new Pusher('fe31b5e33741a955cd6b', {
      cluster: 'ap1',
      encrypted: true
    });

    const channel = pusher.subscribe('channel');
    channel.bind('my-event', (data) => {
      if ((data.chat_id == id) && (data.sender_id != currentUser.id)) {
        setMessages(messages => [...messages, data]);
      }
    });

    // // socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
    // socket = io('http://localhost:8000/');
    // socket.emit("setup", currentUser);   //This is error,
    // fetchMessages();
    // socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop-typing", () => setIsTyping(false));
    // // Add code for message Received
    // socket.on("message-received", (newMessageReceived) => {
    //   if (
    //     !selectedChatCompare ||
    //     selectedChatCompare._id !== newMessageReceived.chat._id
    //   ) {
    //     // notification
    //     // if (!notification.includes(newMessageReceived)) {
    //     //   setNotification([newMessageReceived, ...notification]);
    //     //   setFetchAgain(!fetchAgain);
    //     // }
    //   } else {
    //     setMessages([...messages, newMessageReceived]);
    //   }
    // });
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const sendMessage = async (e) => {
    // socket.emit("stop-typing", selectedChat._id);
    try {
      let formdata = new FormData();
      formdata.append("sender_id", currentUser.id);
      formdata.append("chat_id", id);
      formdata.append("message", newMessage);
      const { data } = await api.sendMessage(formdata);
      setNewMessage("");
      setMessages([...messages, data.data.message]);

      // socket.emit("new-message", data);
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };

  const localstyle = StyleSheet.create({
    receivedmessage: {
      padding: 15,
      backgroundColor: Colors.disable,
      borderRadius: 10,
      width: width / 2 + 10,
      marginTop: 20,
    },
    sendmessage: {
      flex: 1,
      padding: 15,
      backgroundColor: theme.itembackground,
      borderRadius: 10,
      width: width / 2 + 10,
      textAlign: "right",
      alignSelf: "flex-end",
      marginTop: 20,
    },
    receviedtextstyle: {
      fontSize: 16,
      color: theme.txt,
    },
    senttextstyle: {
      fontSize: 16,
      color: theme.txt,
    },
  });
  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        {store.isLoading && (
          <Spinner />
        )}
        <AppBar
          color={theme.bg}
          elevation={0}
          leading={
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                onPress={async () => {
                  navigation.goBack();
                }}
              >
                <Avatar.Icon
                  icon="arrow-left"
                  style={{ backgroundColor: theme.bg }}
                  color={theme.txt}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("friend profile")}>
                <Avatar.Image
                  source={{ uri: server.member_url + currentUser.image_file }}
                  style={{
                    backgroundColor: Colors.secondary,
                    position: "relative",
                  }}
                  color="black"
                  size={40}
                />
                {/* <View style={{
                  backgroundColor: "#38A169", width: 15, height: 15, borderRadius: 15, borderWidth: 2, borderColor: theme.txt,
                  position: "absolute", top: 58, right: 10
                }}>
                </View> */}
              </TouchableOpacity>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: 700, color: theme.txt }}>
                  {member.name}{" "}
                </Text>
                {/* <Text style={{ fontSize: 14, color: theme.txt }}>Online </Text> */}
              </View>
              {/* <TouchableOpacity>
                <Icon name="create-outline" size={30} style={{ marginTop: 30, marginLeft: 100 }}></Icon>
              </TouchableOpacity> */}
            </View>
          }
        />

        <ScrollView
          style={{ marginTop: 10 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <View style={{ padding: 20, borderRadius: 30 }}>
            {messages &&
              messages.map((item, i) => (
                <View key={item.id}>
                  {item.sender_id === currentUser.id ? (
                    <TouchableOpacity style={localstyle.sendmessage}>
                      <Text style={localstyle.senttextstyle}>
                        {item.message}
                      </Text>
                      <Text style={{ textAlign: "right", fontSize: 10, color: Colors.bord, paddingTop: 5 }}>
                        {getTimeAgo(item.updated_at)}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={localstyle.receivedmessage}>
                      <Text style={localstyle.receviedtextstyle}>
                        {item.message}
                      </Text>
                      <Text style={{ textAlign: "right", fontSize: 10, color: Colors.bord, paddingTop: 5 }}>
                        {getTimeAgo(item.updated_at)}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
            marginTop: 20,
          }}
        >
          {/* <TouchableOpacity>
            <Image source={require('../assets/image/camera.png')} style={{ marginTop: 13 }}></Image>
          </TouchableOpacity> */}
          <TextInput
            style={{
              backgroundColor: theme.bg,
              width: "90%",
              height: 50,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: "#E3E7EC",
              paddingLeft: 20,
              fontSize: 17,
              position: "relative",
              color: theme.txt,
            }}
            placeholderTextColor={theme.txt}
            placeholder="Send messages ..."
            value={newMessage}
            onChangeText={(e) => setNewMessage(e)}
          ></TextInput>
          {/* <TouchableOpacity style={{ position: "absolute", left: 45, top: 9 }}>
            <Icon name="mic-outline" size={30} style={{ color: "#4A6C00", }}></Icon>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => sendMessage()}>
            <Image
              source={images.sendmessage}
              style={{ marginTop: 13 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
