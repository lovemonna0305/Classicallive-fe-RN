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
  Button,
  Modal,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../theme/color";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import style from "../../theme/style";
import Toast from "react-native-toast-message";
import { api } from "../../api";
import { useTranslation } from "react-i18next";
import { launchImageLibrary } from "react-native-image-picker";
import { launchCamera } from "react-native-image-picker";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { images, server } from "../../constants";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Signup() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    photo: "",
    name: "new name",
    email: "secstar1223@mail.com",
    role_id: 3,
    age: 30,
    password: "123123",
    confirmPassword: "123123",
  });

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(3);
  const [items, setItems] = useState([
    { label: t("performer"), value: 3 },
    { label: t("customer"), value: 4 },
  ]);
  const [selectedImage, setSelectedImage] = useState(
    server.default_url+"profile.png"
  );
  const [image, setImage] = useState(null);
  const openImagePicker = () => {
    setVisible(false);
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image picker error: ", response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        setImage(response);
      }
    });
  };

  const handleCameraLaunch = () => {
    setVisible(false);
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.error) {
        console.log("Camera Error: ", response.error);
      } else {
        // Process the captured image
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        setImage(response);
        console.log(imageUri);
      }
    });
  };

  const handleGoogleSign = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      try {
        // data.userId = String(data.userId).toLowerCase();
        const res = await api.signupGoogle({
          email: userInfo.user.email,
          name: userInfo.user.name,
          role_id: "customer",
          password: 123123,
          location: "location",
        });
        console.log(res);
        navigation.navigate("Login", data);
      } catch (err) {
        console.log(err);
      }

      // setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleCreateAccount = async () => {
    try {
      if (data.name === "" || data.email === "" || data.age === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("name_email_age_required"),
        });
        return;
      } else if (data.age < 18) {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("18_less_performer_no_register"),
        });
        return;
      } else if (data.password.length < 6) {
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
        formdata.append("role_id", data.role_id);
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("age", data.age);
        formdata.append("password", data.password);
        
        if(image){
          formdata.append("photo", {
            name: "image.fileName.jpg",
            uri: image.assets?.[0]?.uri,
            type: "image/jpg",
          });
        }
        const res = await api.signup(formdata);
        if(!res.data.success){
          Toast.show({
            type: "error",
            text1: t("error"),
            text2: res.data.message,
          });
          return;
        } 
        Toast.show({
          type: "success",
          text1: t("success"),
          text2: res.data.message,
        });
        navigation.navigate("Otp", data);
       
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
  });

  return (
    <SafeAreaView
      style={[
        style.area,
        {
          backgroundColor: theme.bg,
          paddingTop: 40,
          fontFamily: "Plus Jakarta Sans",
        },
      ]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}

      <AppBar
        color={theme.bg}
        // title="Sign Up"
        titleStyle={{ color: theme.txt }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color="white"
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <View
        style={[
          style.main,
          {
            backgroundColor: theme.bg,
            // paddingTop: 0,
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {/* <View style={{ paddingTop: 0, marginBottom: 0 }}>
            <Text
              style={[
                style.logintitle,
                {
                  color: theme.txt,
                  fontFamily: "Plus Jakarta Sans",
                  textAlign: "left",
                  fontSize: 32,
                  fontWeight: 700,
                },
              ]}
            >
              {t("get_started")}
            </Text>
            <Text
              style={[
                style.txt1,
                {
                  textAlign: "center",
                  fontFamily: "Plus Jakarta Sans",
                  textAlign: "left",
                  paddingTop: 10,
                },
              ]}
            >
              {t("fill_in_credentials")}
            </Text>
          </View> */}
          <View
            style={{
              paddingTop: 30,
              alignItems: "center",
            }}
          >
            <Avatar.Image
              source={{ uri: selectedImage }}
              size={100}
              style={{ backgroundColor: Colors.secondary }}
            ></Avatar.Image>
            <View
              style={{
                position: "absolute",
                height: "30%",
                width: "20%",
                marginTop: 100,
                alignItems: "center",
                right: width/2-100,
              }}
            >
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Avatar.Image
                  source={images.edit}
                  size={30}
                  style={{}}
                ></Avatar.Image>
                <Modal transparent={true} visible={visible}>
                  <View
                    style={{
                      width: width,
                      flex: 1,
                      backgroundColor: "#000000aa",
                      transparent: "true",
                    }}
                  >
                    <View
                      style={[
                        style.modalcontainer,
                        { backgroundColor: theme.bg, width: width - 20 },
                      ]}
                    >
                      <View
                        style={{ paddingHorizontal: 20, alignSelf: "flex-end" }}
                      >
                        <TouchableOpacity onPress={() => setVisible(false)}>
                          <Icon name="close-sharp" color="black" size={20} />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={[
                          style.title,
                          { color: theme.txt, alignSelf: "center" },
                        ]}
                      >
                        {t("change_your_picutre")}
                      </Text>
                      <View
                        style={[
                          style.divider1,
                          { color: Colors.disable, marginBottom: 20 },
                        ]}
                      ></View>
                      <TouchableOpacity
                        onPress={openImagePicker}
                        style={{
                          // paddingTop: 15 ,
                          paddingVertical: 15,
                          backgroundColor: theme.bg,
                          // theme == "dark" ? "#434E58" : "#E3E7EC",
                          borderRadius: 10,
                          paddingHorizontal: 20,
                          flexDirection: "row",
                        }}
                      >
                        <Icon name="camera" size={25} color={theme.txt} />
                        <Text
                          style={[
                            style.subtitle,
                            { color: theme.txt, paddingLeft: 15 },
                          ]}
                        >
                          {t("take_photo")}
                        </Text>
                      </TouchableOpacity>
                      <View style={{ paddingTop: 15 }}>
                        <TouchableOpacity
                          onPress={handleCameraLaunch}
                          style={{
                            //  paddingTop: 15 ,
                            paddingVertical: 15,
                            backgroundColor: theme.bg,
                            // theme == "light" ? "#4A4A65" : "#E3E7EC",
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            flexDirection: "row",
                          }}
                        >
                          <Icon
                            name="folder-open-outline"
                            size={25}
                            color={theme.txt}
                          />
                          <Text
                            style={[
                              style.subtitle,
                              { color: theme.txt, paddingLeft: 15 },
                            ]}
                          >
                            {t("choose_from_your_file")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              color: theme.txt,
              fontWeight: "500",
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            {t("name")}
          </Text>
          <View style={{ paddingTop: 8 }}>
            <TextInput
              value={data.name}
              placeholder={t("enter_name")}
              selectionColor={Colors.primary}
              placeholderTextColor={Colors.disable}
              style={[style.txtinput, { backgroundColor: theme.bg }]}
              onChangeText={(e) => setData({ ...data, name: e })}
            />
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text
              style={{
                color: theme.txt,
                fontWeight: "500",
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("email_address")}
            </Text>
            <View style={{ paddingTop: 8 }}>
              <TextInput
                value={data.email}
                placeholder={t("enter_email")}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[style.txtinput, { backgroundColor: theme.bg }]}
                onChangeText={(e) => setData({ ...data, email: e })}
              />
            </View>
          </View>

          <View style={{ paddingTop: 5, zIndex: 999 }}>
            <Text
              style={{
                color: theme.txt,
                fontWeight: "500",
                paddingVertical: 10,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("role")}
            </Text>
            <View style={{ zIndex: 999, flex: 1, backgroundColor: theme.bg }}>
              <DropDownPicker
                style={{
                  backgroundColor: theme.bg,
                  borderColor: Colors.bord,
                  color: theme.txt,
                  height: 50,
                  fontFamily: "Plus Jakarta Sans",
                }}
                listMode="SCROLLVIEW"
                theme="DARK"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(e) => {
                  console.log("data", e);
                  setData({ ...data, role_id: e });
                }}
              />
            </View>
          </View>

          <View style={{ paddingTop: 15 }}>
            <Text
              style={{
                color: theme.txt,
                fontWeight: "500",
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("age")}
            </Text>
            <View style={{ paddingTop: 8 }}>
              <TextInput
                value={data.age.toString()}
                placeholder={t("age")}
                keyboardType="numeric"
                inputMode="decimal"
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[style.txtinput, { backgroundColor: theme.bg }]}
                onChangeText={(e) => setData({ ...data, age: e })}
              />
            </View>
          </View>

          <View style={{ paddingTop: 5 }}>
            <Text
              style={{
                color: theme.txt,
                fontWeight: "500",
                paddingVertical: 10,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("password")}
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
                placeholder={t("enter_password")}
                selectionColor={Colors.primary}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor={Colors.disable}
                onChangeText={(e) => setData({ ...data, password: e })}
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
                  color={theme.txt}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingTop: 5 }}>
            <Text
              style={{
                color: theme.txt,
                fontWeight: "500",
                paddingVertical: 10,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("confirm_password")}
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
                placeholder={t("enter_confirm_password")}
                secureTextEntry={!isPassword}
                placeholderTextColor={Colors.disable}
                onChangeText={(e) => setData({ ...data, confirmPassword: e })}
                style={{
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              />
              <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
                <Icon
                  name={isPassword ? "eye-off" : "eye"}
                  color={theme.txt}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingVertical: 30 }}>
            <TouchableOpacity onPress={handleCreateAccount} style={style.btn}>
              <Text style={style.btntxt}>{t("register")}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 10,
              bottom: 25,
            }}
          >
            <Text style={style.txt1}>{t("already_have_account")}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={[style.txt, { color: Colors.btn, fontWeight: "500" }]}
              >
                {t("login")}
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
              style={{
                color: Colors.disable,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("or_continue_with")}
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
              paddingBottom: 30,
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
                  source={theme.apple}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
