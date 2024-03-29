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
import { buycoins, fetchPaymentIntentClientSecret } from "../../actions/customer";
import { server } from "../../constants";
import { setLoading } from "../../actions/common";
import Spinner from "../../components/Spinner";
import { CardField, useStripe, CardForm, Googlepay, PlatformPayButton, PlatformPay, createPlatformPayPaymentMethod, isPlatformPaySupported, usePlatformPay } from "@stripe/stripe-react-native";
import { useStore } from "../../store/store";
import Toast from "react-native-toast-message";



const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function CustomerPoints() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const keyExtractor = (item) => item.key;
  const { confirmPayment, handleCardAction } = useStripe();

  const {
    isPlatformPaySupported,
    confirmPlatformPayPayment,
  } = usePlatformPay();

  // const { program } = useSelector((state) => state.customer);
  const currentUser = store.currentUser;
  // const { isLoading } = useSelector((state) => state.common);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [selectitem, setSelectitem] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [clientSecret, setClientSecret] = useState();
  const [cardDetails, setCardDetails] = useState({
    amount: '',
    number: '',
    cvc: '',
    expiryDate: '',
    country: ''
  });

  const coinsdata = [
    {
      "points": 100,
      "amount": Math.floor(100 * 1.1),
    },
    {
      "points": 200,
      "amount": Math.floor(200 * 1.1),
    },
    {
      "points": 500,
      "amount": Math.floor(500 * 1.1),
    },
    {
      "points": 1000,
      "amount": Math.floor(1000 * 1.1),
    },
  ];

  useEffect(() => {
    (async function () {
      if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
        Alert.alert('Google Pay is not supported.');
        return;
      }
    })();
  }, []);

  useEffect(()=> {
    const confirmPayment = async() => {
      const { error } = await confirmPlatformPayPayment(
        clientSecret,
        {
          googlePay: {
            testEnv: true,
            merchantName: 'My merchant name',
            merchantCountryCode: 'US',
            currencyCode: 'USD',
            // billingAddressConfig: {
            //   format: PlatformPay.BillingAddressFormat.Full,
            //   isPhoneNumberRequired: true,
            //   isRequired: true,
            // },
          },
        }
      );
  
      if (error) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: t("buy_coins_error"),
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: "Success",
        text2: t("buy_coins_success"),
      });
    }
    confirmPayment();

  }, [clientSecret])

  const createPaymentMethod = async () => {

    changeStore({ ...store, isLoading: true });
    let formdata = new FormData();
    formdata.append("amount", selectitem.amount);
    formdata.append("points", selectitem.points);
    formdata.append("cardNumber", cardNumber);
    formdata.append("expiryDate", expiryDate);
    formdata.append("cvv", cvv);
    await fetchPaymentIntentClientSecret(formdata)
      .then(res => {
        setClientSecret(res.data.data.client_secret);
        currentUser.points += selectitem.points;
        changeStore({ ...store, currentUser: currentUser });

        changeStore({ ...store, isLoading: false });
      }).catch(err => {
        changeStore({ ...store, isLoading: false });
      });
    setModalPayment(false);
  };

  const renderItem = ({ item, index }) => {
    const selectcoins = async (item) => {
      setSelectitem(item);
      setModalPayment(true);
    }
    return (
      <View key={`post-point${index}`} style={{ height: 60, padding: 5, backgroundColor: theme.box, borderRadius: 5, marginBottom: 10 }}>
        <View style={[style.row, { alignItems: "center", justifyContent: "space-between", paddingTop: 5, paddingHorizontal: 10 }]}>
          <View style={[style.row, { alignItems: "center" }]}>
            <View style={{}}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/img/ic_coin.png")}
                style={{ width: 40, height: 40, }}
              />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={style.activetext}>{Math.floor(item.points)}</Text>
            </View>
          </View>
          <TouchableOpacity style={{ backgroundColor: "#D05A35", borderColor: "white", borderRadius: 5, borderWidth: 1, width: 100 }}
            onPress={() => selectcoins(item)}>
            <Text style={[style.activetext, { paddingHorizontal: 30, paddingVertical: 10, textAlign: "center" }]}>{item.amount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40, position: 'relative' }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("purchase_coins")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color="white"
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
                      {t("pay_sure")}
                    </Text>
                  </View>

                  {/* <View style={{ paddingTop: 5 }}>
                      <Text
                        style={{
                          color: theme.txt,
                          fontWeight: "500",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      >
                        {t("card_number")}
                      </Text>
                      <View style={{ paddingTop: 8 }}>
                        <TextInput
                          label="Card Number"
                          value={cardNumber}
                          onChangeText={text => setCardNumber(text)}
                          keyboardType="numeric"
                          inputMode="decimal"
                          selectionColor={Colors.primary}
                          placeholderTextColor={Colors.disable}
                          style={[style.txtinput, { backgroundColor: theme.bg }]}
                          // onChangeText={}
                        />
                      </View>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Text
                        style={{
                          color: theme.txt,
                          fontWeight: "500",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      >
                        {t("expiry_date")}
                      </Text>
                      <View style={{ paddingTop: 8 }}>
                        <TextInput
                          label="Expiry Date (MM/YY)"
                          value={expiryDate}
                          onChangeText={text => setExpiryDate(text)}
                          keyboardType="numeric"
                          inputMode="decimal"
                          selectionColor={Colors.primary}
                          placeholderTextColor={Colors.disable}
                          style={[style.txtinput, { backgroundColor: theme.bg }]}
                          // onChangeText={}
                        />
                      </View>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Text
                        style={{
                          color: theme.txt,
                          fontWeight: "500",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      >
                        {t("CVV")}
                      </Text>
                      <View style={{ paddingTop: 8 }}>
                        <TextInput
                          label="CVC"
                          value={cvv}
                          onChangeText={text => setCVV(text)}
                          keyboardType="numeric"
                          inputMode="decimal"
                          selectionColor={Colors.primary}
                          placeholderTextColor={Colors.disable}
                          style={[style.txtinput, { backgroundColor: theme.bg }]}
                          // onChangeText={}
                        />
                      </View>
                    </View> */}
                  <View style={style.modalbtn_container}>
                    <TouchableOpacity
                      onPress={() => {
                        createPaymentMethod();
                      }}
                      style={[style.modalbtn_confirm, { marginRight: 5 }]}
                    >
                      <Text style={style.modalbtn_text}>
                        {t("pay_now")}
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
          <View style={{ paddingTop: 10 }}>
            <Text style={[style.secondarytext, { fontSize: 14, textAlign: "center" }]}>{t("purchase_points_desc")}</Text>
          </View>
          <View style={{ paddingTop: 10, marginBottom: 10 }}>
            <Text style={[style.secondarytext, { fontSize: 14 }]}>{t("available_coins")}
              <Text style={[style.activetext, { fontSize: 20, marginLeft: 10 }]}>{currentUser.points}</Text>
            </Text>
          </View>
          <FlatList
            key={1}
            data={coinsdata}
            initialNumToRender={3}
            keyExtractor={(item, index) => {
              return index;
            }}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
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
