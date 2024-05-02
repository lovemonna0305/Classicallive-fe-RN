import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";

import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { color } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome5";
import { server } from "../../constants";
import { setLoading } from "../../actions/common";
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";
import Toast from "react-native-toast-message";
import { api } from "../../api";



const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Withdraw() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const keyExtractor = (item) => item.key;

  const currentUser = store.currentUser;
  const page = store.page;

  const [points, setPoints] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [selectitem, setSelectitem] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);

  const handlerequest = ()=> {
    setModalPayment(false);
    if(points == 0 ){
      Toast.show({
        type: "error",
        text1: t("error"),
        text2: t("greater_than_0"),
      });
      return;
    }
    if(currentUser.points < parseInt(points)){
      Toast.show({
        type: "error",
        text1: t("error"),
        text2: t("smaller_than_balance"),
      });
      return;
    }
    let formdata = new FormData();
    formdata.append("amount", points);
    changeStore({ ...store, isLoading: true });
    (async () => {
      api.requestWithdraw(formdata)
        .then(res => {
          if (res.data.success) {
            currentUser.points -= points;
            changeStore({ ...store, isLoading: false, currentUser: currentUser });
            Toast.show({
              type: "success",
              text1: t("success"),
              text2: t("request_withdraw_successfully"),
            });
          } else {
            changeStore({ ...store, isLoading: false });
            return;
          }
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
          console.log(err)
        });
    })();

  }

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("withdraw")}
        titleStyle={{ color: theme.txt}}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.replace(page)}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        {store.isLoading && <Spinner />}
        <View style={{ flex: 1 }}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalPayment}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalPayment(!modalPayment);
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
                <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
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
                      {t("withdraw_sure")}
                    </Text>
                  </View>
                  <View style={style.modalbtn_container}>
                    <TouchableOpacity
                      onPress={() => {
                        handlerequest();
                      }}
                      style={[style.modalbtn_confirm, { marginRight: 5 }]}
                    >
                      <Text style={style.modalbtn_text}>
                        {t("withdraw_now")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                      onPress={() => setModalPayment(false)}
                    >
                      <Text style={style.modalbtn_text}>{t("cancel")}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </View>
          </Modal>
          <View style={{ paddingTop: 10, marginBottom: 10 }}>
            <Text style={[style.secondarytext, { fontSize: 14 , paddingRight:5}]}>{t("your_balance")}{":"}
              <Text style={[style.activetext, { fontSize: 20, marginLeft: 10 }]}>{currentUser.points}</Text>
            </Text>
          </View>
          <View style={{ paddingTop: 5 }}>
              <Text
                style={{
                  color: theme.txt,
                  fontWeight: "500",
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("coins")}
              </Text>
              <View style={{ paddingTop: 8 }}>
                <TextInput
                  inputMode="decimal"
                  placeholder={t("coins")}
                  selectionColor={Colors.primary}
                  placeholderTextColor={Colors.disable}
                  style={[style.txtinput, { backgroundColor: theme.bg }]}
                  value={points.toString()}
                  onChangeText={(e) => setPoints(e)}
                />
              </View>
              <View style={{ paddingVertical: 30 }}>
                <TouchableOpacity onPress={()=>setModalPayment(true)} style={style.btn}>
                  <Text style={style.btntxt}>{t("withdraw")}</Text>
                </TouchableOpacity>
              </View>

            </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
  },
  paymentContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.8)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // height: 500,
    height: '100%',
    position: 'absolute'
  },
  modalContainer: {
    width: '85%',
    // height: 500,
    // padding: 10
    backgroundColor: 'white',
    height: '50%',
    padding: 10,
    borderRadius: 20
  },
  priceView: {
    flexDirection: 'row',
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 1,
    // borderTopColor:"#d9d9d9",
    // borderTopWidth:1,
  },
  priceText: {
    color: 'black',
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});
