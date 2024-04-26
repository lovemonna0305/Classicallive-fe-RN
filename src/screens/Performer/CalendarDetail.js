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
import { Calendar } from 'react-native-big-calendar'
import Icon from "react-native-vector-icons/FontAwesome5";
import 'dayjs/locale/ja'

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PerformerCalendarDetail() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { program } = useSelector((state) => state.customer);
  const { currentUser } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);

  const events = [
    {
      title: 'Meeting',
      start: new Date(2024, 3, 5, 10, 0),
      end: new Date(2024, 3, 5, 10, 30),
      colorEvento:'red'
    },
    {
      title: 'Coffee break',
      start: new Date(2024, 3, 5, 12, 0),
      end: new Date(2024, 3, 5, 13, 30),
      colorEvento:'white'
    },
  ]
  const darkTheme = {
    palette: {
      primary: {
        main: '#6185d0',
        contrastText: '#000',
      },
      gray: {
        '100': '#333',
        '200': '#666',
        '300': '#888',
        '500': '#aaa',
        '800': '#ccc',
      },
    },
  }
  useEffect(() => {
    (async () => {})();
    console.log("Post Details page->");
  }, []);

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
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <View style={{ flex: 1, margin: 20, paddingVertical:50 }}>
        <Calendar 
          events={events} height={300} 
          mode={'month'}
          theme={darkTheme}
          locale="ja"
          eventCellStyle={event => ({ backgroundColor: event.colorEvento })}
          sortedMonthView={true}
          headerContentStyle={true}
          views={['day', 'week', 'work_week', 'month','agenda']}
          date={new Date(2021, 3, 5, 10, 0)}
          // renderHeaderForMonthView={true}

        />
      </View>

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
            <View style={{ paddingHorizontal: 20 }}>
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
                    style.subtitle,
                    { color: theme.txt, textAlign: "center" },
                  ]}
                >
                  {t("really_start")}
                </Text>
              </View>
              <View style={{ paddingTop: 20 }}>
                <Text
                  style={[
                    style.subtxt,
                    { color: Colors.disable, textAlign: "center" },
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{
                    paddingHorizontal: 30,
                    paddingVertical: 12,
                    borderColor: "#FF4747",
                    borderWidth: 1,
                    borderRadius: 20,
                    backgroundColor: theme.bg,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FF4747",
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    {t("enter")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 35,
                    paddingVertical: 12,
                    backgroundColor: Colors.primary,
                    borderRadius: 20,
                    marginLeft: 10,
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.bg,
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    {t("cancel")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
