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
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import { useStore } from "../../store/store";

import {
  completeProgram,
} from "../../actions/performer";

export default function PerformerProgramEnter() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const program = store.program;
  const pPendingPoints = store.pPendingPoints;

  // const completeProgram = () => {

  // };
  useEffect(() => {
    changeStore({ ...store, isLoading: true });
    (async () => {
      completeProgram(program.id)
        .then(points => {
          currentUser.points += points;
          changeStore({ ...store, isLoading: false, currentUser: currentUser, pPendingPoints: points });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        });
    })();
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
              color="white"
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <View style={{ paddingTop: 10 }}>
            <Image
              source={{ uri: server.media_url + program.image_file }}
              resizeMode="contain"
              style={[style.img, { height: 200 }]}
            />
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
                  <Icon name="user" size={15} color={Colors.btn} />
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
                  <Icon name="heart" size={15} color={Colors.btn} />
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
                  <Icon name="thumbs-up" size={15} color={Colors.btn} />
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
                  <Icon name="thumbs-down" size={15} color={Colors.btn} />
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
          <View style={{ paddingTop: 25 }}>
            <Text style={[style.activetext, {}]}>{"You have got points :"}{pPendingPoints}</Text>
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
        <TouchableOpacity onPress={() => navigation.replace("Home")}>
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
