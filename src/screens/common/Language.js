import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Switch,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import i18n from "../../localization/i18n";
import { useStore } from "../../store/store";

export default function Language() {
  const { changeStore, store } = useStore();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [english, setEnglish] = useState(false);

  useEffect(() => {
    const language = i18n.language
    if(language.includes("en")){
      setEnglish(true);
    } else {
      setEnglish(false);
    }
  }, []);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title={t("language")}
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => {
              changeStore({ ...store, page: 'Home' });
              navigation.replace("Home")
              }}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: theme.bg }}
                color={theme.txt}
                size={35}
              />
            </TouchableOpacity>
          }
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 30,
              borderColor: Colors.bord,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 30,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: Colors.disable,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("change_language")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                i18n.changeLanguage("en")
                setEnglish(true)}
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Text style={[style.txt1, { color: theme.txt }]}>
                {t("english")}
              </Text>
              {english ? (
                <Avatar.Icon
                  icon="check"
                  style={{ backgroundColor: Colors.primary }}
                  color={theme.txt}
                  size={30}
                />
              ) : null}
            </TouchableOpacity>

            <View style={style.divider1}></View>

            <TouchableOpacity
              onPress={() => {
                i18n.changeLanguage("ja")
                setEnglish(false)
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[style.txt1, { color: theme.txt }]}>
                {t("japanese")}
              </Text>
              {!english ? (
                <Avatar.Icon
                  icon="check"
                  style={{ backgroundColor: Colors.primary }}
                  color={theme.txt}
                  size={30}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
