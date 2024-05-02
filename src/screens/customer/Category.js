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
import { setLoading, setProgram } from "../../actions/common";
import { useNavigation } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import SubCategoryItem from "../../components/SubCategoryItem";
import FlatPage from "../../components/FlatPage";
import { completeProgram, getCProgramsByCategory } from "../../actions/customer";
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";

export default function CustomerCategory() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const currentUser = store.currentUser;
  const page = store.page;
  const [cCPrograms, setCCPrograms] = useState({});
  const { id, slug } = store.category;

  useEffect(() => {
    changeStore({...store, page:'Category'});
    (async () => {
      await getCProgramsByCategory(id)
      .then(res=>{
        setCCPrograms(res);
        changeStore({...store, isLoading:false});
      }).catch(err=>{
        changeStore({...store, isLoading:false});
      });
    })();
  }, []);

  

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
      labelStyle={{color:theme.txt}}
    />
  );

  const FirstRoute = () => (
    <>
      <FlatPage items={cCPrograms["after"]} />
    </>
  );

  const SecondRoute = () => (
    <>
      <FlatPage items={cCPrograms["today"]} />
    </>
  );

  const ThirdRoute = () => (
    <>
      <FlatPage items={cCPrograms["reserv"]} />
    </>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,  paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("category")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => {
            navigation.replace("CategoryList")}}>
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
              <Text style={{ color: theme.txt, fontSize: 15 }}>
                {currentUser.points}
              </Text>
            </View>
          </HStack>
        )}
      />
      <View style={{ flex: 1 }}>
        {store.isLoading && <Spinner />}
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
