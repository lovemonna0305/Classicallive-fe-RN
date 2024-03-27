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

export default function CustomerCategory({ route }) {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const currentUser = global.currentUser;
  const [cCPrograms, setCCPrograms] = useState(global.cCPrograms);
  const { id } = route.params;

  useEffect(() => {
    global.isLoading&&(async () => {
      const data = await getCProgramsByCategory(id);
      setCCPrograms(data);
    })();
    global.isLoading&&(async () => {
      global.isLoading = false;
    })();
  }, [global.isLoading]);

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
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: theme.bg }}
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
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("category")}
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
              <Text style={{ color: "white", fontSize: 15 }}>
                {currentUser.points}
              </Text>
            </View>
          </HStack>
        )}
      />
      <View style={{ flex: 1 }}>
        {global.isLoading && <Spinner />}
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
