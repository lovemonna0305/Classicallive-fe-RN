import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal
} from "react-native";

import React, { useState, useContext, useEffect, useRef } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { Avatar } from "react-native-paper";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../constants";
import { deleteProgram, getPProgramsByCategory } from "../actions/performer";
import Spinner from "./Spinner";
import { useStore } from "../store/store";
import Toast from "react-native-toast-message";

export default function FlatPerformerPage1({ id, items, title }) {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [edit, setEdit] = useState(0);

  // const { categoryArray, pCategory } = useSelector(
  //   (state) => state.common
  // );
  const [modalVisible, setModalVisible] = useState(false);
  const [programs, setPrograms] = useState(items);
  const [item, setItem] = useState(false);

  const fetchdata = async () => {
    changeStore({ ...store, isLoading: true });
    (async () => {
      await getPProgramsByCategory(id)
        .then(res => {
          setPrograms(res);
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        });
    })();
    return;
  }

  const handledeleteProgram = async () => {
    setModalVisible(false);
    changeStore({ ...store, isLoading: true });
    await deleteProgram(item.id)
      .then(res => {
        if (res) {
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t('delete_success'),
          });
        } else {
          Toast.show({
            type: "error",
            text1: t('error'),
            text2: t("delete_failed"),
          });
        }
        fetchdata();
        changeStore({ ...store, isLoading: false });
      }).catch(err => {
        changeStore({ ...store, isLoading: false });
      });
  }
  const renderItem = ({ item, index }) => {
    const selectProgram = (item) => {
      setEdit(item.id);
      if (title.includes("another")) {
        changeStore({ ...store, program: item });
        navigation.navigate("PerformerHistoryDetail");
      }
    };
    const editProgram = (item) => {
      changeStore({ ...store, program: item });
      navigation.navigate("PerformerPostEdit");
    }
    return (
      <TouchableOpacity
        key={`${title}-${index}`}
        style={{
          height: (title.includes("my")) && (edit === item.id) ? 130 : 90, ///
          padding: 5,
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
                  style={[style.activetext, { width: width / 2 - 30 }]}
                >
                  {item.title}
                </Text>
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
                  {t(item.category.slug)}
                </Text>
              </View>
              <View style={{}}>
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
        {(title.includes("my")) && (edit === item.id) ? (<View style={[style.row, { paddingTop: 5, paddingHorizontal: 10, alignItems: "center", justifyContent: "space-between" }]}>
          <Text
            numberOfLines={2}
            style={[style.activetext, { fontSize: 11 }]}
          >{t("edit_cancel")}
          </Text>
          <View style={[style.row, { paddingTop: 5, alignItems: "center", justifyContent: "space-between" }]}>
            <TouchableOpacity onPress={() => editProgram(item)}>
              <View
                style={{
                  backgroundColor: Colors.green,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  marginRight: 5,
                  width: 80,
                }}
              >
                <Text style={[style.activetext, { textAlign: "center" }]}>
                  {t("edit")}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setItem(item); setModalVisible(true) }}>
              <View
                style={{
                  backgroundColor: Colors.cancel,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  marginRight: 5,
                  width: 80,
                }}
              >
                <Text style={[style.activetext, { textAlign: "center" }]}>
                  {t("delete")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        ) :
          (null)}


      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 60 }}>
      {store.isLoading && <Spinner />}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
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
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
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
                    style.subtxt,
                    { color: Colors.disable, textAlign: "center" },
                  ]}
                >
                  {t("sure_delete")}
                </Text>
              </View>
              <View style={style.modalbtn_container}>
                <TouchableOpacity
                  style={[style.modalbtn_confirm, { marginRight: 5 }]}
                  onPress={() => { handledeleteProgram() }}
                >
                  <Text style={style.modalbtn_text}>
                    {t("delete")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={style.modalbtn_text}>{t("cancel")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {programs && programs.length > 0 ? (
        <>
          <FlatList
            key={'FlatPerformerPage1'}
            data={programs}
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
