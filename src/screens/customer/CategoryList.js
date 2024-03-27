import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
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
import { getSubCategory, setCategory, setLoading } from "../../actions/common";

export default function CustomerCategoryList() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  const currentUser = global.currentUser;
  const allparentcategories = global.allparentcategories;
  const popularcategories = global.popularcategories;

  const [darkMode, setDarkMode] = useState(false);

  const renderItem1 = ({ item, index }) => {
    const lastItem = index === popularcategories.length - 1;
    const selectCategory = async (item) => {
      navigation.navigate("CustomerCategory", {
        id: item.id,
      });
    };
    return (
      <TouchableOpacity
        style={[style.item1, { maxWidth: lastItem ? "47%" : "100%" }]}
        onPress={() => selectCategory(item)}
      >
        <View>
          <Image
            source={{ uri: server.media_url + item.image_file }}
            style={{ width: 60, height: 60, borderRadius: 3 }}
          />
        </View>
        <View style={{ marginLeft: 5 }}>
          <Text style={[style.activetext, { fontSize: 12 }]}>
            {t(item.slug)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem2 = ({ item, index }) => {
    const lastItem = index === allparentcategories.length - 1;
    const selectCategory = async (item) => {
      let formdata = new FormData();
      formdata.append("category", item.id);
      getSubCategory(formdata);
      setCategory(item);
      setLoading(true);
      navigation.navigate("CustomerCategory",{
        id: item.id,
      });
    };
    return (
      <TouchableOpacity
        style={[style.item1, { maxWidth: lastItem ? "47%" : "100%" }]}
        onPress={() => selectCategory(item)}
      >
        <View>
          <Image
            source={{ uri: server.media_url + item.image_file }}
            style={{ width: 60, height: 60, borderRadius: 3 }}
          />
        </View>
        <View style={{ marginLeft: 5 }}>
          <Text style={[style.activetext, { fontSize: 12 }]}>
            {t(item.slug)}
          </Text>
          {/* <Text style={[style.activetext,{fontSize:9}]}>{item.date} {item.start_time}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              marginVertical: 8,
              fontWeight: 800,
              color: "white",
              fontSize: 20,
              marginHorizontal: 20,
            }}
          >
            {t("popular_category")}
          </Text>
        </View>
        <View style={{ marginTop: 10, height: 200, marginHorizontal: 18 }}>
          {popularcategories && popularcategories != 0 ? (
            <>
              <FlatList
                numColumns={2}
                key={1}
                data={popularcategories}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem1}
              />
            </>
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  marginVertical: 8,
                  fontWeight: 800,
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                  opacity: 0.4,
                }}
              >
                {t("no_category_exists")}
              </Text>
            </View>
          )}
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              marginVertical: 8,
              fontWeight: 800,
              color: "white",
              fontSize: 20,
              marginHorizontal: 20,
            }}
          >
            {t("all_category")}
          </Text>
        </View>
        <View style={{ marginTop: 10, height: 200, marginHorizontal: 18 }}>
          {allparentcategories && allparentcategories != 0 ? (
            <>
              <FlatList
                numColumns={2}
                key={1}
                data={allparentcategories}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem2}
              />
            </>
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  marginVertical: 8,
                  fontWeight: 800,
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                  opacity: 0.4,
                }}
              >
                {t("no_category_exists")}
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
