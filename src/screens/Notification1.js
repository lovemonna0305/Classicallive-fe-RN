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
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

export default function Notification() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [ison, setIsOn] = useState(false);
  const toggle = () => setIsOn((previousState) => !previousState);

  const [ison1, setIsOn1] = useState(true);
  const toggle1 = () => setIsOn1((previousState) => !previousState);

  const [isEnabled1, setIsEnabled1] = useState(true);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);

  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="Notifications"
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: Colors.secondary }}
                color="black"
                size={35}
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
          <Text
            style={{
              fontSize: 12,
              color: Colors.disable,
              fontWeight: "600",
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Messages Notifications
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={[style.txt1, { color: theme.txt }]}>New Workout</Text>
            <Switch
              trackColor={{ false: Colors.disable, true: Colors.primary }}
              thumbColor={isEnabled ? Colors.secondary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
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
            <Text style={[style.txt1, { color: theme.txt }]}>Added Friend</Text>
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
            <Text style={[style.txt1, { color: theme.txt }]}>Message</Text>
            <Switch
              trackColor={{ false: Colors.disable, true: Colors.primary }}
              thumbColor={isEnabled1 ? Colors.secondary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isEnabled1}
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
            <Text style={[style.txt1, { color: theme.txt }]}>
              Complete Workout
            </Text>
            <Switch
              trackColor={{ false: Colors.disable, true: Colors.primary }}
              thumbColor={ison1 ? Colors.secondary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggle1}
              value={ison1}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
