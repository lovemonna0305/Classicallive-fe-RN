import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import style from "../theme/style";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import QuestionHeight from "./FriendProfile";
// import {Avatar} from 'react-native-elements';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function History() {

  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      <StatusBar
      backgroundColor={theme.bg}
      barStyle={theme.barStyle}
  />  
      <AppBar
        color={theme.bg}
        title={t("history")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
      />

      <View style={[style.main, { backgroundColor: theme.bg }]}>
       <Text>{t("history")}</Text>
      </View>
    </SafeAreaView>
  );
}
