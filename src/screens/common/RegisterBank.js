import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { PermissionsAndroid } from 'react-native';
import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-paper";
import { Colors } from "../../theme/color";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import style from "../../theme/style";
import Toast from "react-native-toast-message";
import { api } from "../../api";
import { useTranslation } from "react-i18next";
import { launchImageLibrary } from "react-native-image-picker";
import { launchCamera } from "react-native-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useStore } from "../../store/store";
const moment = require('moment-timezone');


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { images, server } from "../../constants";
import Spinner from "../../components/Spinner";

export default function PerformerPostCreate() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const currentUser = store.currentUser;

  const [data, setData] = useState({
    acc_holder_name: "",
    bank_num: '',
    routing_number: '',
    kana_first:"",
    kana_last:"",
    kanji_first:"",
    kanji_last:"",
    email_addr:"",
    phone_number:"",
    birthday:"",
    d_birthday:new Date(),
    postal_code:0,
  });

  const [visible, setVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  function padZero(num) {
    return (num < 10 ? '0' : '') + num;
  }

  const handleConfirm = (date) => {
    hideDatePicker();
    const datetime = new Date(date);
    const day = datetime.getDate(); // Get the day (1-31)
    const month = datetime.getMonth(); // Get the month (0-11)
    const year = datetime.getFullYear(); // Get the full year (e.g., 2024)
    setData({
      ...data,
      d_birthday: datetime,
      birthday: year + "-" + padZero(month + 1) + "-" + padZero(day),
    });
  };

  useEffect(() => {
    (async () => {
      changeStore({ ...store, isLoading: true });
      await api.getBank()
        .then(res => {
          if(res.data.success){
            if(res.data.data.length!=0) {
              setData(res.data.data[0]);
              setSelectedImage(server.bank_url + res.data.data[0].file);
            }
          } else {
            console.log('false');
          } 
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        });
    })();

    const currentDate = new Date('1994-03-05');
    const currentDateTime = moment(currentDate).tz('Asia/Tokyo').format('YYYY-MM-DD hh:mm:ss');
      setData({
        ...data,
        birthday: moment(currentDate).tz('Asia/Tokyo').format('YYYY-MM-DD'),
        d_birthday: moment(currentDateTime).toDate(),
      });
      changeStore({ ...store, isLoading: false });
  }, []);

  const [selectedImage, setSelectedImage] = useState(
    server.bank_url + 'default-bank.jpg'
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

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
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

  const handleCreateBank = async () => {
    try {
      if (data.acc_holder_name === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("acc_holder_name_required"),
        });
        return;
      } else if (data.bank_num === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("bank_num_required"),
        });
        return;
      } else if (data.routing_number === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("routing_number_required"),
        });
        return;
      } else if (data.email_addr === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("email_addr_required"),
        });
        return;
      } else if (data.birthday === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("birthday_required"),
        });
        return;
      } else if (data.phone_number === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("phone_number_required"),
        });
        return;
      } else {
        let formdata = new FormData();
        formdata.append("member_id", currentUser.id);
        formdata.append("acc_holder_name", data.acc_holder_name);
        formdata.append("bank_num", data.bank_num);
        formdata.append("routing_number", data.routing_number);
        formdata.append("kana_first", data.kana_first);
        formdata.append("kana_last", data.kana_last);
        formdata.append("kanji_first", data.kanji_first);
        formdata.append("kanji_last", data.kanji_last);
        formdata.append("email_addr", data.email_addr);
        formdata.append("phone_number", data.phone_number);
        formdata.append("birthday", data.birthday);
        formdata.append("postal_code", data.postal_code);
        if (image) {
          formdata.append("file", {
            name: image.assets?.[0].fileName,
            uri: image.assets?.[0]?.uri,
            type: image.assets?.[0]?.type,
          });
        }
        changeStore({ ...store, isLoading: true });
        (async () => {
          api.createBank(formdata)
            .then(res => {
              if (res.data.success) {
                changeStore({ ...store, isLoading: false });
                Toast.show({
                  type: "success",
                  text1: t("success"),
                  text2: t('register_bank_account_successfully'),
                });
                return;
              } else {
                changeStore({ ...store, isLoading: false });
                Toast.show({
                  type: "error",
                  text1: t("error"),
                  text2: t(res.data.message),
                });
                return;
              }
            }).catch(err => {
              changeStore({ ...store, isLoading: false });
              console.log(err)
            });
        })();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView
      style={[
        style.area,
        {
          backgroundColor: theme.bg,paddingTop: 30,
        },
      ]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}

      <AppBar
        color={theme.bg}
        title={t('register_account')}
        titleStyle={{ color: theme.txt }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.replace('Profile')}>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <View style={[style.row, { alignItems: "center" }]}>
              <Text
                style={[
                  style.txt1,
                  {
                    fontSize:14,
                    color: theme.txt,
                    fontFamily: "Plus Jakarta Sans",
                  },
                ]}
              >
                {t('payment_address_desc')}
              </Text>
            </View>
          <View style={{ flex: 1, paddingTop: 30 }}>
            <Text
              style={{
                color: theme.txt,
                fontWeight: "500",
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("bank_acc_holder_name")}
            </Text>
            <View style={{ paddingTop: 8 }}>
              <TextInput
                value={data.acc_holder_name}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[style.txtinput, { backgroundColor: theme.bg }]}
                onChangeText={(e) => setData({ ...data, acc_holder_name: e })}
              />
            </View>

            <View style={{ paddingTop: 5 }}>
              <Text
                style={{
                  color: theme.txt,
                  fontWeight: "500",
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("bank_number")}
              </Text>
              <View style={{ paddingTop: 8 }}>
                <TextInput
                  selectionColor={Colors.primary}
                  placeholderTextColor={Colors.disable}
                  style={[style.txtinput, { backgroundColor: theme.bg }]}
                  value={data.bank_num}
                  onChangeText={(e) => setData({ ...data, bank_num: e })}
                />
              </View>
            </View>
            <View style={{ paddingTop: 5 }}>
              <Text
                style={{
                  color: theme.txt,
                  fontWeight: "500",
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("routing_number")}
              </Text>
              <View style={{ paddingTop: 8 }}>
                <TextInput
                  selectionColor={Colors.primary}
                  placeholderTextColor={Colors.disable}
                  style={[style.txtinput, { backgroundColor: theme.bg }]}
                  value={data.routing_number}
                  onChangeText={(e) => setData({ ...data, routing_number: e })}
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
                {t("id_doc")}
              </Text>
              <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingVertical: 8,
                    justifyContent: "center",
                  }}
                >
              <Image
                  source={{ uri: selectedImage }}
                  style={{ width: width / 2, height: width / 4, borderRadius: 2 }}
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity style={{alignItems: "center",justifyContent:'center'}} onPress={() => setVisible(true)}>
                <Text style={[style.btntxt,{color:Colors.btn,}]}>{t("select_file_upload")}</Text>
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
                              style={{
                                paddingHorizontal: 20,
                                alignSelf: "flex-end",
                              }}
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
                                paddingTop: 10 ,
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

            <View style={{ paddingTop: 5 }}>
              <Text
                style={{
                  color: theme.txt,
                  fontWeight: "bold",
                  fontFamily: "Plus Jakarta Sans",
                  fontSize:16
                }}
              >
                {t("kana")}
              </Text>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text
                      style={{
                        color: theme.txt,
                        fontWeight: "500",
                        fontFamily: "Plus Jakarta Sans",
                      }}
                    >
                      {t("kana_first")}
                    </Text>
                    <View style={{ paddingTop: 8 }}>
                      <TextInput
                        selectionColor={Colors.primary}
                        placeholderTextColor={Colors.disable}
                        style={[style.txtinput, { backgroundColor: theme.bg,width:width*0.4 }]}
                        value={data.kana_first}
                        onChangeText={(e) => setData({ ...data, kana_first: e })}
                      />
                    </View>

                </View>
                <View>
                    <Text
                      style={{
                        color: theme.txt,
                        fontWeight: "500",
                        fontFamily: "Plus Jakarta Sans",
                      }}
                    >
                      {t("kana_last")}
                    </Text>
                    <View style={{ paddingTop: 8 }}>
                      <TextInput
                        selectionColor={Colors.primary}
                        placeholderTextColor={Colors.disable}
                        style={[style.txtinput, { backgroundColor: theme.bg,width:width*0.4 }]}
                        value={data.kana_last}
                        onChangeText={(e) => setData({ ...data, kana_last: e })}
                      />
                    </View>

                </View>
              </View>
            </View>
            
            <View style={{ paddingVertical: 5 }}>
              <Text
                style={{
                  color: theme.txt,
                  fontWeight: "bold",
                  fontFamily: "Plus Jakarta Sans",
                  fontSize:16
                }}
              >
                {t("kanji")}
              </Text>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text
                      style={{
                        color: theme.txt,
                        fontWeight: "500",
                        fontFamily: "Plus Jakarta Sans",
                      }}
                    >
                      {t("kanji_first")}
                    </Text>
                    <View style={{ paddingTop: 8 }}>
                      <TextInput
                        selectionColor={Colors.primary}
                        placeholderTextColor={Colors.disable}
                        style={[style.txtinput, { backgroundColor: theme.bg,width:width*0.4 }]}
                        value={data.kanji_first}
                        onChangeText={(e) => setData({ ...data, kanji_first: e })}
                      />
                    </View>

                </View>
                <View>
                    <Text
                      style={{
                        color: theme.txt,
                        fontWeight: "500",
                        fontFamily: "Plus Jakarta Sans",
                      }}
                    >
                      {t("kanji_last")}
                    </Text>
                    <View style={{ paddingTop: 8 }}>
                      <TextInput
                        selectionColor={Colors.primary}
                        placeholderTextColor={Colors.disable}
                        style={[style.txtinput, { backgroundColor: theme.bg,width:width*0.4 }]}
                        value={data.kanji_last}
                        onChangeText={(e) => setData({ ...data, kanji_last: e })}
                      />
                    </View>
                </View>
              </View>
            </View>
            <View style={{ paddingTop: 5 }}>
              <Text
                style={{
                  color: theme.txt,
                  fontWeight: "500",
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("email_addr")}
              </Text>
              <View style={{ paddingTop: 8 }}>
                <TextInput
                  inputMode="email"
                  selectionColor={Colors.primary}
                  placeholderTextColor={Colors.disable}
                  style={[style.txtinput, { backgroundColor: theme.bg }]}
                  value={data.email_addr.toString()}
                  onChangeText={(e) => setData({ ...data, email_addr: e })}
                />
              </View>
            </View>
            <View style={{ paddingTop: 5 }}>
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
                  selectionColor={Colors.primary}
                  placeholderTextColor={Colors.disable}
                  style={[style.txtinput, { backgroundColor: theme.bg }]}
                  value={data.phone_number.toString()}
                  onChangeText={(e) => setData({ ...data, phone_number: e })}
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
                {t("birthday")}
              </Text>
              <View
                style={[
                  style.txtinput,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderColor: Colors.border,
                  },
                ]}
              >
                <TextInput
                  value={data.birthday}
                  style={{
                    color: Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    locale="ja_jp"
                    date={data.d_birthday}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                  <Icons name="calendar" size={18} color={theme.txt} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={{ paddingTop: 5 }}>
              <Text
                style={{
                  color: theme.txt,
                  fontWeight: "500",
                  fontFamily: "Plus Jakarta Sans",
                }}>
                {t("postal_code")}
              </Text>
              <View style={{ paddingTop: 8 }}>
                <TextInput
                  selectionColor={Colors.primary}
                  placeholderTextColor={Colors.disable}
                  style={[style.txtinput, { backgroundColor: theme.bg }]}
                  value={data.postal_code}
                  onChangeText={(e) => setData({ ...data, postal_code: e })}
                />
              </View>
            </View>

            <View style={{ paddingVertical: 30 }}>
              <TouchableOpacity onPress={handleCreateBank} style={style.btn}>
                <Text style={style.btntxt}>{t("send")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
