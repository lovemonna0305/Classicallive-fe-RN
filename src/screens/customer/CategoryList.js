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
import { useStore } from "../../store/store";

import { getAllCategories, getAllParentCategories, getCategoryArray, getPopularCategories, getSubCategory, setCategory, setLoading } from "../../actions/common";
import Footer from "../../components/Footer";

export default function CustomerCategoryList() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  useEffect(() => {
    changeStore({ ...store, isLoading: true, page: "CategoryList" });
    (async () => {
      await getAllParentCategories()
      await getPopularCategories()
      await getAllCategories()
      await getCategoryArray()
        .then(res => {
          setPrograms(res);
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        });
    })();
  }, []);


  const allparentcategories = global.allparentcategories;
  const popularcategories = global.popularcategories;

  const [darkMode, setDarkMode] = useState(false);

  const renderItem1 = ({ item, index }) => {
    const lastItem = index === popularcategories.length - 1;
    const selectCategory = async (item) => {
      changeStore({ ...store, category: item });
      navigation.navigate("Category");
    };
    return (
      <TouchableOpacity
        style={[style.item1, { maxWidth: lastItem ? "47%" : "100%" }]}
        onPress={() => selectCategory(item)}
      >
        <View>
          <Image
            source={{ uri: server.category_url + item.image_file }}
            style={{ width: 60, height: 60, borderRadius: 3 }}
          />
        </View>
        <View style={{ marginLeft: 5 }}>
          <Text style={[style.activetext, { fontSize: 12 }]}>
            {item.ja_name}
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
      changeStore({ ...store, category: item });
      navigation.navigate("Category");
    };
    return (
      <TouchableOpacity
        style={[style.item1, { maxWidth: lastItem ? "47%" : "100%" }]}
        onPress={() => selectCategory(item)}
      >
        <View>
          <Image
            source={{ uri: server.category_url + item.image_file }}
            style={{ width: 60, height: 60, borderRadius: 3 }}
          />
        </View>
        <View style={{ marginLeft: 5 }}>
          <Text style={[style.activetext, { fontSize: 12 }]}>
            {item.ja_name}
          </Text>
          {/* <Text style={[style.activetext,{fontSize:9}]}>{item.date} {item.start_time}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg,paddingTop: 30, }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <View style={{ flex: 1 }}>
        {store.isLoading && <Spinner />}
        <Header />
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
            {t("popular_category")}
          </Text>
        </View>
        <View style={{ marginTop: 10, height: height * 0.25, marginHorizontal: 10 }}>
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
                  color: theme.txt,
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
              color: theme.txt,
              fontSize: 20,
              marginHorizontal: 20,
            }}
          >
            {t("all_category")}
          </Text>
        </View>
        <View style={{ marginTop: 10, height: height * 0.2, marginHorizontal: 10 }}>
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
                  color: theme.txt,
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
      <Footer />
    </SafeAreaView>
  );
}
