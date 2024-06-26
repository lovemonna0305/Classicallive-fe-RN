import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../constants";
import { storage } from "../utils/storage";
import { useStore } from "../store/store";
import { getNotifications } from "../actions/common";

export default function Header() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  const [numMessages, setNumMessages] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const currentUser = store.currentUser;

  useEffect(() => {
    (async () => {
      await getNotifications()
      .then(res=>{
        setNumMessages(res.numMsgs)
      }).catch(err=>{
      });
    })();
  }, []);


  return (
    <View style={{ height: 80 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
          marginHorizontal: 20,
        }}
      >
        <View style={[style.row]}>
          <Image
            source={{ uri: server.member_url + currentUser.image_file, }}
            style={{
              width: 50,
              height: 50,
              borderColor: "#158085",
              borderWidth: 3,
              borderRadius: 50,
            }}
          />
          <View style={{ paddingLeft: 5 }}>
            <Text style={{ marginTop: 8, fontWeight: 600, color: theme.txt }}>
              {t("welcome")}
            </Text>
            <Text style={{ color: theme.txt }}>{currentUser.name}</Text>
          </View>
        </View>
        <View>
          <View style={[style.row, { height: 40, width: "100%" }]}>
            {/* <View style={{ position: "relative" }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CustomerPoints")}
                  >
                    <View
                      style={{
                        top: 10,
                        right: 40,
                      }}
                    >
                      <Icon name="notifications" color=theme.txt size={20} />
                    </View>
                  </TouchableOpacity>
                </View> */}
            <View style={{ position: "relative" }}>
              <TouchableOpacity onPress={() => { navigation.replace("Notification") }}>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: Colors.btn,
                    paddingHorizontal: 3,
                    borderRadius: 50,
                    alignItems: "center",
                    top: 10,
                    right: 33,
                  }}>
                  {(numMessages != 0 ? (<Text style={{ color: "#fff", fontSize: 8 }}>{numMessages}</Text>) : (null))}
                </View>
                <View
                  style={{
                    top: 10,
                    right: 20,
                  }}
                >
                  <Icon
                    name="notifications"
                    color={theme.txt}
                    size={22}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ position: "relative" }}>
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <View
                  style={{
                    top: 10,
                    right: 0,
                  }}
                >
                  <Icon name="settings" color={theme.txt} size={20} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
