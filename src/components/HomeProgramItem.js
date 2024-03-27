import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState, useContext, useEffect } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useTranslation } from "react-i18next";
import { setProgram } from "../actions/common";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../constants";

export default function HomeProgramItem({ items, page }) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const [darkMode, setDarkMode] = useState(false);

  const selectProgram = (item) => {
    dispatch(setProgram(item));
    navigation.navigate(page);
  };

  useEffect(() => {
  }, []);

  return (
    <View>
      <ScrollView
        nestedScrollEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flex: 1, flexDirection: "row", marginTop: 10}}>
          {items && items.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => selectProgram(item)}
              >
                <View style={{marginRight:10}}>
                  <ImageBackground
                    source={{ uri: server.media_url + item.post.image_file }}
                    resizeMode="stretch"
                    style={{
                      width: width / 1.7,
                      height: height / 5,
                      alignSelf: "center",
                    }}
                    borderRadius={10}
                  >
                    <View style={{ flexDirection: "row", margin: 10 }}>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 7,
                            paddingHorizontal: 10,
                            color: Colors.secondary,
                            fontSize: 16,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(00, 00, 00, 0.4)",
                          }}
                        >
                          {t(item.category.slug)}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    width:width/2,
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.txt,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  {item.post.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  {item.post.date} {item.post.start_time}
                </Text>
                <View style={{ padding: 10 }}></View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
