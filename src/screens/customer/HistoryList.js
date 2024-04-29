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
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Header from "../../components/Header";
import FlatPage from "../../components/FlatPage";
import { getPrograms } from "../../actions/customer";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";
import Footer from "../../components/Footer";

export default function CustomerHistoryList() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const [Programs, setPrograms] = useState({});

  const currentUser = store.currentUser;

  // useEffect(() => {
  //   console.log("store.isLoading-->", store.isLoading);
  //   changeStore({...store,  isLoading:true}); 
  // }, [true]);

  useEffect(() => {
    changeStore({ ...store, isLoading: true, page:'HistoryList' });
    const getData = async () => {
      await getPrograms(2)
        .then(res => {
          setPrograms(res);
          // store.isLoading = false;
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          console.log(err);
          changeStore({ ...store, isLoading: false });
          // store.isLoading = false;
        })
    };
    getData();
  }, []);



  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("contracted") },
    { key: "second", title: t("uncontracted") },
    { key: "third", title: t("deliveried") },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.txt }}
      style={{ backgroundColor: theme.bg, color:theme.txt }}
      labelStyle={{color:theme.txt}}
    />
  );

  const FirstRoute = () => (
    <>
      <FlatPage items={Programs["reserv"]} title="reserv" />
    </>
  );

  const SecondRoute = () => (
    <>
      <FlatPage items={Programs["canceled"]} title="canceled" />
    </>
  );

  const ThirdRoute = () => (
    <>
      <FlatPage items={Programs["completed"]} title="completed" />
    </>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("contract_list")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: theme.bg }}
                color=theme.txt
                size={40}
              />
            </TouchableOpacity> */}
          </>
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
      {store.isLoading && <Spinner />}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <Footer />
    </SafeAreaView>
  );
}
