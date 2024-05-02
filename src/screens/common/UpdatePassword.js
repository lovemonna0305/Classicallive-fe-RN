import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";
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
import { api } from "../../api";
import Toast from "react-native-toast-message";

export default function UpdatePassword() {
  const { changeStore, store } = useStore();
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  const [data, setData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const UpdatePass = async () => {
    let formdata = new FormData();
    formdata.append("current_password", data.current_password);
    formdata.append("new_password", data.new_password);
    formdata.append("confirm_password", data.confirm_password);
    console.log(formdata);
    changeStore({ ...store, isLoading: true });
    await api.updatePassword(formdata)
      .then(res => {
        if (res.data.success) {
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t(res.data.message),
          });
          changeStore({ ...store, isLoading: false });
        } else {
          Toast.show({
            type: "error",
            text1: t('error'),
            text2: t(res.data.message),
          });
          changeStore({ ...store, isLoading: false });
        }
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: t('error'),
          text2: err,
        });
        changeStore({ ...store, isLoading: false });
      });
  }

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        // title="update_password"
        titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
        <View style={{ paddingTop: 20 }}>
          <Text
            style={[style.title, { textAlign: "center", color: theme.txt }]}
          >
            {t('change_password')}
          </Text>
          {/*<Text
            style={[style.title, { textAlign: "center", color: theme.txt }]}
          >
            New Password
          </Text>
          <Text style={[style.txt1, { textAlign: "center" }]}>
            Enter your new password
          </Text> */}
        </View>
        <View style={{ paddingTop: 15 }}>


          <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
            {t('prev_pw')}
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
              value={data.current_password}
              placeholder={t('enter_current_pw')}
              secureTextEntry={!isOldPasswordVisible}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
              onChangeText={(e) => setData({ ...data, current_password: e })}
            ></TextInput>
            <TouchableOpacity
              onPress={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
            >
              <Icons
                name={isOldPasswordVisible ? "eye-off" : "eye"}
                color={theme.txt}
                size={20}
              />
            </TouchableOpacity>
          </View>

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
              value={data.new_password}
              placeholder={t('enter_new_pw')}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
              onChangeText={(e) => setData({ ...data, new_password: e })}
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
              value={data.confirm_password}
              placeholder={t('reenter_pw')}
              secureTextEntry={!isPassword}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
              onChangeText={(e) => setData({ ...data, confirm_password: e })}
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
              onPress={() => UpdatePass()}
              style={style.btn}
            >
              <Text style={style.btntxt}>{t('change_password')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
