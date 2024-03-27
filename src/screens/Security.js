import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Switch,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
// import ToggleSwitch from 'toggle-switch-react-native'
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

export default function Security() {
  const theme = useContext(themeContext);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [ison, setIsOn] = useState(true);
  const toggle = () => setIsOn((previousState) => !previousState);

  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);

  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="Security"
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
            marginTop: 30,
            borderColor: Colors.bord,
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[style.txt1, { color: theme.txt }]}>Face ID</Text>
            <Switch
              trackColor={{ false: Colors.disable, true: Colors.primary }}
              thumbColor={isEnabled ? Colors.secondary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            {/* <Switch
          onValueChange={this.switchOne}
          value={this.state.activeSwitch === 1}
        /> */}
          </View>
          <View style={style.divider1}></View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[style.txt1, { color: theme.txt }]}>
              Remember Password
            </Text>
            <Switch
              trackColor={{ false: Colors.disable, true: Colors.primary }}
              thumbColor={ison ? Colors.secondary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggle}
              value={ison}
            />
          </View>
          <View style={style.divider1}></View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[style.txt1, { color: theme.txt }]}>Touch ID</Text>
            <Switch
              trackColor={{ false: Colors.disable, true: Colors.primary }}
              thumbColor={isEnabled1 ? Colors.secondary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isEnabled1}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
//   }
// }
