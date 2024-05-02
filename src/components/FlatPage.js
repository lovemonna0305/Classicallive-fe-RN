import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

import React, { useState, useContext, useEffect, useRef } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";
import StatusView from "./StatusView";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../constants";
import { useStore } from "../store/store";

export default function FlatPage({ items, title = "default" }) {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    const selectProgram = (item) => {
      changeStore({...store, program:item});
      if (title.includes("cancel")) {
        navigation.navigate("CustomerPostDetail");
      } else {
        navigation.navigate("CustomerHistoryDetail", {
          status: title,
        });
      }
    };
    return (
      <TouchableOpacity
        key={`${title}-${index}`}
        style={{
          height: 90,
          padding: 2,
          backgroundColor: theme.box,
          borderRadius: 5,
          marginBottom: 5,
        }}
        onPress={() => selectProgram(item)}
      >
        <View style={[style.row, { paddingTop: 5, paddingHorizontal: 2 }]}>
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
                <Text
                  numberOfLines={1}
                  style={[style.activetext, { width: width / 2 - 80 }]}
                >
                  {item.title}
                </Text>
              </View>
              <View style={{ paddingTop: 5 }}>
                <Text style={[style.secondarytext, { fontSize: 10 }]}>
                  {item.date} {item.start_time}~{item.end_time}
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
                  marginBottom: 8,
                },
              ]}
            >
              <View style={{ paddingLeft: 10 }}>
                <Text style={[style.secondarytext, { fontSize: 12 }]}>
                  {t(item.category.ja_name)} 演奏者：{item.member.name}
                </Text>
              </View>
              <View style={{}}></View>
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
                  { alignContent: "center", justifyContent: "space-between" },
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
                      {item.member.followers}
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
                <View style={[style.row, { alignItems: "center" }]}>
                  <View style={[style.row]}>
                    <Icon name="thumbs-up" size={11} color={Colors.btn} />
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 11 },
                      ]}
                    >
                      {item.ups}
                    </Text>
                  </View>
                </View>
                <View style={[style.row, { alignItems: "center" }]}>
                  <View style={[style.row]}>
                    <Icon name="thumbs-down" size={11} color={Colors.btn} />
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text
                      style={[
                        style.activetext,
                        { color: Colors.btn, fontSize: 11 },
                      ]}
                    >
                      {item.downs}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={[
                  style.row,
                  {
                    width: width / 2.8,
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <StatusView status={item.reserv_status} />
                <View style={[style.row, { alignItems: "center" }]}>
                  <View>
                    <Image
                      source={require("../../assets/img/ic_coin.png")}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text style={{ color: theme.txt, fontSize: 11 }}>
                      {item.points}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10, }}>
      {items && items.length > 0 ? (
        <>
          <FlatList
            key={1}
            data={items}
            keyExtractor={(item, index) => {
              return index;
            }}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
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
            {t("no_post_exists")}
          </Text>
        </View>
      )}
    </View>
  );
}
