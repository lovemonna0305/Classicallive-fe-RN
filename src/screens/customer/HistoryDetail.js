import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  Styleheet,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
  Modal,
  Dimensions,
} from "react-native";

import Toast from "react-native-toast-message";
import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { color } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import {
  likepost,
  uppost,
  downpost,
  followuser,
  cancelProgram,
  getPrograms,
  getProgramsByPerformer,
  reservProgram,
  requestcancelProgram,
} from "../../actions/customer";
import { getChat, getReviewsByPost, setLoading } from "../../actions/common";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server, videosdk } from "../../constants";
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";
import { api } from "../../api";
import moment from "moment";
import Video from 'react-native-video';

export default function CustomerHistoryDetail({ route }) {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [meetingId, setMeetingId] = useState('');

  const streaming = store.streaming;
  const program = store.program;
  const currentUser = store.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(program.reserv_status);
  const [modalCancelProgram, setModalCancelProgram] = useState(false);
  const [modalReserve, setModalReserve] = useState(false);
  const [modalWatch, setModalWatch] = useState(false);
  // const { status } = route.params;
  console.log(server.member_url + program.member.image_file)

  useEffect(() => {
    changeStore({ ...store, isLoading: true });
    (async () => {
      (api.getMeetingID(program.id))
        .then(res => {
          setMeetingId(res.data.data.meetingId);
          changeStore({ ...store, isLoading: false });
        }).catch(res => {
          changeStore({ ...store, isLoading: false });
        })
    })();
  }, []);

  const naviagateToViewer = () => {

    streaming.name = currentUser.name.trim()
    streaming.meetingId = meetingId;
    streaming.mode = 'VIEWER';

    changeStore({
      ...store,
      streaming: streaming
    });
    navigation.navigate('Meeting');
  };

  const handlechat = () => {
    navigation.navigate("LiveChat", {
      id: program.chat.id,
      member: program.member,
    });
  };

  const reserve = async () => {
    changeStore({ ...store, isLoading: true });
    setModalReserve(!modalReserve);
    await reservProgram(program)
      .then((res) => {
        currentUser.points -= program.points;
        changeStore({ ...store, currentUser: currentUser });
        setStatus("reserved")
        Toast.show({
          type: "success",
          text1: t('success'),
          text2: t("reserve_success"),
        });
      }).catch((err) => {
        console.log(err);
      });
  };

  const handlefollow = async () => {

    changeStore({ ...store, isLoading: true });
    await followuser(program)
      .then(res => {
        if (res.includes("yes")) {
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t('user_follow'),
          });
        } else {
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t('not_user_follow'),
          });
        }
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: t('error'),
          text2: t('server_error'),
        });
      })
      ;
    changeStore({ ...store, isLoading: false });
  };
  const handlelikepost = async () => {
    changeStore({ ...store, isLoading: true });
    await likepost(program)
      .then(res => {
        if (res.includes("yes")) {
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t('post_like'),
          });
        } else {
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t('not_post_like'),
          });
        }
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: t('error'),
          text2: t('server_error'),
        });
      });
    changeStore({ ...store, isLoading: false });
  };
  const handleuppost = async () => {
    changeStore({ ...store, isLoading: true });
    await uppost(program)
      .then(res => {
        if (res.includes("yes")) {
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t('post_up'),
          });
        } else {
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t('not_post_up'),
          });
        }
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: t('error'),
          text2: t('server_error'),
        });
      });
    changeStore({ ...store, isLoading: false });
  };
  const handledownpost = async () => {
    changeStore({ ...store, isLoading: true });
    await downpost(program)
      .then(res => {
        if (res.includes("yes")) {
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t('post_down'),
          });
        } else {
          Toast.show({
            ttype: "success",
            text1: t('success'),
            text2: t('not_post_down'),
          });
        }
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: t('error'),
          text2: t('server_error'),
        });
      });
    changeStore({ ...store, isLoading: false });
  };

  const handleReview = () => {
    navigation.navigate("ReviewList");
  };

  const watchprogram = () => {


    const currentdate = moment(moment(new Date()).utcOffset('+0900').format('YYYY-MM-DD HH:mm'))

    var start_time = moment(program.date + " " + program.start_time);
    var end_time = moment(program.date + " " + program.end_time);
    const five_diff = start_time.diff(currentdate, 'minutes');
    const end_diff = end_time.diff(currentdate, 'minutes');
    if (five_diff < 6) {
      if (end_diff > 0) {
        //  Enter page
        if (meetingId == null) {
          setModalWatch(true);
          return;
        }
        naviagateToViewer();
      } else {
        Toast.show({
          type: "error",
          text1: t('error'),
          text2: t('program_completed_already'),
        });
      }

    } else {
      setModalVisible(true);
    }
  };

  const handleCancel = async () => {
    setModalCancelProgram(false);
    changeStore({ ...store, isLoading: true });
    await requestcancelProgram(program.id)
      .then(res => {
        if (res.data.success) {
          setStatus('request_cancel');
          program.reserv_status = 'request_cancel';
          changeStore({ ...store, program: program });
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t(res.data.message),
          });
          changeStore({ ...store, isLoading: false });
        }
        else {
          Toast.show({
            type: "error",
            text1: t('error'),
            text2: t(res.data.message),
          });
          changeStore({ ...store, isLoading: false });
        }
      })
  };

  const cancelprogram = () => {
    setModalCancelProgram(true);
  };

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("detail")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
        trailing={(props) => (
          <HStack
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ paddingRight: 10 }}>
              <Image
                source={require("../../../assets/img/ic_coin.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View style={{ paddingRight: 20 }}>
              <Text style={{ color: theme.txt, fontSize: 15 }}>
                {currentUser.points}
              </Text>
            </View>
          </HStack>
        )}
      />
      <View style={{ flex: 1 }}>
        {store.isLoading && <Spinner />}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalReserve}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalReserve(!modalReserve);
          }}
        >
          <View
            style={{
              flex: 1,
              width: width,
              backgroundColor: "#000000aa",
            }}
          >
            <View
              style={[
                style.modalcontainer,
                {
                  backgroundColor: theme.bg,
                  width: width - 30,
                  marginVertical: 170,
                },
              ]}
            >
              <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                <View style={{ paddingTop: 10, alignSelf: "center" }}>
                  <Avatar.Icon
                    icon="help"
                    color="#FF4747"
                    size={80}
                    style={{
                      borderWidth: 5,
                      borderColor: "#FF4747",
                      backgroundColor: theme.bg,
                    }}
                  />
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text
                    style={[
                      style.subtxt,
                      { color: Colors.disable, textAlign: "center" },
                    ]}
                  >
                    {t("reserv_sure")}
                  </Text>
                </View>
                <View style={style.modalbtn_container}>
                  <TouchableOpacity
                    onPress={() => {
                      reserve();
                    }}
                    style={[style.modalbtn_confirm, { marginRight: 5 }]}
                  >
                    <Text style={style.modalbtn_text}>
                      {t("reservation")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                    onPress={() => setModalReserve(false)}
                  >
                    <Text style={style.modalbtn_text}>{t("cancel")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalWatch}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalWatch(!modalWatch);
          }}
        >
          <View
            style={{
              flex: 1,
              width: width,
              backgroundColor: "#000000aa",
            }}
          >
            <View
              style={[
                style.modalcontainer,
                {
                  backgroundColor: theme.bg,
                  width: width - 30,
                  marginVertical: 170,
                },
              ]}
            >
              <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                <View style={{ paddingTop: 10, alignSelf: "center" }}>
                  <Avatar.Icon
                    icon="help"
                    color="#FF4747"
                    size={80}
                    style={{
                      borderWidth: 5,
                      borderColor: "#FF4747",
                      backgroundColor: theme.bg,
                    }}
                  />
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Text
                    style={[
                      style.subtxt,
                      { color: Colors.disable, textAlign: "center" },
                    ]}
                  >
                    {t("performer_not_created_service")}
                  </Text>
                </View>
                <View style={style.modalbtn_container}>
                  <TouchableOpacity
                    style={[style.modalbtn_confirm, { marginLeft: 5 }]}
                    onPress={() => setModalWatch(false)}
                  >
                    <Text style={style.modalbtn_text}>{t("ok")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 60 }}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: width,
                  backgroundColor: "#000000aa",
                }}
              >
                <View
                  style={[
                    style.modalcontainer,
                    {
                      backgroundColor: theme.bg,
                      width: width - 30,
                      marginVertical: 170,
                    },
                  ]}
                >
                  <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                    <View style={{ paddingTop: 10, alignSelf: "center" }}>
                      <Avatar.Icon
                        icon="help"
                        color="#FF4747"
                        size={80}
                        style={{
                          borderWidth: 5,
                          borderColor: "#FF4747",
                          backgroundColor: theme.bg,
                        }}
                      />
                    </View>
                    <View style={{ paddingTop: 20 }}>
                      <Text
                        style={[
                          style.subtxt,
                          { color: Colors.disable, textAlign: "center" },
                        ]}
                      >
                        {t("can_enter_5mins_ago")}
                      </Text>
                    </View>
                    <View style={style.modalbtn_container}>
                      <TouchableOpacity
                        style={[style.modalbtn_confirm, { marginRight: 5 }]}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={style.modalbtn_text}>{t("ok")}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalCancelProgram}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalCancelProgram(!modalCancelProgram);
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: width,
                  backgroundColor: "#000000aa",
                }}
              >
                <View
                  style={[
                    style.modalcontainer,
                    {
                      backgroundColor: theme.bg,
                      width: width - 30,
                      marginVertical: 170,
                    },
                  ]}
                >
                  <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                    <View style={{ paddingTop: 10, alignSelf: "center" }}>
                      <Avatar.Icon
                        icon="help"
                        color="#FF4747"
                        size={80}
                        style={{
                          borderWidth: 5,
                          borderColor: "#FF4747",
                          backgroundColor: theme.bg,
                        }}
                      />
                    </View>
                    <View style={{ paddingTop: 20 }}>
                      <Text
                        style={[
                          style.subtxt,
                          { color: Colors.disable, textAlign: "center" },
                        ]}
                      >
                        {t("cancel_sure")}
                      </Text>
                    </View>
                    <View style={style.modalbtn_container}>
                      <TouchableOpacity
                        onPress={() => {
                          handleCancel();
                        }}
                        style={[style.modalbtn_confirm, { marginRight: 5 }]}
                      >
                        <Text style={style.modalbtn_text}>{t("ok")}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                        onPress={() => setModalCancelProgram(false)}
                      >
                        <Text style={style.modalbtn_text}>{t("cancel")}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={{ paddingTop: 10 }}>
              <Image
                source={{ uri: server.media_url + program.image_file }}
                resizeMode="cover"
                style={[style.img, { height: 200 }]}
              />
            </View>
            <View style={{ paddingVertical: 5 }}>
              <Text style={style.activetext}>{t("performer")}</Text>
            </View>
            <View
              style={{
                height: 90,
                padding: 5,
                backgroundColor: theme.box,
                borderRadius: 5,
              }}
            >
              <View
                style={[
                  style.row,
                  {
                    justifyContent: "space-between",
                    paddingTop: 5,
                    paddingHorizontal: 10,
                  },
                ]}
              >
                <View style={style.row}>
                  <View style={{}}>

                  {program.is_video?
                    <View style={{ flex:1,marginVertical: 20, marginBottom: 20, height: width * 0.5, justifyContent:'center', }}>
                      <Video
                      source={{ uri: server.media_url + program.video_file }}
                      autoplay={true}
                      controls={false}
                      disableFocus={true}
                      resizeMode="cover"
                      style={{
                        flex: 1,
                        backgroundColor: 'black',
                      }}
                    />
                  </View>:
                    <Image
                      source={{ uri: server.media_url + program.image_file }}
                      resizeMode="cover"
                      style={[style.img, { height: 200 }]}
                    />
                  }
                  </View>
                  <View style={{}}>
                    <Image
                      source={{ uri: server.member_url + program.member.image_file }}
                      style={{ width: 70, height: 70, borderRadius: 5 }}
                    />
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={style.activetext}>
                      {program.member.name}
                    </Text>
                    <StarRatingDisplay
                      style={{ paddingTop: 10 }}
                      rating={program.member.ratings}
                      starSize={12}
                      starStyle={{ paddingHorizontal: 1, marginHorizontal: 0 }}
                    />
                    {/* Not Complete post numbers */}
                    <Text
                      style={[
                        style.secondarytext,
                        { fontSize: 12, paddingTop: 5 },
                      ]}
                    >
                      {t("posts_cnt")} : {program.member.services}{" "}
                      {t("followers")} : {program.member.followers}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ paddingRight: 5, paddingTop: 5 }}
                  onPress={() => {
                    changeStore({ ...store, page: "CustomerHistoryDetail" });
                    getProgramsByPerformer(program.member.id);
                    navigation.replace("CustomerPostList")
                  }}
                >
                  <Image
                    source={require("../../../assets/img/music_list.png")}
                    resizeMode="contain"
                    style={{ width: 22, height: 22 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingTop: 25 }}>
              <Text style={[style.activetext, {}]}>{program.title}</Text>
            </View>
            <View style={{ paddingTop: 10 }}>
              <Text style={[style.secondarytext, { fontSize: 10 }]}>
                {program.date} {program.start_time}~
                {program.end_time}
              </Text>
            </View>
            {/* Detail */}
            <View
              style={[
                style.row,
                { paddingTop: 10, justifyContent: "space-between" },
              ]}
            >
              <View style={[style.row, { paddingRight: 10 }]}>
                <View style={[style.row, {}]}>
                  <TouchableOpacity
                    style={[style.row, { alignItems: "center" }]}
                    onPress={() => handlefollow()}
                  >
                    <Icon
                      name={
                        program.member.is_follow.includes("yes")
                          ? "user"
                          : "user-o"
                      }
                      size={15}
                      color={Colors.btn}
                    />
                  </TouchableOpacity>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 15 },
                      ]}
                    >
                      {program.member.followers}
                    </Text>
                  </View>
                </View>
                <View style={[style.row, {}]}>
                  <TouchableOpacity
                    style={[style.row, { alignItems: "center" }]}
                    onPress={() => handlelikepost()}
                  >
                    <Icon
                      name={
                        program.is_liked.includes("yes")
                          ? "heart"
                          : "heart-o"
                      }
                      size={15}
                      color={Colors.btn}
                    />
                  </TouchableOpacity>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 15 },
                      ]}
                    >
                      {program.likes}
                    </Text>
                  </View>
                </View>
                <View style={[style.row, {}]}>
                  <TouchableOpacity
                    style={[style.row, { alignItems: "center" }]}
                    onPress={() => handleuppost()}
                  >
                    <Icon
                      name={
                        program.is_up.includes("yes")
                          ? "thumbs-up"
                          : "thumbs-o-up"
                      }
                      size={15}
                      color={Colors.btn}
                    />
                  </TouchableOpacity>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 15 },
                      ]}
                    >
                      {program.ups}
                    </Text>
                  </View>
                </View>
                <View style={[style.row, {}]}>
                  <TouchableOpacity
                    style={[style.row, { alignItems: "center" }]}
                    onPress={() => handledownpost()}
                  >
                    <Icon
                      name={
                        program.is_down.includes("yes")
                          ? "thumbs-down"
                          : "thumbs-o-down"
                      }
                      size={15}
                      color={Colors.btn}
                    />
                  </TouchableOpacity>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 15 },
                      ]}
                    >
                      {program.downs}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[style.row, { paddingRight: 5 }]}>
                <View>
                  <Image
                    source={require("../../../assets/img/ic_coin.png")}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ paddingRight: 10, paddingHorizontal: 5 }}>
                  <Text style={{ color: theme.txt, fontSize: 15 }}>
                    {program.points}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ paddingTop: 10 }}>
              <Text style={[style.secondarytext, { fontSize: 14 }]}>
                {program.description}
              </Text>
            </View>
            {(!status.includes("complete")) && (!program.is_past) && (
              <View style={{ paddingTop: 10 }}>
                <View
                  style={[
                    style.row,
                    { justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  {(status.includes("reserv") || status.includes("request_cancel")) && <View style={{ flex: 1, justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => watchprogram()}>
                      <View
                        style={{
                          backgroundColor: Colors.green,
                          borderRadius: 5,
                          padding: 10,
                          marginRight: 10,
                        }}
                      >
                        <Text style={[style.activetext, { textAlign: "center" }]}>
                          {t("watch")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>}
                  {(status.includes("approved")) && <View style={{ flex: 1, justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => watchprogram()}>
                      <View
                        style={{
                          backgroundColor: Colors.green,
                          borderRadius: 5,
                          padding: 10,
                          marginRight: 10,
                        }}
                      >
                        <Text style={[style.activetext, { textAlign: "center" }]}>
                          {t("watch")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>}
                  {(status.includes("canceled")) && <View style={{ flex: 1, justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => watchprogram()} disabled={true}>
                      <View
                        style={{
                          backgroundColor: Colors.disable,
                          borderRadius: 5,
                          padding: 10,
                          marginRight: 10,
                        }}
                      >
                        <Text style={[style.activetext, { textAlign: "center" }]}>
                          {t("watch")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>}


                  {(status.includes("canceled")) ?
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity onPress={() => setModalReserve(true)}
                      >
                        <View
                          style={{
                            backgroundColor: Colors.green,
                            borderRadius: 5,
                            padding: 10,
                            marginLeft: 10,
                          }}
                        >
                          <Text style={[style.activetext, { textAlign: "center" }]}>
                            {t("reserve")}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity onPress={() => cancelprogram()}
                        disabled={status.includes("canceled") ? true : false}
                      >
                        <View
                          style={{
                            backgroundColor: status.includes("canceled") ? Colors.disable : Colors.cancel,
                            borderRadius: 5,
                            padding: 10,
                            marginLeft: 10,
                          }}
                        >
                          <Text style={[style.activetext, { textAlign: "center" }]}>
                            {t("cancel")}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={[style.row, style.bottompage_container]}>
          <TouchableOpacity
            disabled={!status.includes("complete") &&!program.is_chat.includes("yes") ? true : false}
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => handlechat()}
          >
            {!status.includes("complete") &&
              program.is_chat.includes("yes") ? (
              <>
                <Icon name="envelope" size={20} color={theme.txt} />
                <Text style={[style.activetext, { color: theme.txt }]}>{t("message")}</Text>
              </>
            ) : (
              <>
                <Icon name="envelope" size={20} color={Colors.disable} />
                <Text style={[style.activetext, { color: Colors.disable }]}>
                  {t("message")}
                </Text>
              </>
            )}
          </TouchableOpacity>
          {!status.includes("complete") ? (
            <>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={() => handleReview()}
                disabled={true}
              >
                <Icon name="arrow-right" size={20} color={Colors.disable} />
                <Text style={[style.activetext, { color: Colors.disable }]}>{t("review")}</Text>
              </TouchableOpacity>
            </>) : (
            <>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={() => handleReview()}
              >
                <IconMaterial name="reviews" size={20} color={theme.txt} />
                <Text style={[style.activetext, { color: theme.txt }]}>{t("review")}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
