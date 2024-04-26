import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  FlatList
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
import { api } from "../../api";

export default function Notification() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({});

  const currentUser = store.currentUser;
  const page = store.page;

  useEffect(() => {
    changeStore({ ...store, isLoading: true });
    (async () => {
      await getNotifications()
        .then(res => {
          setNotifications(res.notifications);
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        });
    })();
  }, []);

  const renderItem = ({ item, index }) => {
    const selectProgram = (select) => {
      (async () => {
        await api.readNotification(select.notification.id)
          .then(res => {
            if (res.data.success) {
              changeStore({ ...store, isLoading: false, program: res.data.data, page:"Notification" });
              if (currentUser.role_id == 3) {
                navigation.navigate("CustomerList");
              } else {
                navigation.navigate("CustomerPostDetail");
              }
            } else {
              changeStore({ ...store, isLoading: false });
              console.log('error')
            }
          }).catch(err => {
            changeStore({ ...store, isLoading: false });
          });
      })();
    };
    return (
      <TouchableOpacity
        key={index}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: theme.itembackground,
          margin: 10,
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => selectProgram(item)}>
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={[style.subtitle, { width: width * 0.85, color: theme.txt, fontSize: 16 }]}
          >
            {item.member.name}
          </Text>
          <Text
            style={[
              style.subtxt,
              {
                width: width * 0.85,
                color: theme.txt,
                paddingTop: 5,
                paddingRight: 5,
              },
            ]}
          >
            {(item.notification.content) ?? t("no_mes")}
          </Text>
          <Text style={[style.subtxt, { color: Colors.disable, }]}>
            {item.notification.updated_at}
          </Text>
        </View>
      </TouchableOpacity>
    )
  };

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
          <TouchableOpacity onPress={() => navigation.replace("Home")}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
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
          <View>
            <FlatList
              key={"notification"}
              data={notifications}
              keyExtractor={(item, index) => {
                return index;
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>

        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: theme.txt,
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
