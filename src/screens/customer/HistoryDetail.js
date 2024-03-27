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
import {
  likepost,
  uppost,
  downpost,
  followuser,
  cancelProgram,
  getPrograms,
  getProgramsByPerformer,
} from "../../actions/customer";
import { getChat, getReviewsByPost, setLoading } from "../../actions/common";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";

export default function CustomerHistoryDetail({ route }) {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const program = store.program;
  const currentUser = store.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCancelProgram, setModalCancelProgram] = useState(false);
  const { status } = route.params;
useEffect(() => {}, []);

  const handlechat = () => {
    navigation.navigate("LiveChat", {
      id: program.chat.id,
      member: program.member,
    });
  };

  const handlefollow = async () => {

    console.log("data.member.id", program.member.id);
    changeStore({ ...store, isLoading: true });
    await followuser(program)
      .then(res => {
        console.log(res);
        // changeStore({...store, program:res});
      }).catch(err => {
        console.log(err);
      })
      ;
    changeStore({ ...store, isLoading: false });
  };

  const handlelikepost = async () => {
    changeStore({ ...store, isLoading: true });
    await likepost(program)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
    changeStore({ ...store, isLoading: false });
  };
  const handleuppost = async () => {
    changeStore({ ...store, isLoading: true });
    await uppost(program)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
    changeStore({ ...store, isLoading: false });
  };
  const handledownpost = async () => {
    changeStore({ ...store, isLoading: true });
    await downpost(program)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
    changeStore({ ...store, isLoading: false });
  };

  const handleReview = () => {
    (async () => {
      await getReviewsByPost(program.id);
    })();
    navigation.navigate("CustomerReviewList");
  };

  const watchprogram = () => {
    // navigation.navigate("CustomerProgramEnter");

    var start_time = program.date + " " + program.start_time;
    var end_time = program.date + " " + program.end_time;
    var five_diff = Math.abs(
      new Date() - new Date(start_time.replace(/-/g, "/"))
    );
    var end_diff = Math.abs(new Date() - new Date(end_time.replace(/-/g, "/")));

    if (
      program.status == "reserve" &&
      program.status != "completed" &&
      five_diff < 5 * 60 * 1000 &&
      end_diff < 0
    ) {
      // Enter page
      console.log("Enter Page");
    } else {
      setModalVisible(true);
    }
  };

  const handleCancel = async() => {
    setModalCancelProgram(false);
    await cancelProgram(program.id)
      .then(res=>{
        if(res){
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Success",
          });
          navigation.replace("CustomerHistoryList");
        }
        else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Error",
          });          
        }
      })
    ;
    // changeStore({...store, isLoading:true});
    
  };
  const cancelprogram = () => {
    setModalCancelProgram(true);
  };

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("detail")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color="white"
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
              <Text style={{ color: "white", fontSize: 15 }}>
                {program.points}
              </Text>
            </View>
          </HStack>
        )}
      />
      <View style={{flex:1}}>
        {store.isLoading && <Spinner />}
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
                      source={{ uri: server.media_url + program.member.image_file }}
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
                    getProgramsByPerformer(program.member.id);
                    navigation.navigate("CustomerPostList");
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
                  <Text style={{ color: "white", fontSize: 15 }}>
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
            {!status.includes("complete") && (
              <View style={{ paddingTop: 10 }}>
                <View
                  style={[
                    style.row,
                    { justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
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
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => cancelprogram()}>
                      <View
                        style={{
                          backgroundColor: Colors.cancel,
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
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={[style.row, style.bottompage_container]}>
          <TouchableOpacity
            disabled={!program.is_chat.includes("yes") ? true : false}
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => handlechat()}
          >
            {!status.includes("complete") &&
            program.is_chat.includes("yes") ? (
              <>
                <Icon name="envelope" size={20} color="white" />
                <Text style={style.activetext}>{t("message")}</Text>
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
            onPress={() => handleReview()}
          >
            <Icon name="arrow-right" size={20} color="white" />
            <Text style={style.activetext}>{t("review")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
