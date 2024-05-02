import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useContext } from "react";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";

export default function Forgot() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title={t('forgot_password')}
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: Colors.secondary }}
                color="black"
                size={40}
              />
            </TouchableOpacity>
          }
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.fpb,
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 30,
          }}
        >
          <Avatar.Icon
            icon="information-variant"
            style={{ backgroundColor: "#BDBDBD" }}
            color={theme.txt}
            size={25}
          />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}>
              We will send the OTP code to your email for security in forgetting
              your password
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: theme.txt,
            fontWeight: "500",
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          {t('email')}
        </Text>
        <View style={{ paddingVertical: 10 }}>
          <TextInput
            placeholder="Adeasdewidow29@gmail.com"
            selectionColor={Colors.primary}
            placeholderTextColor={Colors.disable}
            style={[
              style.txtinput,
              { backgroundColor: theme.bg, fontFamily: "Plus Jakarta Sans" },
            ]}
          />
        </View>

        <View style={{ justifyContent: "flex-end", flex: 1, marginBottom: 20 }}>
          <TouchableOpacity style={style.btn}>
            <Text style={style.btntxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
