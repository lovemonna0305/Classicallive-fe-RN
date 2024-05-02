import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
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
// import { deleteProgram } from "../actions/performer";
import { Avatar } from "react-native-paper";
// import {
//   getPProgramsByCategory,
//   approveReservation,
//   rejectionReservation,
// } from "../actions/performer";

// import { getReservations } from "../actions/performer";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../constants";
import StatusView from "./StatusView";
import { api } from "../api";
import { approveReservation, getReservations, rejectionReservation } from "../actions/performer";
import Spinner from "./Spinner";
import { useStore } from "../store/store";
import Toast from "react-native-toast-message";

export default function FlatPerformerPage2({ items, title }) {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [edit, setEdit] = useState(0);
  const program = store.program;
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [reservations, setReservations] = useState();
  const [item, setItem] = useState(false);


  const fetchdata = async () => {
    changeStore({ ...store, isLoading: true });
    await getReservations(program.id)
      .then(res => {
        setReservations(res);
        changeStore({ ...store, isLoading: false });
      }).catch(err => {
        changeStore({ ...store, isLoading: false });
      });
  }
  useEffect(()=>{
    fetchdata();
  },[]);

  const handleApproveProgram = async () => {
    console.log(item);
    try {
      await approveReservation(item.id);
      fetchdata()
      navigation.replace('CustomerList');
      
    } catch (err) {
      console.log(err)
    }
    setModalVisible(false);
  };

  const handleRejectionProgram = async (id) => {
    setEdit(0);
    setModalVisible1(false);
    try {
      await rejectionReservation(id)
      .then((res) =>{
        if(res.data.success){
          Toast.show({
            type: "success",
            text1: t('success'),
            text2: t(res.data.message),
          });
          fetchdata();
        } else {
          Toast.show({
            type: "error",
            text1: t('error'),
            text2: t(res.data.message),
          });
        }
      }).catch((err)=>{
        console.log(err)
      })
      
    } catch (err) {
      console.log(err)
    }
    
  };

  const renderItem = ({ item, index }) => {
    const selectProgram = (item) => {
      setEdit(item.id);
    };
    return (
      <TouchableOpacity
        key={`${title}-${index}`}
        style={{
          height: edit === item.id ? 130 : 90, ///
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
              source={{
                uri:
                  server.member_url + item.customer.image_file,
              }}
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
                  {item.customer.name}
                </Text>
              </View>
              <View style={{ paddingTop: 5 }}>
                <StarRatingDisplay
                  rating={item.ratings}
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
            ></View>
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
                <StatusView status={item.status} />
              </View>
              {/* <View style={[style.row, { alignItems: "center" }]}>
                <View>
                  <Image
                    source={require("../../assets/img/ic_coin.png")}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={{ color: theme.txt, fontSize: 11 }}>
                    {"item.points"}
                  </Text>
                </View>
              </View> */}
            </View>
          </View>
        </View>
        {edit === item.id ? (
          <View
            style={[
              style.row,
              {
                paddingTop: 5,
                paddingHorizontal: 10,
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text
              numberOfLines={2}
              style={[
                style.activetext,
                { fontSize: 11, width: width / 2 - 40 },
              ]}
            >
              {t("approve_cancel_contract")}
            </Text>
            <View
              style={[
                style.row,
                {
                  paddingTop: 5,
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  setEdit(0);
                  handleRejectionProgram(item.id);
                  // setModalVisible(true);
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.green,
                    borderRadius: 5,
                    paddingHorizontal: 8,
                    marginRight: 5,
                    width: 85,
                  }}
                >
                  <Text style={[style.activetext, { textAlign: "center" }]}>
                    {t("approval")}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // setItem(item);
                  setEdit(0);
                  // setModalVisible1(true);
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.cancel,
                    borderRadius: 5,
                    paddingHorizontal: 8,
                    marginRight: 5,
                    width: 85,
                  }}
                >
                  <Text style={[style.activetext, { textAlign: "center" }]}>
                    {t("rejection")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {store.isLoading && <Spinner />}
      <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 60 }}>
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
                    {t("sure_approve")}
                  </Text>
                </View>
                <View style={style.modalbtn_container}>
                  <TouchableOpacity
                    style={[style.modalbtn_confirm, { marginRight: 5 }]}
                    onPress={() => {
                      handleApproveProgram();
                    }}
                  >
                    <Text style={style.modalbtn_text}>{t("approval")}</Text>
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible1(!modalVisible1);
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
                    {t("sure_rejection")}
                  </Text>
                </View>
                <View style={style.modalbtn_container}>
                  <TouchableOpacity
                    style={[style.modalbtn_confirm, { marginRight: 5 }]}
                    onPress={() => {
                      handleRejectionProgram();
                    }}
                  >
                    <Text style={style.modalbtn_text}>{t("rejection")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                    onPress={() => setModalVisible1(false)}
                  >
                    <Text style={style.modalbtn_text}>{t("cancel")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {reservations && reservations.length > 0 ? (
          <>
            <FlatList
              key={1}
              data={reservations}
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
              {t("no_customer_exists")}
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
