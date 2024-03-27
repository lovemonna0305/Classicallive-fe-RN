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
import { RenderProgram } from "../../../src/components/RenderProgram";
import { getPrograms } from "../../actions/customer";
import { setProgram } from "../../actions/common";
import {
  getAllCategories,
  getAllParentCategories,
  getPopularCategories,
} from "../../actions/common";
import Header from "../../components/Header";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
export default function CustomerHomepage() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { cReservs } = useSelector((state) => state.customer);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      let formdata = new FormData();
      formdata.append("member_id", currentUser.id);

      await dispatch(getPrograms(formdata));
    })();
    (async () => {
      let formdata = new FormData();
      formdata.append("category", 1);
      await dispatch(getAllParentCategories(formdata));
    })();
    (async () => {
      let formdata = new FormData();
      formdata.append("category", currentUser.interesting_category);
      await dispatch(getPopularCategories(formdata));
    })();
    (async () => {
      await dispatch(getAllCategories());
    })();

    console.log("Customer HomePage", cReservs);
  }, []);

  const renderItem1 = ({ item, index }) => {
    const selectProgram = (item) => {
      store.dispatch(setProgram(item));
      navigation.navigate("CustomerPostDetail");
    };
    return (
      <TouchableOpacity
        key={index}
        style={style.item2}
        onPress={() => selectProgram(item)}
      >
        <ImageBackground
          source={{ uri: server.media_url + item.post.image_file }}
          resizeMode="cover"
          style={{ width: 100, height: 100 }}
          imageStyle={{ borderRadius: 5 }}
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
                marginTop: 40,
                backgroundColor: "rgba(10, 00, 00, 0.4)",
                borderRadius: 3,
                padding: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  paddingRight: 2,
                  color: Colors.secondary,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {item.post.title}
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
                {item.post.date} {item.post.start_time}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({ item, index }) => {
    const selectProgram = (item) => {
      store.dispatch(setProgram(item));
      navigation.navigate("CustomerPostDetail");
    };
    return (
      <TouchableOpacity
        key={index}
        style={style.item2}
        onPress={() => selectProgram(item)}
      >
        <ImageBackground
          source={{ uri: server.media_url + item.post.image_file }}
          resizeMode="cover"
          style={{ width: 100, height: 100 }}
          imageStyle={{ borderRadius: 5 }}
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
                marginTop: 40,
                backgroundColor: "rgba(10, 00, 00, 0.4)",
                borderRadius: 3,
                padding: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  paddingRight: 2,
                  color: Colors.secondary,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {item.post.title}
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
                {item.post.date} {item.post.start_time}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const renderItem3 = ({ item, index }) => {
    console.log("item->",item.post)
    const selectProgram = (item) => {
      store.dispatch(setProgram(item));
      navigation.navigate("CustomerPostDetail1");
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
          source={{ uri: server.media_url + item.post.image_file }}
          resizeMode="cover"
          style={{ width: 100, height: 100 }}
          imageStyle={{ borderRadius: 5 }}
        >
          <View
            style={{
              flex: 1,
              marginTop: 50,
              backgroundColor: "rgba(10, 00, 00, 0.4)",
              borderRadius: 3,
              padding: 5,
              paddingTop: 8,
            }}
          >
            <Text
              style={{
                textAlign: "right",
                paddingRight: 2,
                color: Colors.secondary,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {item.post.title}
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
              {item.post.date} {item.post.start_time}
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
        <ScrollView style={{flex: 1, marginBottom: 60 }}>
        <View style={{ marginTop: 10, marginHorizontal: 20, height: 40 }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: "white",
                fontSize: 20,
              }}
            >
              {t("customer_reservations")}
            </Text>
          </View>
          <View style={{ marginTop: 10, height: 100, marginHorizontal: 18 }}>
            <FlatList
              numColumns={2}
              key={1}
              data={cReservs["reserv"]}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem1}
            />
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 20, height: 40 }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: "white",
                fontSize: 20,
              }}
            >
              {t("today")}
            </Text>
          </View>
          <View style={{ marginTop: 10, height: 100, marginHorizontal: 20 }}>
            <FlatList
              key={1}
              data={cReservs["today"]}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem2}
            />
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 20, height: 40 }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: "white",
                fontSize: 20,
              }}
            >
              {t("programs")}
            </Text>
          </View>
          <View style={{ marginTop: 10, height: 120, marginHorizontal: 20 }}>
            <FlatList
              key={1}
              data={cReservs["notreserv"]}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem3}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
