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
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { color } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Video from 'react-native-video';

export default function PerformerPostDetail() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { program } = useSelector((state) => state.common);
  const { currentUser } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEnterProgram, setModalEnterProgram] = useState(false);

  const enterProgram = () => {
    // check
    var start_time = program.date +" "+ program.start_time;
    var end_time = program.date +" "+ program.end_time;
    var five_diff = Math.abs(new Date() - new Date(start_time.replace(/-/g,'/')));
    var end_diff = Math.abs(new Date() - new Date(end_time.replace(/-/g,'/')));
    if((program.status=="done")&&(program.status!="completed")&&(five_diff< 5 * 60 * 1000)&&(end_diff<0)) {
      
    } else {
      setModalVisible(true)
    }
  };
  useEffect(() => {
    (async () => {})();
    console.log("Post Details page->");
  }, []);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,paddingTop: 30,   }]}
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
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
      />
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
            visible={modalEnterProgram}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalEnterProgram(!modalEnterProgram);
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
                      onPress={() => setModalEnterProgram(false)}
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
            />}
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
                <View style={[style.row, { alignItems: "center" }]}>
                  <Icon name={"user"} size={15} color={Colors.btn} />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text
                    style={[
                      style.activetext,
                      { color: Colors.btn, fontSize: 15 },
                    ]}
                  >
                    {program.users}
                  </Text>
                </View>
              </View>
              <View style={[style.row, {}]}>
                <View style={[style.row, { alignItems: "center" }]}>
                  <Icon name={"heart"} size={15} color={Colors.btn} />
                </View>
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
                <View style={[style.row, { alignItems: "center" }]}>
                  <Icon name={"thumbs-up"} size={15} color={Colors.btn} />
                </View>
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
                <View style={[style.row, { alignItems: "center" }]}>
                  <Icon name={"thumbs-down"} size={15} color={Colors.btn} />
                </View>
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
          {
            height: 50,
            paddingHorizontal: 50,
            paddingBottom: 10,
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {/* <Icon
               name="envelope"
               size={20}
               color=theme.txt
            />
            <Text style={style.activetext}>{t("message")}</Text> */}
        </View>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => enterProgram()}
        >
          <Icon name="arrow-right" size={20} color={theme.txt} />
          <Text style={style.activetext}>{t("enter")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
