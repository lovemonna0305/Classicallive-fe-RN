import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import { useNavigation } from "@react-navigation/native";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { t } from "i18next";
import { useStore } from "../../store/store";
import Spinner from "../../components/Spinner";
import Toast from "react-native-toast-message";
import { api } from "../../api";

export default function Forgotpass() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const gonext = async () => {
    if (email === "") {
      Toast.show({
        type: "info",
        text1: t('info'),
        text2: t('enter_email'),
      });
      return;
    }
    if (validateEmail(email)) {
      changeStore({ ...store, isLoading: true });
      await api.forgot(email)
        .then(res => {
          if (res.data.success) {
            Toast.show({
              type: "success",
              text1: t('success'),
              text2: res.data.message,
            });
            navigation.navigate("Otp", { email: email, isforgot: true });
            changeStore({ ...store, isLoading: false });
          } else {
            Toast.show({
              type: "error",
              text1: t('error'),
              text2: res.data.message,
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
    } else {
      Toast.show({
        type: "error",
        text1: t('error'),
        text2: t('invalid_email'),
      });
      return;
    }
  }
  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,  paddingTop: 30, }]}
    >
      <AppBar
        color={theme.bg}
        title={t('forgot_password')}
        titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
            {/* Forgot Password */}
          </Text>
          <Text style={[style.txt1, { textAlign: "center" }]}>
            {/* Enter your new password */}
          </Text>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
            {/* Email */}
          </Text>
          <View style={{ paddingTop: 10 }}>
            <TextInput
              placeholder={t("enter_email")}
              placeholderTextColor={Colors.disable}
              style={[style.txtinput, { fontFamily: "Plus Jakarta Sans" }]}
              onChangeText={(e) => setEmail(e)}
              value={email}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity
              style={style.btn}
              onPress={() => gonext()}
            >
              <Text style={style.btntxt}>{t("next")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
