import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";

import React, { useState, useContext, useEffect, useRef } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { getReviewsByPost, } from "../../actions/common";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { images, server } from "../../constants";
import { useStore } from "../../store/store";
import Spinner from "../../components/Spinner";

export default function CustomerReviewList() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const program = store.program;
  const currentUser = store.currentUser;
  const [reviews, setReviews] = useState({});
  const [commitReview, setCommitReview] = useState(true);

  useEffect(() => {
    changeStore({ ...store, isLoading: true });
    (async () => {
      await getReviewsByPost(program.id)
        .then(res => {
          setReviews(res)
          const found = res.find((element) => element.customer.id = currentUser.id);
          if(found){
            setCommitReview(false);
          }
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        })
    })();
  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const selectReview = (item) => {
    // dispatch(setProgram(item));
    // navigation.navigate("CustomerReviewDetail")
  };

  const renderItem = ({ item, index }) => {
    const selectProgram = (item) => {
      changeStore({ ...store, program: item });
      navigation.navigate("CustomerPostDetail");
    };
    return (
      <>
        <TouchableOpacity key={`customer-review-${item.id}`}
          style={{ height: 90, padding: 5, backgroundColor: theme.itembackground, borderRadius: 5, marginBottom: 5 }}
          onPress={() => selectReview(item)}>
          <View style={[style.row, { paddingTop: 5, paddingHorizontal: 2 }]}>
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: server.member_url + item.customer.image_file }}
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <View style={[style.row, { alignContent: "center", justifyContent: "space-between", marginHorizontal: 5, marginBottom: 7 }]}>
                <View style={{ paddingLeft: 10 }}>
                  <Text numberOfLines={1} style={[style.activetext, { width: width / 2 - 50 }]}>{item.customer.name}</Text>
                </View>
                <View style={{ paddingTop: 5 }}>
                  <StarRatingDisplay
                    rating={item.rating}
                    starSize={12}
                    starStyle={{ paddingHorizontal: 1, marginHorizontal: 0 }}
                  />
                </View>
              </View>
              <View style={[style.row, { alignContent: "center", justifyContent: "space-between", marginHorizontal: 5, marginBottom: 8 }]}>
                <View style={{ paddingLeft: 10 }}>
                  <Text numberOfLines={2} style={[style.secondarytext, { fontSize: 12, width: width / 2 + 50 }]}>{item.description}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    )
  };


  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30,  }]}
    >
      <AppBar
        color={theme.bg}
        title={t("review")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.replace('HistoryList')}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
      />
      {store.isLoading && <Spinner />}
      
        {reviews && (reviews.length > 0) ? (
          <ScrollView style={{ flex: 1, marginHorizontal: 10, marginBottom: 5 }}>
            <FlatList
              key={"review-list"}
              data={reviews}
              programs={(item, index) => {
                return index;
              }}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          </ScrollView>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: theme.txt,
                fontSize: 14,
                textAlign: "center",
                opacity: 0.4,
              }}
            >
              {t("no_review_exists")}
            </Text>
          </View>
        )}
      {commitReview&&
        <View
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Review")}
          >
            <Avatar.Image
              source={images.plus}
              style={{ backgroundColor: "" }}
              size={130}
            ></Avatar.Image>
          </TouchableOpacity>
        </View>
      }
    </SafeAreaView>
  );
}
