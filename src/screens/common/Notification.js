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
import { setNumMessages, getNotifications, setLoading } from "../../actions/common";

import { t } from "i18next";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";

export default function Notification() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    changeStore({...store, isLoading:true});
    (async () => {
      await getNotifications()
      .then(res=>{
        setNotifications(res.notifications);
        changeStore({...store, isLoading:false});
      }).catch(err=>{
        changeStore({...store, isLoading:false});
      });
    })();
 
  }, []);

  return (
    <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
      {/* <StatusBar
        backgroundColor={darkMode === true ? "#000" : "#fff"}
        barStyle={darkMode === true ? "light-content" : "dark-content"}
        translucent={false}
      /> */}
      <AppBar
        color={theme.bg}
        title={t("notification")}
        titleStyle={{ color: theme.txt }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color="white"
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <View style={{ flex: 1 }}>
        {store.isLoading && (
          <Spinner />
        )}
        {notifications && notifications.length > 0 ? (
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {notifications.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  paddingTop: 20,
                }}
                onPress={() => {
                  changeStore({ ...store, isLoading: true });
                  navigation.navigate("LiveChat", {
                    id: item.chat.id,
                    member: item.member,
                  });
                }}
              >
                <Avatar.Image source={{ uri: server.media_url + item.member.image_file }} />
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={[style.subtitle, { width: 180, color: theme.txt, fontSize: 16 }]}
                  >
                    {item.member.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      style.subtxt,
                      {
                        width: 210,
                        color: Colors.disable,
                        paddingTop: 8,
                        paddingRight: 5,
                      },
                    ]}
                  >
                    {(item.chat.last_message) ?? t("no_mes")}
                  </Text>

                </View>

                <View style={{ marginLeft: 10, width: width / 4, justifyContent: 'flex-end' }}>
                  <View
                    style={{
                      backgroundColor: (item.chat.unreadMsg != 0) && "#FE970F",
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      alignSelf: "flex-end",
                      marginTop: 8,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors.secondary,
                          fontSize: 12,
                        }}
                      >
                        {(item.chat.unreadMsg != 0) ? item.chat.unreadMsg : ""}
                      </Text>
                    </View>
                  </View>
                  <Text style={[style.subtxt, { color: Colors.disable, textAlign: 'right' }]}>
                    {item.chat.updated_at}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: "white",
                fontSize: 14,
                textAlign: "center",
                opacity: 0.4,
              }}
            >
              {t("no_notification_exists")}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
