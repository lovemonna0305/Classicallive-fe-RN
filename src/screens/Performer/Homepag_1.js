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
import { getPrograms,  } from "../../actions/performer";
// import { setProgram } from "../../actions/common";
import {
  getAllCategories,
  getAllParentCategories,
  getPopularCategories,
  setCategoryArray,
} from "../../actions/common";
import HomeProgramItem from "../../components/HomeProgramItem";
import Header from "../../components/Header";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PerformerHomepage() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { pReservs } = useSelector((state) => state.performer);
  const { allparentcategories, allcategories, categoryArray } = useSelector((state) => state.common);

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
    
    (async () => {
      await dispatch(setCategoryArray(allparentcategories, allcategories));
    })();

  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <Header />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, marginBottom: 60 }}>
          <View style={{ marginTop: 10, marginHorizontal: 20 }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: theme.txt,
                fontSize: 20,
              }}
            >
              {t("customer_reservations")}
            </Text>
          </View>
          <View style={{ marginHorizontal: 18 }}>
            <HomeProgramItem
              items={pReservs["reserv"]}
              page={"PerformerPostDetail"}
            />
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 20, height: 40 }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: theme.txt,
                fontSize: 20,
              }}
            >
              {t("today")}
            </Text>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 20 }}>
            <HomeProgramItem
              items={pReservs["today"]}
              page={"PerformerPostDetail"}
            />
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 20, height: 40 }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: theme.txt,
                fontSize: 20,
              }}
            >
              {t("programs")}
            </Text>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 20 }}>
            <HomeProgramItem
              items={pReservs["notreserv"]}
              page={"PerformerPostDetail1"}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
