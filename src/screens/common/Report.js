import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import { AppBar, Spacer } from "@react-native-material/core";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import theme from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';
import themeContext from "../../theme/themeContex";
import { commitReview, getPrograms } from "../../actions/customer";

import { t } from "i18next";
import { getReviewsByPost } from "../../actions/common";
import { images, server } from "../../constants";
import { useStore } from "../../store/store";
import Spinner from "../../components/Spinner";
import Toast from "react-native-toast-message";
import { api } from "../../api";
import { Image } from "react-native-svg";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Report() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [subject, setSubject] = useState();
  const [description, setDescription] = useState();
  const program = store.program;
  const currentUser = store.currentUser;

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title={t("report")}
          titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
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
        <View style={{ flex: 1 }}>
          {store.isLoading && <Spinner />}
          <View style={{ paddingTop: 15 }}>
            <View style={[style.row, { alignItems: "center" }]}>
              <View>
                <Image
                  source={images.plus}
                  resizeMode="stretch"
                  style={{ width: 22, height: 22 }}
                />
              </View>
              <Text
                style={[
                  style.txt1,
                  {
                    fontWeight: "500",
                    color: theme.txt,
                    fontFamily: "Plus Jakarta Sans",
                  },
                ]}
              >
                {'Classical LIVE'}
              </Text>
            </View>

            {/* <View style={{ paddingTop: 10 }}>
              <Text
                style={[
                  style.txt1,
                  {
                    fontWeight: "500",
                    color: theme.txt,
                    fontFamily: "Plus Jakarta Sans",
                  },
                ]}
              >
                {t("subject_")}
              </Text>
              <View style={{ paddingTop: 10 }}>
                <TextInput
                  value={subject}
                  onChangeText={(e) => setSubject(e)}
                  // placeholder={t("subject_")}
                  placeholderTextColor={Colors.disable}
                  multiline={true}
                  style={[
                    style.txtinput,
                    {
                      borderColor: Colors.border,
                      textAlignVertical: "top",
                      fontFamily: "Plus Jakarta Sans",
                    },
                  ]}
                  selectionColor={Colors.border}
                />
              </View>
            </View> */}
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
              {t('body_')}
            </Text>
            <View style={{ paddingTop: 10 }}>
              <TextInput
                value={description}
                onChangeText={(e) => setDescription(e)}
                // placeholder={t("rate_performance")}
                placeholderTextColor={Colors.disable}
                multiline={true}
                style={[
                  style.txtinput,
                  {
                    borderColor: Colors.border,
                    height: height * 0.4,
                    textAlignVertical: "top",
                    fontFamily: "Plus Jakarta Sans",
                  },
                ]}
                selectionColor={Colors.border}
              />
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
              justifyContent: "flex-end",
              flex: 1,
              paddingBottom: 10,
              marginBottom: 10
            }}
          >
            <TouchableOpacity
              style={style.btn}
              onPress={() => {
                let formdata = new FormData();
                // formdata.append("subject", subject);
                formdata.append("description", description);
                changeStore({ ...store, isLoading: true });
                (async () => {
                  await api.sendReport(formdata)
                    .then(res => {
                      Toast.show({
                        type: "success",
                        text1: t('success'),
                        text2: t(res.data.message),
                      });
                      changeStore({ ...store, isLoading: false });
                    }).catch(err => {
                      console.log(err);
                      changeStore({ ...store, isLoading: false });
                    });
                })();
              }}
            >
              <Text style={style.btntxt}>{t("send")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
