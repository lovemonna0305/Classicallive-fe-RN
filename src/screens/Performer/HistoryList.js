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

import { setLoading, setProgram } from "../../actions/common";
import { useNavigation } from "@react-navigation/native";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Header from "../../components/Header";
import FlatPerformerPage from "../../components/FlatPerformerPage";
import { getPrograms } from "../../actions/performer";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
// global.isLoading = true;

export default function PerformerHistoryList() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  

  const [pHPrograms, setPHPrograms] = useState(global.pHPrograms);

  useEffect(() => {
    (async () => {
      const data = await getPrograms(2);
      setPHPrograms(data);
    })();
    (async () => {
      global.isLoading = false;
    })();
  }, [!global.isLoading]);
  
  useEffect(() => {
    global.isLoading&&(async () => {
      const data = await getPrograms(2);
      setPHPrograms(data);
    })();
    global.isLoading&&(async () => {
      global.isLoading = false;
    })();
  }, [global.isLoading]);


  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("contracted") },
    { key: "second", title: t("uncontracted") },
    { key: "third", title: t("completed") },
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
      <FlatPerformerPage items={pHPrograms["reserv"]} title={"reserv"} />
    </>
  );

  const SecondRoute = () => (
    <>
    <FlatPerformerPage items={pHPrograms["created"]} title={"created"} />
    </>
  );
  
  const ThirdRoute = () => (
    <>
    <FlatPerformerPage items={pHPrograms["completed"]} title={"completed"} />
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
      <Header />
      {global.isLoading && <Spinner />}
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
