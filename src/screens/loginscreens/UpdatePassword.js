import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppBar } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { t } from "i18next";

export default function UpdatePassword() {
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  const [data, setData] = useState({
    
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        // title="update_password"
        titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
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
      />
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <View style={{ paddingTop: 20 }}>
           <Text
            style={[style.title, { textAlign: "center", color: theme.txt }]}
          >
            {t('change_password')}
          </Text>
          {/*<Text
            style={[style.title, { textAlign: "center", color: theme.txt }]}
          >
            New Password
          </Text>
          <Text style={[style.txt1, { textAlign: "center" }]}>
            Enter your new password
          </Text> */}
        </View>
        <View style={{ paddingTop: 15 }}>


          <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
            {t('prev_pw')}
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
              value={data.old_password}
              placeholder={t('enter_current_pw')}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
              onChangeText={(e)=>setData({...data, old_password:e})}
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

          <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
            {t('password')}
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
              value={data.new_password}
              placeholder={t('enter_new_pw')}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
              onChangeText={(e)=>setData({...data, new_password:e})}
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
            {t('confirm_password')}
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
              value={data.confirm_password}
              placeholder={t('reenter_pw')}
              secureTextEntry={!isPassword}
              placeholderTextColor={Colors.disable}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
              onChangeText={(e)=>setData({...data, confirm_password:e})}
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
