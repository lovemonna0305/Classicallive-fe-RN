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
  Dimensions,
  Modal,
} from "react-native";
import Swiper from "react-native-swiper";
import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBox from "../../components/CheckBox";
import { useStore } from "../../store/store";
import Video from 'react-native-video';
const moment = require('moment-timezone');


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { images, server } from "../../constants";
import Spinner from "../../components/Spinner";
import { createProgram, getPProgramsByCategory, getPrograms } from "../../actions/performer";

export default function PerformerPostCreate() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const currentUser = store.currentUser;
  let categoryArray = global.categoryArray;

  const [data, setData] = useState({
    photo: "",
    title: "",
    email: "",
    category: 0,
    subcategory: 0,
    points: 0,
    date: "", // Choose date
    start_time: "", // Choose time
    end_time: "", // Choose time,
    d_date: new Date(), // Choose date
    d_start_time: new Date(), // Choose time
    d_end_time: new Date(), // Choose time
    is_chat: false,
    description: "", // Choose time
  });
  const [chat, setChat] = useState(true);
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState(0);
  const [categoryitems, setCategoryItems] = useState(categoryArray["category"]);

  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [subcategoryValue, setSubCategoryValue] = useState(0);
  const [subcategoryitems, setSubCategoryItems] = useState(
    categoryArray["subcategory"][0]
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      // backgroundColor: theme.background,
      marginBottom: 20,
    },
    tabButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      // backgroundColor: theme.background,
    },
    tabButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.disable

    },
    activeTabText: {
      borderBottomWidth: 2,
      borderColor: Colors.primary,

    },
    activeTabView: {
      backgroundColor: Colors.primary,
      width: 30,
      height: 5,
      alignSelf: "center",
      marginTop: 10,
      borderRadius: 10
    },
    activeColor: {
      color: theme.txt,
    },
    renderItem2View: {
      flexDirection: "row",
      paddingVertical: 15,
      paddingHorizontal: 30,
      justifyContent: "space-between",
      width: width - 40,
      height: height * 0.09,
      borderBottomColor: Colors.disable, borderBottomWidth: 2
    },
    tabContent: {
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
  });
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [isChangeImage, setIsChangeImage] = useState(0);
  const [isChangeVideo, setIsChangeVideo] = useState(0);
  const [video, setVideo] = useState('');
  const [selectedvideo, setSelectedVideo] = useState('https://vjs.zencdn.net/v/oceans.mp4');

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const [videovisible, setVideoVisible] = useState(false);

  const [progress, setProgrss] = useState(0);
  const [playableDuration, setplayableDuration] = useState(0);

  const [isChatVisible, setisChatVisible] = useState(false);
  const [pause, setPause] = useState(false);

  const videoPlayer = useRef(null);

  const seekTo = sec => {
    videoPlayer &&
      videoPlayer.current &&
      typeof videoPlayer.current.seek === 'function' &&
      videoPlayer.current.seek(sec);
  };



  useEffect(() => {
    const currentDate = new Date();
    const currentDateTime = moment(currentDate).tz('Asia/Tokyo').format('YYYY-MM-DD hh:mm:ss');
    setData({
      ...data,
      date: moment(currentDate).tz('Asia/Tokyo').format('YYYY-MM-DD'),
      start_time: moment(currentDate).tz('Asia/Tokyo').format('hh:mm'),
      end_time: moment(currentDate).tz('Asia/Tokyo').format('hh:mm'),
      d_date: moment(currentDateTime).toDate(),
      d_start_time: moment(currentDateTime).toDate(),
      d_end_time: moment(currentDateTime).toDate(),
    });

    changeStore({ ...store, isLoading: false });
  }, []);

  useEffect(() => {
    setSubCategoryItems([]);
    const cateIndex = categoryArray["category"].findIndex(
      (item) => item.value === categoryValue
    );
    if (categoryArray["subcategory"][cateIndex]) {
      setSubCategoryItems(categoryArray["subcategory"][cateIndex]);
    }
    // console.log(categoryValue);
  }, [categoryValue]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [firsttime, setFirsttime] = useState();

  function padZero(num) {
    return (num < 10 ? '0' : '') + num;
  }

  const handleConfirm = (date) => {
    hideDatePicker();
    var currentDate = new Date(moment(new Date()).utcOffset('+0900').format('YYYY-MM-DD HH:mm'));
    const datetime = new Date(date);
    const day = datetime.getDate(); // Get the day (1-31)
    const month = datetime.getMonth(); // Get the month (0-11)
    const year = datetime.getFullYear(); // Get the full year (e.g., 2024)

    if (datetime > currentDate) {
      setData({
        ...data,
        d_date: datetime,
        date: year + "-" + padZero(month + 1) + "-" + padZero(day),
      });
    } else {
      Toast.show({
        type: "error",
        text1: t("error"),
        text2: t("performance_no_before_today"),
      });
    }
  };

  const [isStimePickerVisible, setStimePickerVisibility] = useState(false);
  const showStimePicker = () => {
    setStimePickerVisibility(true);
  };

  const hideStimePicker = () => {
    setStimePickerVisibility(false);
  };

  const handleConfirmStime = (time) => {
    hideStimePicker();
    const datetime = new Date(time);
    const hours = datetime.getHours(); // Get the hour (0-23)
    const minutes = datetime.getMinutes(); // Get the minute (0-59)
    const seconds = datetime.getSeconds(); // Get the second (0-59)
    setData({
      ...data,
      start_time: padZero(hours) + ":" + padZero(minutes),
      d_start_time: datetime,
    });
    setFirsttime(time);
  };

  const [isEtimePickerVisible, setEtimePickerVisibility] = useState(false);
  const showEtimePicker = () => {
    setEtimePickerVisibility(true);
  };

  const hideEtimePicker = () => {
    setEtimePickerVisibility(false);
  };

  const handleConfirmEtime = (time) => {
    hideEtimePicker();
    const time1 = new Date(firsttime);
    const time2 = new Date(time);
    if (time1 < time2) {
      const datetime = new Date(time);
      const hours = datetime.getHours(); // Get the hour (0-23)
      const minutes = datetime.getMinutes(); // Get the minute (0-59)

      setData({
        ...data,
        end_time: padZero(hours) + ":" + padZero(minutes),
        d_end_time: datetime,
      });
    } else {
      Toast.show({
        type: "error",
        text1: t("error"),
        text2: t("time2"),
        text2: t("performance_start_no_end"),
      });
    }
  };

  const [selectedImage, setSelectedImage] = useState(
    server.default_url + 'media.png'
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
        setIsChangeImage(1);
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
        setIsChangeImage(1);
      }
    });
  };

  const handleCamera = () => {
    setVideoVisible(false);
    launchCamera({ mediaType: 'video' }, (response) => {
      if (!response.didCancel) {
        let videoUri = response.uri || response.assets?.[0]?.uri;
        setSelectedVideo(videoUri);
        setVideo(response);
        setIsChangeVideo(1);
      }
    });
  };

  const handleLibrary = () => {
    setVideoVisible(false);
    launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (!response.didCancel) {
        let videoUri = response.uri || response.assets?.[0]?.uri;
        setSelectedVideo(videoUri);
        setVideo(response);
        setIsChangeVideo(1);
      }
    });
  };

  const handleCreatePost = async () => {
    try {
      if (data.title === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("title_required"),
        });
        return;
      } else if (data.category === 0) {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("category_required"),
        });
        return;
      } else if (data.subcategory === 0) {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("subcategory_required"),
        });
        return;
      } else if (data.date === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("date_required"),
        });
        return;
      } else if (data.start_time === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("start_time_required"),
        });
        return;
      } else if (data.end_time === "") {
        Toast.show({
          type: "error",
          text1: t("error"),
          text2: t("end_time_required"),
        });
        return;
      } else {
        let formdata = new FormData();
        formdata.append("member_id", currentUser.id);
        formdata.append("title", data.title);
        formdata.append("category", categoryValue);
        formdata.append("subcategory", subcategoryValue);
        formdata.append("date", data.date);
        formdata.append("start_time", data.start_time);
        formdata.append("end_time", data.end_time);
        formdata.append("points", data.points);
        formdata.append("description", data.description);
        formdata.append("is_chat", chat);

        if (activeTab == 1) {
          if (image) {
            formdata.append("file", {
              name: image.assets?.[0].fileName,
              uri: image.assets?.[0]?.uri,
              type: image.assets?.[0]?.type,
            });
          }
          formdata.append("is_video", 0);
          formdata.append("is_changeImage", isChangeImage);
        } else {
          if (video) {
            formdata.append("videofile", {
              name: video.assets?.[0].fileName,
              uri: video.assets?.[0]?.uri,
              type: video.assets?.[0]?.type,
            });
          }
          formdata.append("is_video", 1);
          formdata.append("is_changeVideo", isChangeVideo);

        }
        changeStore({ ...store, isLoading: true });
        (async () => {
          createProgram(formdata)
            .then(res => {
              if (res.data.success) {
                changeStore({ ...store, isLoading: false });
                navigation.replace('Category');
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
          backgroundColor: theme.bg,
          paddingTop: 40,
          fontFamily: "Plus Jakarta Sans",
        },
      ]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}

      <AppBar
        color={theme.bg}
        title={t('post_program')}
        titleStyle={{ color: theme.txt }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.replace('Category')}>
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
          <View style={{ flex: 1, paddingTop: 30 }}>
            <Text
              style={{
                color: theme.txt,
                fontWeight: "500",
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              {t("title")}
            </Text>
            <View style={{ paddingTop: 8 }}>
              <TextInput
                value={data.title}
                placeholder={t("title")}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.disable}
                style={[style.txtinput, { backgroundColor: theme.bg }]}
                onChangeText={(e) => setData({ ...data, title: e })}
              />
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
                {t("category")}
              </Text>
              <View style={{ zIndex: 999, flex: 1, backgroundColor: theme.bg }}>
                <DropDownPicker
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: Colors.bord,
                    color: theme.txt,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                  placeholder={t('select_category')}
                  listMode="MODAL"
                  theme="DARK"
                  open={openCategory}
                  value={categoryValue}
                  items={categoryitems}
                  setOpen={setOpenCategory}
                  setValue={setCategoryValue}
                  setItems={setCategoryItems}
                  onChangeValue={(e) => {
                    // setSubCategoryItems(subcategoryArrary[e]);
                    setData({ ...data, category: e });
                  }}
                  onPress={(e) => console.log("category", e)}
                  onSelectItem={(e) => {
                    // setSubCategoryItems(subcategoryArrary[e.value])
                  }}
                />
              </View>
            </View>

            <View style={{ paddingTop: 5, zIndex: 200 }}>
              <Text
                style={{
                  color: theme.txt,
                  fontWeight: "500",
                  paddingVertical: 10,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("subcategory")}
              </Text>
              <View style={{ zIndex: 200, flex: 1, backgroundColor: theme.bg }}>
                <DropDownPicker
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: Colors.bord,
                    color: theme.txt,
                    height: 50,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                  placeholder={t('select_subcategory')}
                  listMode="MODAL"
                  theme="DARK"
                  open={openSubCategory}
                  value={subcategoryValue}
                  items={subcategoryitems}
                  setOpen={setOpenSubCategory}
                  setValue={setSubCategoryValue}
                  setItems={setSubCategoryItems}
                  onChangeValue={(e) => {
                    setData({ ...data, subcategory: e });
                  }}
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
                {t("coins")}
              </Text>
              <View style={{ paddingTop: 8 }}>
                <TextInput
                  inputMode="decimal"
                  placeholder={t("coins")}
                  selectionColor={Colors.primary}
                  placeholderTextColor={Colors.disable}
                  style={[style.txtinput, { backgroundColor: theme.bg }]}
                  value={data.points.toString()}
                  onChangeText={(e) => setData({ ...data, points: e })}
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
                {t("date")}
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
                  value={data.date}
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
                    date={data.d_date}
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
                  paddingVertical: 10,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("stime")}
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
                  value={data.start_time}
                  style={{
                    color: Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                />
                <TouchableOpacity onPress={showStimePicker}>
                  <DateTimePickerModal
                    isVisible={isStimePickerVisible}
                    mode="time"
                    locale="ja_jp"
                    date={data.d_start_time}
                    onConfirm={handleConfirmStime}
                    onCancel={hideStimePicker}
                  />
                  <Icons name="clock" size={18} color={theme.txt} />
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
                {t("etime")}
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
                  value={data.end_time}
                  style={{
                    color: Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                />
                <TouchableOpacity onPress={showEtimePicker}>
                  <DateTimePickerModal
                    isVisible={isEtimePickerVisible}
                    mode="time"
                    locale="ja_jp-JP"
                    date={data.d_end_time}
                    onConfirm={handleConfirmEtime}
                    onCancel={hideEtimePicker}
                  />
                  <Icons name="clock" size={18} color={theme.txt} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingTop: 5, marginTop: 10 }}>
              <View
                style={[
                  // style.txtinput,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // borderColor: Colors.border,
                  },
                ]}
              >
                <CheckBox
                  isChecked={false}
                  checkBoxSize={30}
                  checkColor={Colors.primary}
                  squareCheckBox={true}
                  onToggle={(e) => {
                    setChat(e);
                  }}
                />
                <Text
                  style={{
                    color: theme.txt,
                    fontWeight: "500",
                    fontFamily: "Plus Jakarta Sans",
                    paddingLeft: 10,
                  }}
                >
                  {t("chat")}
                </Text>
              </View>
            </View>

            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tabButton,]}
                onPress={() => handleTabChange(1)}
              >
                <Text style={[styles.tabButtonText, activeTab === 1 && styles.activeColor]}>{t('images')}</Text>
                <View style={activeTab === 1 && styles.activeTabView}></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 2]}
                onPress={() => handleTabChange(2)}
              >
                <Text style={[styles.tabButtonText, activeTab === 2 && styles.activeColor]}>{t('video')}</Text>
                <View style={activeTab === 2 && styles.activeTabView}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.tabContent}>
              {activeTab === 1 && <View style={{ marginTop: 5, marginBottom: 20, }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingTop: 8,
                    justifyContent: "center",
                  }}
                >

                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: width / 2, height: width / 4 }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: "absolute",
                      bottom: -10,
                      alignItems: "center",
                      right: width / 4 - 35,
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
                              style={{
                                paddingHorizontal: 20,
                                alignSelf: "flex-end",
                              }}
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
                              onPress={handleCameraLaunch}
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
                                onPress={openImagePicker}
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
              </View>}
              {activeTab === 2 && <View style={{ marginTop: 5, marginBottom: 20, }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingTop: 8,
                    justifyContent: "center",
                  }}
                >

                  <View style={{ marginVertical: 20, marginBottom: 20, width: width / 2, height: width / 4 }}>
                    <Video
                      ref={videoPlayer}
                      source={{
                        uri: selectedvideo,
                      }} // Can be a URL or a local file.
                      style={{
                        flex: 1,
                        backgroundColor: 'black',
                      }}
                      onError={e => console.log('error', e)}
                      paused={pause}
                      onProgress={({ currentTime, playableDuration }) => {
                        setProgrss(currentTime);
                        setplayableDuration(playableDuration);
                      }}
                      onLoad={data => {
                        const { duration } = data;
                        setplayableDuration(duration);
                      }}
                    />
                    {/* <ControlsOverlay
                    playableDuration={playableDuration}
                    setPause={setPause}
                    pause={pause}
                    progress={progress}
                    seekTo={sec => {
                      seekTo(sec);
                    }}
                    isChatVisible={isChatVisible}
                    setisChatVisible={setisChatVisible}
                  /> */}
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      bottom: -10,
                      alignItems: "center",
                      right: width / 4 - 35,
                    }}
                  >
                    <TouchableOpacity onPress={() => setVideoVisible(true)}>
                      <Avatar.Image
                        source={images.edit}
                        size={30}
                        style={{}}
                      ></Avatar.Image>
                      <Modal transparent={true} visible={videovisible}>
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
                              <TouchableOpacity onPress={() => setVideoVisible(false)}>
                                <Icon name="close-sharp" color="black" size={20} />
                              </TouchableOpacity>
                            </View>
                            <Text
                              style={[
                                style.title,
                                { color: theme.txt, alignSelf: "center" },
                              ]}
                            >
                              {t("change_your_video")}
                            </Text>
                            <View
                              style={[
                                style.divider1,
                                { color: Colors.disable, marginBottom: 20 },
                              ]}
                            ></View>
                            <TouchableOpacity
                              onPress={handleCamera}
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
                                {t("take_video")}
                              </Text>
                            </TouchableOpacity>
                            <View style={{ paddingTop: 15 }}>
                              <TouchableOpacity
                                onPress={handleLibrary}
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
              </View>}
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
                {t("additional_info")}
              </Text>

              <View>
                <TextInput
                  placeholder={t("enter_your_description")}
                  placeholderTextColor={Colors.disable}
                  multiline={true}
                  style={[
                    style.txtinput,
                    {
                      borderColor: Colors.border,
                      height: 150,
                      textAlignVertical: "top",
                      fontFamily: "Plus Jakarta Sans",
                    },
                  ]}
                  value={data.description}
                  onChangeText={(e) => setData({ ...data, description: e })}
                  selectionColor={Colors.border}
                />
              </View>
            </View>
            <View style={{ paddingVertical: 30 }}>
              <TouchableOpacity onPress={handleCreatePost} style={style.btn}>
                <Text style={style.btntxt}>{t("send")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
