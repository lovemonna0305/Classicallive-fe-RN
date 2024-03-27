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
import { StarRatingDisplay } from "react-native-star-rating-widget";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../constants";

export default function CategoryProgramItem({ items, page }) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const [darkMode, setDarkMode] = useState(false);
  // const { subcategories, pCategory, allcategories } = useSelector(
  //   (state) => state.common
  // );

  const selectProgram = (item) => {
    dispatch(setProgram(item));
    navigation.navigate(page);
  };

  useEffect(() => {
    // console.log("items",items);
    
  }, []);

  return (
    <View>
      {items &&
        items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              height: 90,
              padding: 5,
              backgroundColor: theme.box,
              borderRadius: 5,
              marginBottom: 5,
            }}
            onPress={() => selectProgram(item)}
          >
            <View style={[style.row, { paddingTop: 5, paddingHorizontal: 10 }]}>
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: server.media_url + item.image_file }}
                  style={{ width: 70, height: 70, borderRadius: 5 }}
                />
              </View>
              <View style={{ flex: 4 }}>
                <View
                  style={[
                    style.row,
                    {
                      alignContent: "center",
                      justifyContent: "space-between",
                      marginHorizontal: 5,
                      marginBottom: 7,
                    },
                  ]}
                >
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={style.activetext}>{item.title}</Text>
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <StarRatingDisplay
                      rating={4.5}
                      starSize={12}
                      starStyle={{ paddingHorizontal: 1, marginHorizontal: 0 }}
                    />
                  </View>
                </View>
                <View
                  style={[
                    style.row,
                    {
                      alignContent: "center",
                      justifyContent: "space-between",
                      marginHorizontal: 5,
                      marginBottom: 8,
                    },
                  ]}
                >
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={[style.secondarytext, { fontSize: 12 }]}>
                      {/* {allcategories[item.category].ja_name} */}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text style={[style.secondarytext, { fontSize: 10 }]}>
                      {item.date} {item.start_time}~
                      {item.end_time}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    style.row,
                    {
                      alignContent: "center",
                      justifyContent: "space-between",
                      marginHorizontal: 5,
                      paddingLeft: 10,
                    },
                  ]}
                >
                  <View
                    style={[
                      style.row,
                      {
                        alignContent: "center",
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <View style={[style.row, { alignItems: "center" }]}>
                      <View style={[style.row]}>
                        <Icon name="user" size={11} color={Colors.btn} />
                      </View>
                      <View style={{ paddingHorizontal: 5 }}>
                        <Text
                          style={[
                            style.activetext,
                            { color: Colors.btn, fontSize: 11 },
                          ]}
                        >
                          {item.users}
                        </Text>
                      </View>
                    </View>
                    <View style={[style.row, { alignItems: "center" }]}>
                      <View style={[style.row]}>
                        <Icon name="heart" size={11} color={Colors.btn} />
                      </View>
                      <View style={{ paddingHorizontal: 5 }}>
                        <Text
                          style={[
                            style.activetext,
                            { color: Colors.btn, fontSize: 11 },
                          ]}
                        >
                          {item.likes}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={[style.row, { alignItems: "center" }]}>
                        <View style={[style.row]}>
                          <Icon name="times" size={11} color={Colors.btn} />
                        </View>
                        <View style={{ paddingHorizontal: 5 }}>
                          <Text
                            style={[
                              style.activetext,
                              { color: Colors.btn, fontSize: 11 },
                            ]}
                          >
                            {item.points}
                          </Text>
                        </View>
                      </View>
                      <View style={[style.row, { alignItems: "center" }]}>
                        <View style={[style.row]}>
                          <Icon name="star" size={11} color={Colors.btn} />
                        </View>
                        <View style={{ paddingHorizontal: 5 }}>
                          <Text
                            style={[
                              style.activetext,
                              { color: Colors.btn, fontSize: 11 },
                            ]}
                          >
                            {item.points}
                          </Text>
                        </View>
                      </View> */}
                  </View>
                  {!item.is_reserved ? (
                    <>
                      <View style={[style.row, { alignItems: "center" }]}>
                        <View>
                          <TouchableOpacity onPress={() => watchprogram()}>
                            <View
                              style={{
                                backgroundColor: Colors.green,
                                borderRadius: 5,
                                padding: 2,
                                paddingHorizontal: 5,
                                width: 60,
                              }}
                            >
                              <Text
                                style={[
                                  style.activetext,
                                  { textAlign: "center" },
                                ]}
                              >
                                {t("edit")}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 5 }}>
                          <TouchableOpacity>
                            <View
                              style={{
                                backgroundColor: Colors.cancel,
                                borderRadius: 5,
                                padding: 2,
                                paddingHorizontal: 5,
                                marginLeft: 5,
                                width: 60,
                              }}
                            >
                              <Text
                                style={[
                                  style.activetext,
                                  { textAlign: "center" },
                                ]}
                              >
                                {t("delete")}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  ) : null}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
}
