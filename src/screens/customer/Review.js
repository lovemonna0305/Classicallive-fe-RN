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
import { server } from "../../constants";
import { useStore } from "../../store/store";
import Spinner from "../../components/Spinner";
import Toast from "react-native-toast-message";

export default function CustomerReview() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState();
  const program = store.program;
  const currentUser = store.currentUser;

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30,}]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title={t("review")}
          titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.replace('ReviewList')}>
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
              {t("star")}
            </Text>
            <View style={{ paddingTop: 10 }}>

              <StarRating
                rating={rating}
                onChange={setRating}
              />
            </View>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
              {t('comment')}
            </Text>
            <View style={{ paddingTop: 10 }}>
              <TextInput
                value={description}
                onChangeText={(e) => setDescription(e)}
                placeholder={t("rate_performance")}
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
                formdata.append("member_id", currentUser.id);
                formdata.append("poster_id", program.member.id);
                formdata.append("post_id", program.id);
                formdata.append("rating", rating);
                formdata.append("description", description);
                changeStore({ ...store, isLoading: true });
                (async () => {
                  await commitReview(formdata, program)
                    .then(res => {
                      Toast.show({
                        type: "success",
                        text1: t('success'),
                        text2: t('review_created_successfully'),
                      });
                      changeStore({ ...store, isLoading: false });
                    }).catch(err => {
                      Toast.show({
                        type: "error",
                        text1: t('error'),
                        text2: err,
                      });
                      changeStore({ ...store, isLoading: false });
                    });
                })();
                navigation.replace('ReviewList');
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
