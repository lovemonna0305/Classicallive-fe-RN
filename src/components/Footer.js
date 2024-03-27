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
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import Icon from "react-native-vector-icons/FontAwesome5";
import { server } from "../constants";
import { storage } from "../utils/storage";
import { api } from "../api";
import { useStore } from "../store/store";

export default function Footer() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);
  const [focused, setForcused] = useState(store.page);

  const goto = (name) => {
    changeStore({ ...store, page: name });
    setForcused(store.page);
    navigation.replace(name);
  }

  return (
    <View style={[style.row, {
      height: 60,
      paddingHorizontal: 30,
      marginVertical: 10,
      justifyContent: "space-between",
    }]}>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => goto('Home')}
      >
        <Icon
          name="home"
          size={20}
          color={focused.includes("Home") ? theme.icon : Colors.disable}
        />
        <Text
          style={{
            color: focused.includes("Home") ? theme.icon : Colors.disable,
            fontFamily: "Plus Jakarta Sans",
            marginBottom: 15,
            fontSize: 12,
          }}
        >{t("home")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => goto('Message')}
      >
        <Icon
          name="envelope"
          size={20}
          color={focused.includes("Message") ? theme.icon : Colors.disable}
        />
        <Text
          style={{
            color: focused.includes("Message") ? theme.icon : Colors.disable,
            fontFamily: "Plus Jakarta Sans",
            marginBottom: 15,
            fontSize: 12,
          }}
        >{t("message")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => goto('CategoryList')}
      >
        <Icon
          name="search"
          size={20}
          color={focused.includes("CategoryList") ? theme.icon : Colors.disable}
        />
        <Text
          style={{
            color: focused.includes("CategoryList") ? theme.icon : Colors.disable,
            fontFamily: "Plus Jakarta Sans",
            marginBottom: 15,
            fontSize: 12,
          }}
        >{t("browse")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => goto('HistoryList')}
      >
        <Icon
          name="history"
          size={20}
          color={focused.includes("HistoryList") ? theme.icon : Colors.disable}
        />
        <Text
          style={{
            color: focused.includes("HistoryList") ? theme.icon : Colors.disable,
            fontFamily: "Plus Jakarta Sans",
            marginBottom: 15,
            fontSize: 12,
          }}
        >{t("history")}</Text>
      </TouchableOpacity>
    </View>
  );
}
