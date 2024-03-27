import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppBar } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";

export default function NewPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title="Create a New Password"
        titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Forgotpass")}>
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
            Create a{" "}
          </Text>
          <Text
            style={[style.title, { textAlign: "center", color: theme.txt }]}
          >
            New Password
          </Text>
          <Text style={[style.txt1, { textAlign: "center" }]}>
            Enter your new password
          </Text>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
            Password
          </Text>
          <View
            style={[
              style.txtinput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
              },
            ]}
          >
            <TextInput
              placeholder="Create a password"
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
            ></TextInput>
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Icons
                name={isPasswordVisible ? "eye-off" : "eye"}
                color={theme.txt}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              style.txt1,
              { fontWeight: "500", color: theme.txt, paddingVertical: 10 },
            ]}
          >
            Confirm Password
          </Text>
          <View
            style={[
              style.txtinput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!isPassword}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
            />
            <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
              <Icons
                name={isPassword ? "eye-off" : "eye"}
                color={theme.txt}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 30 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={style.btn}
            >
              <Text style={style.btntxt}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
