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
import { useStore } from "../../store/store";
import Spinner from "../../components/Spinner";

export default function AccountProfile() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const currentUser = store.currentUser;

  const [data, setData] = useState({
    photo: "",
    name: currentUser.name,
    email: currentUser.email,
    role_id: currentUser.role_id,
    age: currentUser.age,
    address: currentUser.address,
    phone_number: currentUser.phone_number,
  });

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(3);
  const [items, setItems] = useState([
    { label: t("performer"), value: 3 },
    { label: t("customer"), value: 4 },
  ]);
  const [selectedImage, setSelectedImage] = useState(server.member_url + currentUser.image_file);
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
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.error) {
        console.log("Camera Error: ", response.error);
      } else {
        // Process the captured image
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        setImage(response);
      }
    });
  };

  const handleUpdateAccount = async () => {
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
    } else {
      let formdata = new FormData();
      // formdata.append("role_id", data.role_id);
      formdata.append("name", data.name);
      // formdata.append("email", data.email);
      formdata.append("age", data.age);
      // formdata.append("address", data.address);
      // formdata.append("phone_number", data.phone_number);
      let is_changeImage = 0;
      if (image) {
        console.log(image);
        is_changeImage = 1;
        formdata.append("photo", {
          name: image.assets?.[0].fileName,
          uri: image.assets?.[0]?.uri,
          type: image.assets?.[0]?.type,
        });
      }
      formdata.append("is_changeImage", is_changeImage);
      changeStore({ ...store, isLoading: true });
      (async () => {
        api.updateUser(formdata)
          .then(res => {
            changeStore({ ...store, isLoading: false });
            currentUser.name = res.data.data.user.name;
            currentUser.age = res.data.data.user.age;
            currentUser.image_file = res.data.data.user.image_file;
            changeStore({...store, currentUser:currentUser})
            Toast.show({
              type: "success",
              text1: t('success'),
              text2: t('profile_updated'),
            });
          }).catch(err => {
            changeStore({ ...store, isLoading: false });
            // navigation.goBack();
            console.log(err);
            Toast.show({
              type: "error",
              text1: t('error'),
              text2: t('server_error'),
            });
          });
      })();
    }
  };

  return (
    <SafeAreaView
      style={[
        style.area,
        {
          backgroundColor: theme.bg,paddingTop: 30,
          fontFamily: "Plus Jakarta Sans",
        },
      ]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}

      <AppBar
        color={theme.bg}
        title={t('update')}
        titleStyle={{ color: theme.txt }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
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
        {store.isLoading && <Spinner />}
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
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
                right: width / 2 - 100,
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
                        style={{ paddingHorizontal: 10, alignSelf: "flex-end" }}
                      >
                        <TouchableOpacity onPress={() => setVisible(false)}>
                          <Icon name="close-sharp" color={theme.txt} size={20} />
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
                        onPress={handleCameraLaunch}
                        style={{
                          paddingTop: 15 ,
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
                          onPress={openImagePicker}
                          style={{
                            paddingVertical: 10,
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
                editable={false}
                placeholder={t("enter_email")}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[style.txtinput, { backgroundColor: theme.bg }]}
                onChangeText={(e) => setData({ ...data, email: e })}
              />
            </View>
          </View>

          {/* <View style={{ paddingTop: 5, zIndex: 999 }}>
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
                disabled={true}
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
          </View> */}

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
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                keyboardType="numeric"
                inputMode="numeric"
                style={[style.txtinput, { backgroundColor: theme.bg }]}
                onChangeText={(e) => setData({ ...data, age: e })}
              />
            </View>
          </View>

          {/* <View style={{ paddingTop: 15 }}>
            <Text
              style={{
                color: theme.txt,
                fontWeight: "500",
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("address")}
            </Text>
            <View style={{ paddingTop: 8 }}>
              <TextInput
                value={data.address}
                placeholder={t("address")}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[style.txtinput, { backgroundColor: theme.bg }]}
                onChangeText={(e) => setData({ ...data, address: e })}
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
              {t("phone_number")}
            </Text>
            <View style={{ paddingTop: 8 }}>
              <TextInput
                inputMode="tel"
                value={data.phone_number}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[style.txtinput, { backgroundColor: theme.bg }]}
                onChangeText={(e) => setData({ ...data, phone_number: e })}
              />
            </View>
          </View> */}

          <View style={{ paddingVertical: 30 }}>
            <TouchableOpacity onPress={handleUpdateAccount} style={style.btn}>
              <Text style={style.btntxt}>{t("update")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
