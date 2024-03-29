import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import style from "../../theme/style";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import OtpInputs from "react-native-otp-inputs";
import Clipboard from "@react-native-clipboard/clipboard";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { api } from "../../api";
import Toast from "react-native-toast-message";
import { storage } from "../../utils/storage";
import { t } from "i18next";
// import { setLoading } from "../../actions/common";
import { images } from "../../constants";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default function Otp({ route, navigation }) {
 
  
  const { isLoggedin } = useSelector((state) => state.auth);
  const theme = useContext(themeContext);
  const [visible, setVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (isLoggedin) setVisible(true);
  }, [isLoggedin]);

  const handleVerifyOtp = async () => {
    console.log(otp, otp.length, route.params.email);
    if (isLoading) return;
    if (otp.length < 4) {
      Toast.show({
        type: "error",
        text1: t('opt_is_incorrect'),
        text2: t('provide_correct_4_digits'),
      });
      return;
    }
    store.dispatch(setLoading(true))
    store.dispatch(verifyOtp(otp, setVisible));
    store.dispatch(setLoading(false))
  };

  const resendOtp = async () => {
    try {
      const res = await api.resendOtpEmail(route.params.email);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: t('opt_is_incorrect'),
        text2: t('provide_correct_4_digits'),
        position: "bottom",
      });
      console.log(e);
    }
  };

  const handleContinue = async () => {
    try {
      setVisible(false);
      navigation.navigate("OnBoarding");
    } catch (err) {
      console.log(err)
    }
  };
  const handleChangeOTP = (e) => {
    setOtp(e)
  }
  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: Colors.secondary }}
              color="black"
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <View style={{ flex: 1, paddingTop: 50, marginHorizontal: 20 }}>
        <Text style={[style.title, { color: theme.txt, textAlign: "center" }]}>
          {t('enter_opt')}
        </Text>
        <View style={{ paddingTop: 15 }}></View>
        <Text style={[style.txt1, { textAlign: "center" }]}>
          {t('we_have_just_sent_4_digit_code')}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[style.txt1]}>{t('your')}</Text>
          <Text style={[style.txt1, { color: theme.txt }]}>
            {"  "}
            {route.params.email}
          </Text>
        </View>
        {/* <View>
          <Text style={[style.txt1, { textAlign: "center" }]}>
            This code will be expired within 10mins.
          </Text>
        </View> */}
        <View style={{ paddingTop: 20 }}>
          <OtpInputs
            Clipboard={Clipboard}
            numberOfInputs={4}
            selectionColor={Colors.primary}
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            handleChange={handleChangeOTP}
            inputStyles={{
              borderColor: Colors.primary,
              backgroundColor: theme.bg,
              borderRadius: 5,
              textAlign: "center",
              height: 50,
              width: 50,
              fontSize: 20,
              borderWidth: 1,
              color: theme.txt,
              fontWeight: "bold",
            }}
          />
        </View>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity style={style.btn} onPress={handleVerifyOtp}>
            <Text style={style.btntxt}>{t('continue')}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
            justifyContent: "center",
          }}
        >
          <Text style={[style.txt1]}>{t('didnt_receive_code')}</Text>
          <TouchableOpacity onPress={resendOtp}>
            <Text style={[style.txt1, { color: Colors.primary }]}>
              {t('resend_code')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal transparent={true} visible={visible}>
        <View
          style={{
            width: width,
            flex: 1,
            backgroundColor: "#000000aa",
            transparent: "true",
          }}
        >
          <View style={[style.modalcontainer, { backgroundColor: theme.bg }]}>
            <Image
              source={images.success}
              style={{ alignSelf: "center" }}
            />
            <View style={{ paddingTop: 15 }}>
              <Text
                style={[style.title, { color: theme.txt, textAlign: "center" }]}
              >
                {t('you_have_registered_in')}
              </Text>
              <Text
                style={[style.title, { color: theme.txt, textAlign: "center" }]}
              >
                {t('successfully')}
              </Text>
            </View>
            <View style={{ paddingTop: 15 }}>
              <Text style={[style.txt1, { textAlign: "center" }]}>
                {t('you_can_login')}
              </Text>
              {/* <Text style={[style.txt1, { textAlign: "center" }]}>
                printing and typesetting industry.
              </Text> */}
            </View>
            <View style={{ paddingTop: 20 }}>
              <TouchableOpacity style={style.btn} onPress={handleContinue}>
                <Text style={style.btntxt}>{t('continue')}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 20 }}></View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}