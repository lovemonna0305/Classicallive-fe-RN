import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppBar } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { t } from "i18next";
import { useStore } from "../../store/store";
import Spinner from "../../components/Spinner";
import Toast from "react-native-toast-message";
import { api } from "../../api";


export default function NewPassword({ route }) {
  const { changeStore, store } = useStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  const { email } = route.params;

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    changeStore({ ...store, isLoading: false });
  }, [])

  const createPassword = async () => {
    if (data.password.length < 6) {
      Toast.show({
        type: "error",
        text1: t("error"),
        text2: t("password_length_6"),
      });
      return;
    } else if (data.password !== data.confirmPassword) {
      Toast.show({
        type: "error",
        text1: t("error"),
        text2: t("confirm_password_incorrect"),
      });
      return;
    } else {

      let formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", data.password);
      changeStore({ ...store, isLoading: true });
      await api.newpassword(formdata)
        .then(res => {
          if (res.data.success) {
            Toast.show({
              type: "success",
              text1: t("success"),
              text2: t('create_password_success'),
            });
            changeStore({ ...store, isLoading: false });
            navigation.navigate("Login");
          } else {
            Toast.show({
              type: "error",
              text1: t("error"),
              text2: t('create_password_failed'),
            });
          }
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          console.log(err)
          changeStore({ ...store, isLoading: false });
        });
    }
  }

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30,}]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t('create_new_password')}
        titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Otp")}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        {store.isLoading && <Spinner />}
        <View style={{ paddingTop: 20 }}>
          <Text
            style={[style.title, { textAlign: "center", color: theme.txt }]}
          >
            {/* Create a{" "} */}
          </Text>
          <Text
            style={[style.title, { textAlign: "center", color: theme.txt }]}
          >
            {/* New Password */}
          </Text>
          <Text style={[style.txt1, { textAlign: "center" }]}>
            {t('enter_new_password')}
          </Text>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
            {t('password')}
          </Text>
          <View
            style={[
              style.txtinput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
              },
            ]}
          >
            <TextInput
              placeholder={t('create_password')}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
              value={data.password}
              onChangeText={(e) => setData({ ...data, password: e })}
            ></TextInput>
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Icons
                name={isPasswordVisible ? "eye-off" : "eye"}
                color={theme.txt}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              style.txt1,
              { fontWeight: "500", color: theme.txt, paddingVertical: 10 },
            ]}
          >
            {t('confirm_password')}
          </Text>
          <View
            style={[
              style.txtinput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <TextInput
              placeholder={t('confirm_password')}
              secureTextEntry={!isPassword}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
              value={data.confirmPassword}
              onChangeText={(e) => setData({ ...data, confirmPassword: e })}
            />
            <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
              <Icons
                name={isPassword ? "eye-off" : "eye"}
                color={theme.txt}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 30 }}>
            <TouchableOpacity
              onPress={() => createPassword()}
              style={style.btn}
            >
              <Text style={style.btntxt}>{t('continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
