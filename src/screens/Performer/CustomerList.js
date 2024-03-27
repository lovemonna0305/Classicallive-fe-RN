import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useTranslation } from "react-i18next";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/native";
import FlatPerformerPage2 from "../../components/FlatPerformerPage2";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { api } from "../../api";
import { getReservations } from "../../actions/performer";


export default function PerformerCustomerList() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);
  const [program, setProgram] = useState(global.program);
  const [reservations, setReservations] = useState();
  useEffect(() => {
    (async () => {
      try {
        const data = await getReservations(program.id);
        setReservations(data);
      } catch (err) {
        console.log(err)
      }
    })();
    (async () => { 
      global.isLoading = false;
    })();
  }, []);

  const [darkMode, setDarkMode] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handledeleteProgram = () => {
    // dispatch(deleteProgram(program.id));
    setModalDeleteVisible(false);
    (async () => {
      // await dispatch(getPrograms(2));
    })();
    // dispatch(setLoading(false));
    navigation.goBack();
  };

  const enterProgram = () => {
    navigation.navigate("PerformerProgramEnter");
    // // check
    // var start_time = program.date +" "+ program.start_time;
    // var end_time = program.date +" "+ program.end_time;
    // var five_diff = Math.abs(new Date() - new Date(start_time.replace(/-/g,'/')));
    // var end_diff = Math.abs(new Date() - new Date(end_time.replace(/-/g,'/')));
    // if((program.status=="reserv")&&(program.status!="completed")&&(five_diff< 5 * 60 * 1000)&&(end_diff<0)) {

    // } else {
    //   setModalVisible(true)
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <View style={{ flex: 1 }}>
        <AppBar
          color={theme.bg}
          title={t("user_list")}
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: theme.bg }}
                color="white"
                size={40}
              />
            </TouchableOpacity>
          }
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalDeleteVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalDeleteVisible(!modalDeleteVisible);
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
                    {t("sure_delete")}
                  </Text>
                </View>
                <View style={style.modalbtn_container}>
                  <TouchableOpacity
                    style={[style.modalbtn_confirm, { marginRight: 5 }]}
                    onPress={() => {
                      handledeleteProgram();
                    }}
                  >
                    <Text style={style.modalbtn_text}>{t("delete")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                    onPress={() => setModalDeleteVisible(false)}
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
        {global.isLoading && <Spinner />}            
        <FlatPerformerPage2 items={reservations} title={"customer"}  />
      </View>
      <View style={[style.row, style.bottompage_container]}>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => setModalDeleteVisible(true)}
        >
          <Icon name="times" size={20} color="white" />
          <Text style={style.activetext}>{t("delete")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => navigation.navigate("PerformerPostEdit")}
        >
          <Icon name="edit" size={20} color="white" />
          <Text style={style.activetext}>{t("edit")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => enterProgram()}
        >
          <Icon name="play-circle" size={20} color="white" />
          <Text style={style.activetext}>{t("play")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
