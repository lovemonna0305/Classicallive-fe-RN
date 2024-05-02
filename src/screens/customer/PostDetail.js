import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";

import React, { useState, useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
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
import Video from 'react-native-video';

import {
  likepost,
  uppost,
  downpost,
  followuser,
  getPrograms,
  reservProgram,
  getProgramsByPerformer
} from "../../actions/customer";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import { useStore } from "../../store/store";
import Spinner from "../../components/Spinner";

export default function CustomerPostDetail() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const program = store.program;
  const page = store.page;
  const currentUser = store.currentUser;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEnter, setModalEnter] = useState(false);
  const [modalReserve, setModalReserve] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const checkProgram = () => {
    if (currentUser.points > program.points) {
    setModalVisible(true);
    return;
    }
    setModalReserve(true);
  };
  const reserve = async () => {
    changeStore({ ...store, isLoading: true });
    setModalReserve(!modalReserve);
    await reservProgram(program)
      .then((res) => {
        if (res) {
          currentUser.points -= program.points;
          changeStore({ ...store, currentUser: currentUser, page: "HistoryList" });
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t('reserve_success'),
          });
        } else {
          Toast.show({
            type: "info",
            text1: t('info'),
            text2: t('you_already_reserved'),
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    navigation.navigate("HistoryList");
  };
  const handlechat = () => {
    navigation.navigate("LiveChat", {
      id: program.chat.id,
      member: program.member,
    });
  };
  const handlefollow = async () => {

    changeStore({ ...store, isLoading: true });
    await followuser(program)
      .then(res => {
        if (res.includes("yes")) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: t('user_follow'),
          });
        } else {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: t('not_user_follow'),
          });
        }
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: "Error",
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
            text1: "Success",
            text2: t('post_like'),
          });
        } else {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: t('not_post_like'),
          });
        }
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: "Error",
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
            text1: "Success",
            text2: t('post_up'),
          });
        } else {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: t('not_post_up'),
          });
        }
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: "Error",
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
            text1: "Success",
            text2: t('post_down'),
          });
        } else {
          Toast.show({
            ttype: "success",
            text1: "Success",
            text2: t('not_post_down'),
          });
        }
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: t('server_error'),
        });
      });
    changeStore({ ...store, isLoading: false });
  };

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30,  }]}
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
          }
          }>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
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
                        {t("not_enough_points")}
                      </Text>
                    </View>
                    <View style={style.modalbtn_container}>
                      <TouchableOpacity
                        style={[style.modalbtn_confirm, { marginRight: 5 }]}
                        onPress={() => {
                          // changeStore({ ...store, page: "CustomerPostDetail" });
                          navigation.navigate("CustomerPoints")
                          setModalVisible(false);
                        }}
                      >
                        <Text style={style.modalbtn_text}>
                          {t("purchase_coins")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                        onPress={() => setModalVisible(false)}
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
            <View style={{ paddingTop: 10 }}>
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
                  onPress={async () => {
                    await changeStore({ ...store, page: "CustomerPostDetail" });
                    navigation.replace("CustomerPostList")
                  }
                  }
                >
                  <Image
                    source={require("../../../assets/img/music_list.png")}
                    resizeMode="stretch"
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
                    resizeMode="stretch"
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
        <View style={[style.row, style.bottompage_container]}>
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            disabled={!program.is_chat.includes("yes") ? true : false}
            onPress={() => handlechat()}
          >
            {program.is_chat.includes("yes") ? (
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
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => checkProgram()}
          >
            <Icon name="plus" size={20} color={theme.txt} />
            <Text style={[style.activetext, { color: theme.txt }]}>{t("reservation")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
