import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
  StatusBar,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState, useContext } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Location() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={[style.title1, { color: theme.txt }]}>Fitnest</Text>
          <Text
            style={{
              color: theme.txt,
              fontSize: 16,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Exercise with style
          </Text>
        </View>
        <View style={{ flex: 2.7, marginTop: -30 }}>
          <Text
            style={[style.subtitle, { color: theme.txt, marginBottom: 10 }]}
          >
            Location access required
          </Text>
          <Text style={style.subtxt}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>

          <View style={{ paddingVertical: 30 }}>
            <TouchableOpacity
              style={style.btn}
              onPress={() => setVisible(true)}
            >
              <Text style={style.btntxt}>Give Location Access</Text>
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
            <View
              style={[
                style.modalcontainer,
                {
                  backgroundColor: theme.bg,
                  marginTop: 50,
                  marginVertical: 200,
                },
              ]}
            >
              <Icon
                name="close-outline"
                size={20}
                color={theme.txt}
                onPress={() => setVisible(false)}
                style={{ alignSelf: "flex-end", paddingHorizontal: 10 }}
              />
              <Image
                source={require("../../assets/img/location.png")}
                style={{ alignSelf: "center" }}
              />
              <View style={{ paddingTop: 20 }}>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <Text
                    style={{
                      color: theme.txt,
                      textAlign: "center",
                      fontSize: 20,
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    Give{" "}
                  </Text>
                  <Text
                    style={{
                      color: theme.icon,
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "600",
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    Classicallive
                  </Text>
                  <Text
                    style={{
                      color: theme.txt,
                      textAlign: "center",
                      fontSize: 20,
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    {" "}
                    devie access to
                  </Text>
                </View>

                <Text
                  style={{
                    color: theme.txt,
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  your location
                </Text>
              </View>
              <View style={{ paddingTop: 20 }}>
                <TouchableOpacity
                  style={[style.btn, { borderRadius: 6 }]}
                  onPress={() => {
                    setVisible(false);
                    setIsVisible(true);
                  }}
                >
                  <Text style={style.btntxt}>When using this App</Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: 15 }}>
                <TouchableOpacity
                  style={[style.btnoutline, { backgroundColor: theme.bg }]}
                >
                  <Text
                    style={{
                      color: theme.txt,
                      fontSize: 15,
                      textAlign: "center",
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    Just this time
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: 15 }}>
                <TouchableOpacity
                  style={[style.btnoutline, { backgroundColor: theme.bg }]}
                >
                  <Text
                    style={{
                      color: theme.txt,
                      fontSize: 15,
                      textAlign: "center",
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    Deny
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal transparent={true} visible={isVisible}>
          <View
            style={{
              width: width,
              flex: 1,
              backgroundColor: "#000000aa",
              transparent: "true",
            }}
          >
            <View
              style={[
                style.modalcontainer,
                {
                  backgroundColor: theme.bg,
                  width: width - 50,
                  marginVertical: 210,
                },
              ]}
            >
              <View style={{ paddingTop: 15, alignSelf: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[style.txt1, { textAlign: "center" }]}>
                    I agree to the{" "}
                  </Text>
                  <Text style={[style.txt1, { color: Colors.primary }]}>
                    Terms of service
                  </Text>
                  <Text style={[style.txt1, { textAlign: "center" }]}>
                    {" "}
                    and
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[style.txt1, { color: Colors.primary }]}>
                    Condition of use
                  </Text>
                  <Text style={[style.txt1, { textAlign: "center" }]}>
                    {" "}
                    including consent
                  </Text>
                </View>
                <Text style={[style.txt1, { textAlign: "center" }]}>
                  to electronic communications and I{" "}
                </Text>
                <Text style={[style.txt1, { textAlign: "center" }]}>
                  affirm that the information provided{" "}
                </Text>
                <Text style={[style.txt1, { textAlign: "center" }]}>
                  is my own.{" "}
                </Text>
              </View>
              <View style={{ paddingTop: 20 }}>
                <TouchableOpacity
                  style={[style.btn, { width: width / 2, alignSelf: "center" }]}
                  onPress={() => {
                    setIsVisible(false);
                    navigation.navigate("BottomNavigator");
                  }}
                >
                  <Text style={style.btntxt}>Agree and continue</Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: 20 }}>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Text
                    style={{
                      color: "#FF4747",
                      textAlign: "center",
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    Disgree
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
