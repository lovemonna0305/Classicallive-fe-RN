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
  Modal,
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
import FlatPerformerPage1 from "../../components/FlatPerformerPage1";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { images, server } from "../../constants";
import Spinner from "../../components/Spinner";
import { getPProgramsByCategory } from "../../actions/performer";
import { useStore } from "../../store/store";

export default function PerformerCategory() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [postItem, setPostItem] = useState();
  const [pCPrograms, setpCPrograms] = useState(global.pCPrograms);
  const [allparentcategories, setAllparentcategories] = useState(global.allparentcategories);
  const { id, slug } = store.category;


  useEffect(() => {
    changeStore({...store, isLoading:true, page:'Category'});
    (async () => {
      try {
        const data = await getPProgramsByCategory(id);
        setpCPrograms(data);
        changeStore({...store, isLoading:false});
      } catch (err) {
        changeStore({...store, isLoading:false});
      }
    })();
  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("my_program") },
    { key: "second", title: t("another") },
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
      <FlatPerformerPage1 id={id} items={pCPrograms["my"]} title={"my"} />
    </>
  );

  const SecondRoute = () => (
    <>
      <FlatPerformerPage1 id={id} items={pCPrograms["another"]} title={"another"} />
    </>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t(slug)}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.replace('CategoryList')}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color="white"
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <View style={{ flex: 1 }}>
        {/* {global.isLoading && <Spinner />} */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
      <Modal transparent={true} visible={visible}>
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
                  {t("sure_delete")}
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
                    let formdata = new FormData();
                    formdata.append("post_id", postItem.id);
                    dispatch(deleteProgram(formdata));
                    setVisible(false);
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
                    {t("ok")}
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
                  onPress={() => setVisible(false)}
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

      <View
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("PostCreate")}
        >
          <Avatar.Image
            source={images.plus}
            style={{ backgroundColor: "" }}
            size={130}
          ></Avatar.Image>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
