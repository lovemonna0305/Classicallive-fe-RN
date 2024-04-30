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
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
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
import { getAllParentCategories, setCategory } from "../../actions/common";
import Footer from "../../components/Footer";
import { useStore } from "../../store/store";
import Spinner from "../../components/Spinner";

export default function PerformerCategoryList() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);



  const [allparentcategories, setAllparentcategories] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    changeStore({ ...store, isLoading: true });
    (async () => {
      await getAllParentCategories()
        .then(res => {
          setAllparentcategories(res);
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        });
    })();
  }, [])

  const renderItem1 = ({ item, index }) => {
    const selectCategory = async (item) => {
      changeStore({ ...store, category: item, page: 'CategoryList' });
      navigation.replace("Category");
    };
    return (
      <TouchableOpacity style={{
        flexDirection: "row",
        paddingRight: 20,
        backgroundColor: theme.itembackground,
        borderRadius: 10,
        alignContent: "center",
        justifyContent: "space-between",
        width: width - 40,
        height: height * 0.09,
        marginBottom: 10,
      }}
        onPress={() => selectCategory(item)}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: server.category_url + item.image_file }}
            style={{ width: height * 0.1, height: height * 0.09, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
          />
          <View style={{ justifyContent: "center", width: width * 0.4, paddingLeft: 10 }}>
            <Text style={[{ fontSize: 16, fontWeight: "bold", color: theme.txt, }]} > {t(item.slug)}</Text>
            <Text style={[{ fontSize: 12, color: Colors.disable, }]} > {item.num} </Text>
          </View>
        </View>
        <View style={{ justifyContent: "center" }}>
          <IconM
            name="chevron-right"
            color={Colors.disable}
            size={26}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({ item, index }) => {
    const selectProgram = (item) => {
      changeStore({ ...store, program: item });
    };
    return (
      <TouchableOpacity style={{
        marginBottom: 10,
        paddingRight: 10,
      }}>

        <View style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: theme.itembackground,
          borderRadius: 20,
          // alignItems: "center",
          justifyContent: "space-evenly",
          width: width / 2 - 25,
          height: height * 0.16,
        }}>
          <Text style={[style.text2, { color: theme.txt, fontWeight: 'bold', paddingBottom: 5, }]}>  {item.num} </Text>
          <Image
            source={{ uri: server.category_url + item.image_file }}
            resizeMode="stretch"
            style={{ width: 25, height: 25, alignContent: "center", }}
            tintColor={Colors.disable}
          />
          <Text style={[style.text2, { color: theme.txt, }]} > {t(item.slug)} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <View style={{ flex: 1 }}>
        <Header />
        {/* <View style={{ marginTop: 10, }}>
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
          <View style={{ marginTop: 10, height: 200, marginHorizontal: 18 }}>
            <FlatList
                numColumns={2}
                key={1}
                data={popularcategories}
                keyExtractor={(item, index) => {return item.id;}}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem1}
              />
          </View> */}
        <View style={{ marginTop: 10, }}>
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
        <View style={{ marginTop: 10, height: height * 0.6, marginHorizontal: 18 }}>
          {store.isLoading && <Spinner />}
          <FlatList
            key={'performer-categoryList'}
            data={allparentcategories}
            keyExtractor={(item, index) => { return item.id; }}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem1}
          />
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
}
