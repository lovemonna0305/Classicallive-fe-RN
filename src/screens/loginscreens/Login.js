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
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { Colors } from "../../theme/color";
import Toast from "react-native-toast-message";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
// import { login, loginGoogle } from "../../actions/auth";
import Icon from "react-native-vector-icons/Ionicons";
import { storage } from "../../utils/storage";
import { useTranslation } from "react-i18next";


import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import CheckBox from "../../components/CheckBox";
import Spinner from "../../components/Spinner";
import { api } from "../../api";
import { images, server, videosdk } from "../../constants";
import { useStore } from "../../store/store";
import { getAllCategories, getAllParentCategories, getCategoryArray, getPopularCategories, setLoading } from "../../actions/common";

export default function Login() {
  const { t } = useTranslation();
  const { changeStore, store } = useStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [check, setCheck] = useState();

  const handleLogin = async () => {
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    changeStore({ ...store, isLoading: true });
    try {
      const res = await api.login(formdata);
      if (res.data.success) {
        await storage.setItem("tokens", res.data.data.tokens);

        // global.isRemember = true;
        // global.tokens = res.data.data.tokens;
        // global.currentUser = res.data.data.user;
        // if (!check) {
        // }
        let streamingdata = {
          name:'Test User',
          token:videosdk.token,
          meetingId:'',
          micEnabled:'',
          webcamEnabled:'',
          mode:'CONFERENCE',
        };
        changeStore({ ...store, currentUser: res.data.data.user, isLoggedin: true, isLoading: false, page:"Home", streaming:streamingdata });
      } else {
        Toast.show({
          type: "error",
          text1: t('error'),
          text2: t(res.data.message),
        });
        changeStore({ ...store, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: t('error'),
        text2: t('server_error'),
      });
      changeStore({ ...store, isLoading: false });
    }
  };

  useEffect(() => {
    setEmail("performer@gmail.com");
    setPassword("123123");
    // console.log("global.isRemember",global.isRemember);
    // console.log("global.tokens",global.tokens);
    // console.log("global.currentUser",global.currentUser);
    // console.log("global.role", global.role);
    // // console.log(storage.getItem('isRemember'));
    // if (storage.getItem('isRemember') == 1) {
    //   changeStore({ ...store, currentUser: storage.getItem('currentUser'), isLoggedin: true, role: storage.getItem('role'), isLoading: false });
    // }
    // GoogleSignin.configure({
    //   webClientId:
    //     "439003880186-ovf6uveql2sk5qmcq6vcp7ugekt3sqhp.apps.googleusercontent.com",
    //   offlineAccess: true,
    // });
  }, []);

  const handleGoogleSign = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();

    //   // console.log('userInfor', userInfo.user._id);

    //   // const res = await api.getUser(userInfo.user._id)

    //   console.log("google Login");
    //   await store.dispatch(loginGoogle({ email: userInfo.user.email }));

    //   // setState({ userInfo });
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }
  };

  const styles = StyleSheet.create({
    wrapper: { height: 370 },
    slide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: 428,
      height: 275,
    },
  });

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}

      <AppBar
        color={theme.bg}
        // title="Login"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Introduction")}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {store.isLoading && <Spinner />}
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 140, height: 140 }}
              source={images.logo}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: theme.txt,
                fontWeight: 700,
                paddingTop: 30,
                lineHeight: 5,
                fontSize: 16,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("enter_your_login_info")}
            </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              placeholder={t("email_address")}
              selectionColor={Colors?.primary}
              placeholderTextColor={Colors?.disable}
              onChangeText={(e) => setEmail(e)}
              value={email}
              require
              style={[
                style.txtinput,
                { backgroundColor: theme.bg, fontFamily: "Plus Jakarta Sans" },
              ]}
            />
          </View>
          <View
            style={[
              style.txtinput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 1,
              },
            ]}
          >
            <TextInput
              placeholder={t("password")}
              selectionColor={Colors.primary}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={Colors.disable}
              value={password}
              onChangeText={(e) => setPassword(e)}
              style={{
                backgroundColor: theme.bg,
                color: Colors.disable,
                fontFamily: "Plus Jakarta Sans",
              }}
            ></TextInput>
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Icon
                name={isPasswordVisible ? "eye-off" : "eye"}
                color={Colors.secondary}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              paddingTop: 10,
            }}
          >
            <CheckBox
              style={{ borderWidth: 5 }}
              checkBoxSize={25}
              checkColor={Colors.btn}
              squareCheckBox={true}
              onToggle={(e) => {
                setCheck(e);
              }}
            />
            <Text
              style={{
                color: theme.txt,
                fontWeight: 700,
                paddingTop: 18,
                lineHeight: 5,
                fontSize: 16,
                fontFamily: "Plus Jakarta Sans",
                paddingLeft: 4,
              }}
            >
              {t("remember_me")}
            </Text>
          </View>

          <View style={{ paddingVertical: 30 }}>
            <TouchableOpacity onPress={handleLogin} style={style.btn}>
              <Text style={style.btntxt}>{t("login")}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Forgotpass")}>
              <Text
                style={{
                  color: Colors.btn,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("forgot_password")}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <View style={style.divider}></View>
            <Text
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
            >
              {t("login_another_account")}
            </Text>
            <View style={style.divider}></View>
          </View>
          <View
            style={{
              paddingTop: 30,
              flex: 1,
              justifyContent: "space-around",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: 50, height: 50 }}>
              <TouchableOpacity
                style={[
                  style.btn1,
                  {
                    borderColor: theme.txt,
                    borderWidth: 1,
                    backgroundColor: theme.bg,
                  },
                ]}
                onPress={handleGoogleSign}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={images.google}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={{ width: 50, height: 50 }}>
              <TouchableOpacity
                style={[
                  style.btn1,
                  {
                    borderColor: theme.txt,
                    borderWidth: 1,
                    backgroundColor: theme.bg,
                  },
                ]}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={images.facebook}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={{ width: 50, height: 50 }}>
              <TouchableOpacity
                style={[
                  style.btn1,
                  {
                    borderColor: theme.txt,
                    borderWidth: 1,
                    backgroundColor: theme.bg,
                  },
                ]}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                  source={theme.apple}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            {/* <Text style={style.txt1}>Don't have an account?</Text> */}
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text
                style={[
                  style.txt,
                  // { color: Colors.btn, fontWeight: "700", marginBottom: 20 },
                ]}
              >
                {t("go_to_register")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
