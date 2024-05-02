import {
  View,
  Text,
  Switch,
  SafeAreaView,
  TextInput,
  Modal,
  ImageBackground,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import style from "../../theme/style";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";
import Icon6 from "react-native-vector-icons/FontAwesome6";
import { List } from "react-native-paper";
import IconMaterialIcon from "react-native-vector-icons/MaterialIcons";
import IconEntypo from "react-native-vector-icons/Entypo";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import { EventRegister } from "react-native-event-listeners";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../actions/auth";
import { t } from "i18next";
import { useStore } from "../../store/store";

import i18n from "../../localization/i18n";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";


export default function Settings() {
  const { changeStore, store } = useStore();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState("false");

  const currentUser = store.currentUser;
  // const toggleSwitch = () => setDarkMode(previousState => !previousState);

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const language = i18n.language;
    if (language.includes("en")) {
      i18n.changeLanguage(language);
    } else {
      i18n.changeLanguage(language);
    }
  }, []);

  const handlelogout = async () => {

    await logout();
    await changeStore({
      ...store,
      isLoggedin: false,
      showSplashScreen: false,
      role: ''
    });
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={[style.area, { backgroundColor: theme.bg ,paddingTop: 30,}]}>
      <AppBar
        color={theme.bg}
        title={t("settings")}
        // titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.replace('Home')}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 30 }}
        >
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Image
              source={{ uri: server.member_url + currentUser.image_file }}
              resizeMode="stretch"
              style={{
                width: width / 7,
                height: width / 7,
                borderRadius: width / 7,
              }}
            ></Image>
            <View style={{ marginHorizontal: 0 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: theme.txt,
                  marginBottom: 5,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {currentUser.name}
              </Text>
              <Text style={[style.subtxt, { width: width / 2 }]}>
                {currentUser.email}
              </Text>
            </View>
            <View
              style={{ marginRight: 20, alignSelf: "center", marginLeft: 50 }}
            >
              <TouchableOpacity onPress={() =>
                navigation.navigate('AccountProfile')
              }>
                <Icons name="edit" color={theme.txt} size={25}></Icons>
              </TouchableOpacity>
            </View>
          </View>
          {currentUser && currentUser.role_id == 4 ? (
            <>
              <Text
                style={{
                  color: theme.txt,
                  marginVertical: 10,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("program")}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("InterCategoryList")}
              >
                <List.Item
                  title={t("interest_category")}
                  titleStyle={{
                    color: theme.txt,
                    fontSize: 16,
                    fontWeight: "600",
                    fontFamily: "Plus Jakarta Sans",
                  }}
                  left={(props) => (
                    <Icon
                      {...props}
                      name="list"
                      color={theme.txt}
                      size={26}
                    ></Icon>
                  )}
                  right={(props) => (
                    <Icon1
                      {...props}
                      name="chevron-right"
                      color={Colors.disable}
                      size={26}
                    ></Icon1>
                  )}
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
            <Text
                style={{
                  color: theme.txt,
                  marginVertical: 10,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("coins")}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("Withdraw")}
              >
                <List.Item
                  title={t("acquired_coins")}
                  titleStyle={{
                    color: theme.txt,
                    fontSize: 16,
                    fontWeight: "600",
                    fontFamily: "Plus Jakarta Sans",
                  }}
                  left={(props) => (
                    <Icon6
                      {...props}
                      name="coins"
                      color={theme.txt}
                      size={26}
                    ></Icon6>
                  )}
                  right={(props) => (
                    <Text style={{
                      color:Colors.btn,
                      fontWeight:'bold',
                      fontSize:20
                    }}>
                      {currentUser.points}
                    </Text>
                  )}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("RegisterBank")}>
                <List.Item
                  title={t("register_account")}
                  titleStyle={{
                    color: theme.txt,
                    fontSize: 16,
                    fontWeight: "600",
                    fontFamily: "Plus Jakarta Sans",
                  }}
                  left={(props) => (
                    <Icons
                      {...props}
                      name="bank"
                      color={theme.txt}
                      size={26}
                    ></Icons>
                  )}
                  right={(props) => (
                    <Icon1
                      {...props}
                      name="chevron-right"
                      color={Colors.disable}
                      size={26}
                    ></Icon1>
                  )}
                />
              </TouchableOpacity>
            </>
          )}

          <Text
            style={{
              color: theme.txt,
              marginVertical: 10,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            {t("security")}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('UpdatePassword')}>
            <List.Item
              title={t("change_password")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <Icon1
                  {...props}
                  name="lock-outline"
                  color={theme.txt}
                  size={26}
                ></Icon1>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity>

          {/*<TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
            <List.Item
              title={t("forgot_password")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <Icon1
                  {...props}
                  name="lock-open-outline"
                  color={theme.txt}
                  size={26}
                ></Icon1>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity>

           <TouchableOpacity onPress={() => navigation.navigate("Security")}>
            <List.Item
              title={t("security")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <Icon
                  {...props}
                  name="shield-checkmark-outline"
                  color={theme.txt}
                  size={26}
                ></Icon>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity> */}

          <Text
            style={{
              color: theme.txt,
              marginVertical: 10,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            {t("general")}
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Language")}>
            <List.Item
              title={t("language")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <Icon
                  {...props}
                  name="globe-outline"
                  color={theme.txt}
                  size={26}
                ></Icon>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <List.Item
              title={t("notification")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <Icon
                  {...props}
                  name="notifications-outline"
                  color={theme.txt}
                  size={26}
                ></Icon>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity> */}

          

          <TouchableOpacity onPress={() => navigation.navigate("Report")}>
            <List.Item
              title={t("report")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <IconMaterialIcon
                  {...props}
                  name="report"
                  color={theme.txt}
                  size={26}
                ></IconMaterialIcon>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
            <List.Item
              title={t("contactus")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <Icon1
                  {...props}
                  name="help-circle-outline"
                  color={theme.txt}
                  size={26}
                ></Icon1>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: theme.txt,
              marginVertical: 10,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            {t("about")}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
            <List.Item
              title={t("terms_use")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <IconEntypo
                  {...props}
                  name="text-document"
                  color={theme.txt}
                  size={26}
                ></IconEntypo>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
            <List.Item
              title={t("privacy")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <Icon
                  {...props}
                  name="shield-outline"
                  color={theme.txt}
                  size={26}
                ></Icon>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Law")}>
            <List.Item
              title={t("law")}
              titleStyle={{
                color: theme.txt,
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
              left={(props) => (
                <Icon1
                  {...props}
                  name="scale-balance"
                  color={theme.txt}
                  size={26}
                ></Icon1>
              )}
              right={(props) => (
                <Icon1
                  {...props}
                  name="chevron-right"
                  color={Colors.disable}
                  size={26}
                ></Icon1>
              )}
            />
          </TouchableOpacity>


          

          <List.Item
            title={t("dark_mode")}
            titleStyle={{
              color: theme.txt,
              fontSize: 16,
              fontWeight: "600",
              fontFamily: "Plus Jakarta Sans",
            }}
            left={(props) => (
              <Icon
                {...props}
                name="trending-up"
                color={theme.txt}
                size={26}
              ></Icon>
            )}
            right={(props) => (
              <Switch
                {...props}
                value={darkMode}
                onValueChange={(value) => {
                  setDarkMode(value);
                  EventRegister.emit("ChangeTheme", value);
                }}
              />
            )}
          />
          <View style={{ marginBottom: 70 }}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={[
                style.btn1,
                {
                  borderColor: Colors.btn,
                  borderWidth: 1,
                  backgroundColor: theme.bg,
                },
              ]}
            >
              <Text style={[style.btntxt1, { color: Colors.btn }]}>
                {t("logout")}
              </Text>
              <Modal transparent={true} visible={visible}>
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
                          {t("sure_logout")}
                        </Text>
                      </View>
                      <View style={style.modalbtn_container}>
                        <TouchableOpacity
                          onPress={() => {
                            handlelogout();
                            setVisible(false);
                          }}
                          style={[style.modalbtn_confirm, { marginRight: 5 }]}
                        >
                          <Text style={style.modalbtn_text}>{t("logout")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                          onPress={() => setVisible(false)}
                        >
                          <Text style={style.modalbtn_text}>{t("cancel")}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
