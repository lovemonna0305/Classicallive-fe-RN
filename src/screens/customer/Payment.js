
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";

import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { color } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";

// import PaymentScreen from "./TestPayment";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import { setLoading } from "../../actions/common";
import Spinner from "../../components/Spinner";

// import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

export default function CustomerPayment() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { program } = useSelector((state) => state.customer);
  const { currentUser } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.common);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEnter, setModalEnter] = useState(false);
  const [modalReserve, setModalReserve] = useState(false);

  // const { confirmPayment } = useStripe();

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30,  }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("payment")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
        trailing={(props) => (
          <HStack
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ paddingRight: 10 }}>
              <Image
                source={require("../../../assets/img/ic_coin.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View style={{ paddingRight: 20 }}>
              <Text style={{ color: theme.txt, fontSize: 15 }}>
                {currentUser.points}
              </Text>
            </View>
          </HStack>
        )}
      />
      <View style={{flex:1}}>
        {isLoading && <Spinner />}
      </View>
      {/* <PaymentScreen/> */}
    </SafeAreaView>
    // <CardField
    //   postalCodeEnabled={true}
    //   placeholders={{
    //     number: '4242 4242 4242 4242',
    //   }}
    //   cardStyle={{
    //     backgroundColor: '#FFFFFF',
    //     textColor: '#000000',
    //   }}
    //   style={{
    //     width: '100%',
    //     height: 50,
    //     marginVertical: 30,
    //   }}
    //   onCardChange={(cardDetails) => {
    //     console.log('cardDetails', cardDetails);
    //   }}
    //   onFocus={(focusedField) => {
    //     console.log('focusField', focusedField);
    //   }}
    // />
  );
}