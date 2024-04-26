import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { getPrograms } from "../../actions/performer";
import {
  getAllCategories,
  getAllParentCategories,
  getPopularCategories,
  getCategoryArray,
  setLoading,
} from "../../actions/common";
import Footer from "../../components/Footer";
import { useStore } from "../../store/store";


export default function PerformerHomepage() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [programs, setPrograms] = useState([]);


  useEffect(() => {
    changeStore({ ...store, isLoading: true,  });
    (async () => {
      await getPrograms(1)
        .then(res => {
          setPrograms(res);
        }).catch(err => {
        });
    })();
    (async () => {
      await getCategoryArray()
        .then(res => {
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        });
    })();
  }, []);


  const renderItem1 = ({ item, index }) => {
    const lastItem = index === programs["after"].length - 1;
    const selectProgram = (item) => {
      changeStore({...store, program:item, page:'Home'});
      navigation.navigate("CustomerList");
    };
    return (
      <TouchableOpacity
        style={[style.item1, { maxWidth: lastItem ? "47%" : "100%", backgroundColor:theme.itembackground }]}
        onPress={() => selectProgram(item)}
      >
        <View>
          <Image
            source={{ uri: server.media_url + item.image_file }}
            style={{ width: 60, height: 60, borderRadius: 3 }}
          />
        </View>
        <View style={{ marginLeft: 5 }}>
          <Text
            numberOfLines={1}
            style={[style.activetext, { fontSize: 12, width: width / 2 - 100, color:theme.txt }]}
          >
            {item.title}
          </Text>
          <Text style={[style.activetext, { fontSize: 9 , color:theme.txt}]}>
            {item.date} {item.start_time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({ item, index }) => {
    const selectProgram = (item) => {
      changeStore({...store, program:item, page:'Home'});
      navigation.navigate("CustomerList");
    };
    return (
      <TouchableOpacity
        key={index}
        style={style.item2}
        onPress={() => selectProgram(item)}
      >
        <ImageBackground
          source={{ uri: server.media_url + item.image_file }}
          resizeMode="cover"
          style={{ width: 150, height: 150 }}
          imageStyle={{ borderRadius: 3 }}
        >
          <View
            style={{
              flex: 1,
              paddingTop: 10,
              borderBottomWidth: 5,
              borderBottomColor: "orange",
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 100,
                backgroundColor: "rgba(10, 00, 00, 0.4)",
                borderRadius: 3,
                padding: 5,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  textAlign: "right",
                  paddingRight: 2,
                  color: Colors.secondary,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  textAlign: "right",
                  paddingRight: 2,
                  color: Colors.secondary,
                  fontSize: 10,
                  fontWeight: "600",
                }}
              >
                {item.date} {item.start_time}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const renderItem3 = ({ item, index }) => {
    const selectProgram = (item) => {
      changeStore({...store, program:item, page:'Home'});
      navigation.navigate("CustomerList");
    };
    return (
      <TouchableOpacity
        key={index}
        style={style.item2}
        onPress={() => {
          selectProgram(item);
        }}
      >
        <ImageBackground
          source={{ uri: server.media_url + item.image_file }}
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
          imageStyle={{ borderRadius: 3 }}
        >
          <View
            style={{
              flex: 1,
              marginTop: 150,
              backgroundColor: "rgba(10, 00, 00, 0.4)",
              borderRadius: 3,
              padding: 5,
              paddingTop: 8,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                textAlign: "right",
                paddingRight: 2,
                color: Colors.secondary,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                textAlign: "right",
                paddingRight: 2,
                color: Colors.secondary,
                fontSize: 10,
                fontWeight: "600",
              }}
            >
              {item.date} {item.start_time}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <Header />
      <View style={{ flex: 1 }}>
        {store.isLoading && <Spinner />}
        <ScrollView style={{ marginBottom: 60 }}>
          <View style={{ height: 270 }}>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  marginVertical: 8,
                  fontWeight: 800,
                  color: theme.txt,
                  fontSize: 20,
                  marginHorizontal: 20,
                }}
              >
                {t("reservation")}
              </Text>
            </View>
            <View style={{ marginTop: 10, height: 200, marginHorizontal: 18 }}>
              {programs["after"] && programs["after"].length != 0 ? (
                <View>
                  <FlatList
                    numColumns={2}
                    key={"key-1"}
                    data={programs["after"]}
                    keyExtractor={(item, index) => {
                      return index;
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem1}
                    scrollEnabled={false}
                  />
                </View>
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
                    {t("no_post_exists")}
                  </Text>
                </View>
              )}
              {/* <RenderProgram/> */}
            </View>
          </View>
          <View style={{}}>
            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
              <Text
                style={{
                  marginVertical: 8,
                  fontWeight: 800,
                  color: theme.txt,
                  fontSize: 20,
                }}
              >
                {t("top")}
              </Text>
            </View>
            <View style={{ marginTop: 10, marginLeft: 20 }}>
              {programs["top"] && programs["top"].length != 0 ? (
                <View>
                  <FlatList
                    key={"key-2"}
                    data={programs["top"]}
                    keyExtractor={(item, index) => {
                      return index;
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem2}
                  />
                </View>
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
                    {t("no_post_exists")}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={{}}>
            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
              <Text style={{
                  marginVertical: 8,
                  fontWeight: 800,
                  color: theme.txt,
                  fontSize: 20,
                }}>{t("today")}</Text>
            </View>
            <View style={{ flex: 1, marginTop: 10, marginLeft: 20 }}>
              {programs["today"] && programs["today"].length != 0 ? (
                <View>
                  <FlatList
                    key={"key-3"}
                    data={programs["today"]}
                    keyExtractor={(item, index) => {
                      return index;
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem3}
                  />
                </View>
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
                    {t("no_post_exists")}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
}
