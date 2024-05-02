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
} from "react-native";

import React, { useState, useContext, useEffect, useRef } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import {
  setLoading,
  setProgram,
} from "../../actions/common";
import { useNavigation } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import SubCategoryItem from "../../components/SubCategoryItem";
import { server } from "../../constants";
import Spinner from "../../components/Spinner";

export default function CustomerProgramList() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { cNReservs, program, reservationsbycategory } = useSelector(
    (state) => state.customer
  );
  const { isLoading, pCategory, allcategories } = useSelector((state) => state.common);

  useEffect(() => {
    (async () => {
      let formdata = new FormData();
      formdata.append("member_id", currentUser.id);
      formdata.append("role", "customer");
      formdata.append("category", pCategory.id);
      formdata.append("subcategory", 0);
      
    })();
    dispatch(setLoading(false));
  }, []);

  const renderItem = ({ item, index }) => {
    const selectProgram = (item) => {
      console.log(item);
      dispatch(setProgram(item));
      navigation.navigate("CustomerPostDetail");
    };
    return (
      <TouchableOpacity
        key={index}
        style={{
          height: 90,
          padding: 5,
          backgroundColor: theme.box,
          borderRadius: 5,
          marginBottom: 5,
        }}
        onPress={() => selectProgram(item)}
      >
        <View style={[style.row, { paddingTop: 5, paddingHorizontal: 10 }]}>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: server.media_url + item.image_file }}
              style={{ width: 70, height: 70, borderRadius: 5 }}
            />
          </View>
          <View style={{ flex: 4 }}>
            <View
              style={[
                style.row,
                {
                  alignContent: "center",
                  justifyContent: "space-between",
                  marginHorizontal: 5,
                  marginBottom: 7,
                },
              ]}
            >
              <View style={{ paddingLeft: 10 }}>
                <Text style={style.activetext}>{item.title}</Text>
              </View>
              <View style={{ paddingTop: 5 }}>
                <StarRatingDisplay
                  rating={4.5}
                  starSize={12}
                  starStyle={{ paddingHorizontal: 1, marginHorizontal: 0 }}
                />
              </View>
            </View>
            <View
              style={[
                style.row,
                {
                  alignContent: "center",
                  justifyContent: "space-between",
                  marginHorizontal: 5,
                  marginBottom: 8,
                },
              ]}
            >
              <View style={{ paddingLeft: 10 }}>
                <Text style={[style.secondarytext, { fontSize: 12 }]}>
                  {t(allcategories[item.category].slug)}
                </Text>
              </View>
              <View style={{}}>
                <Text style={[style.secondarytext, { fontSize: 10 }]}>
                  {item.date} {item.start_time}~{item.end_time}
                </Text>
              </View>
            </View>
            <View
              style={[
                style.row,
                {
                  alignContent: "center",
                  justifyContent: "space-between",
                  marginHorizontal: 5,
                  paddingLeft: 10,
                },
              ]}
            >
              <View
                style={[
                  style.row,
                  { alignContent: "center", justifyContent: "space-between" },
                ]}
              >
                <View style={[style.row, { alignItems: "center" }]}>
                  <View style={[style.row]}>
                    <Icon name="user" size={11} color={Colors.btn} />
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 11 },
                      ]}
                    >
                      {item.points}
                    </Text>
                  </View>
                </View>
                <View style={[style.row, { alignItems: "center" }]}>
                  <View style={[style.row]}>
                    <Icon name="heart" size={11} color={Colors.btn} />
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 11 },
                      ]}
                    >
                      {item.points}
                    </Text>
                  </View>
                </View>
                <View style={[style.row, { alignItems: "center" }]}>
                  <View style={[style.row]}>
                    <Icon name="times" size={11} color={Colors.btn} />
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 11 },
                      ]}
                    >
                      {item.points}
                    </Text>
                  </View>
                </View>
                <View style={[style.row, { alignItems: "center" }]}>
                  <View style={[style.row]}>
                    <Icon name="star" size={11} color={Colors.btn} />
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 11 },
                      ]}
                    >
                      {item.points}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[style.row, { alignItems: "center" }]}>
                <View>
                  <Image
                    source={require("../../../assets/img/ic_coin.png")}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={{ color: theme.txt, fontSize: 11 }}>
                    {item.points}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("delivery_schedule") },
    { key: "second", title: t("today_delivery") },
    { key: "third", title: t("deliveried") },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.txt }}
      style={{ backgroundColor: theme.bg }}
    />
  );

  const FirstRoute = () => (
    <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 60 }}>
      <FlatList
        key={1}
        data={reservationsbycategory["after"]}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 60 }}>
      <FlatList
        key={1}
        data={reservationsbycategory["today"]}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 60 }}>
      <FlatList
        key={1}
        data={reservationsbycategory["before"]}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30,  }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={""}
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
              <Text style={{ color: theme.txt, fontSize: 15 }}>{currentUser.points}</Text>
            </View>
          </HStack>
        )}
      />
      <View style={{flex:1}}>
        {isLoading && <Spinner />}
        {/* <View style={{ marginHorizontal: 20, marginBottom: 60 }}>
          <FlatList
            key={1}
            data={cPrograms["programs"]}
            keyExtractor={(item, index) => {
              return index;
            }}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View> */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      </View>
    </SafeAreaView>
  );
}
