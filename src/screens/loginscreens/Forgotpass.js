import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import { useNavigation } from "@react-navigation/native";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";

export default function Forgotpass() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      <AppBar
        color={theme.bg}
        title="Forgot Password"
        titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
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
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <View style={{ paddingTop: 20 }}>
          <Text
            style={[style.title, { textAlign: "center", color: theme.txt }]}
          >
            Forgot Password
          </Text>
          <Text style={[style.txt1, { textAlign: "center" }]}>
            Enter your new password
          </Text>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
            Email
          </Text>
          <View style={{ paddingTop: 10 }}>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={Colors.disable}
              style={[style.txtinput, { fontFamily: "Plus Jakarta Sans" }]}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity
              style={style.btn}
              onPress={() => navigation.navigate("NewPassword")}
            >
              <Text style={style.btntxt}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
