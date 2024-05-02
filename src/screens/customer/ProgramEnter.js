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
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

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
import {
  likepost,
  uppost,
  downpost,
  followuser,
  cancelProgram,
  getPrograms,
  getProgramsByPerformer,
  completeProgram,
} from "../../actions/customer";
import { getChat } from "../../actions/common";

import { RTCView, mediaDevices } from '@videosdk.live/react-native-sdk';
import { Copy, MicOff, MicOn, VideoOff, VideoOn } from '../../assets/icons';
import TextInputContainer from '../../components/TextInputContainer';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server, videosdk } from "../../constants";
import { useStore } from "../../store/store";
import { api } from "../../api";

export default function CustomerProgramEnter() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const [meetingId, setMeetingId] = useState('');

  const token = videosdk.token;
  const streaming = store.streaming;
  const currentUser = store.currentUser;
  const program = store.program;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalCancelProgram, setModalCancelProgram] = useState(false);

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

  const handleReview = () => {
    navigation.navigate("CustomerReviewList");
  };

  const handleCancel = () => {
    setModalCancelProgram(false);
    dispatch(cancelProgram(program.id));
    dispatch(getPrograms(2));
    navigation.navigate("CustomerHistoryList");
  };
  const cancelprogram = () => {
    setModalCancelProgram(true);
  };

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,  paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("completed")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
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
                {program.points}
              </Text>
            </View>
          </HStack>
        )}
      />
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
              resizeMode="contain"
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
                  <Image
                    source={{ uri: server.member_url + program.member.image_file }}
                    style={{ width: 70, height: 70, borderRadius: 5 }}
                  />
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <Text style={style.activetext}>{program.member.name}</Text>
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
                  dispatch(getProgramsByPerformer(program.member.id))
                  navigation.navigate("CustomerPostList")
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

        </View>
      </ScrollView>
      <View
        style={[
          style.row,
          style.bottompage_container,
          { justifyContent: "center" },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
          <View
            style={{
              backgroundColor: Colors.cancel,
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginRight: 5,
              width: width / 2 - 80,
            }}
          >
            <Text style={[style.activetext, { textAlign: "center" }]}>
              {t("completed")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
