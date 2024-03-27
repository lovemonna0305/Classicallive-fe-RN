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
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Languagelist() {
  const theme = useContext(themeContext);
  const [checked, setChecked] = useState(false);
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
          title="Select a Language"
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate("Language")}>
              <Icon name="close-sharp" color={theme.txt} size={30} />
            </TouchableOpacity>
          }
        />

        <View
          style={[
            style.radio,
            {
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            },
          ]}
        >
          <RadioButton
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setChecked("first")}
            color={Colors.btn}
            uncheckedColor={Colors.bord}
          />
          <Text
            style={{
              fontWeight: "600",
              color: theme.txt,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            English (UK)
          </Text>
        </View>
        <View
          style={[
            style.radio,
            {
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            },
          ]}
        >
          <RadioButton
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
            color={Colors.btn}
            uncheckedColor={Colors.bord}
          />
          <Text
            style={{
              fontWeight: "600",
              color: theme.txt,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            English
          </Text>
        </View>
        <View
          style={[
            style.radio,
            {
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            },
          ]}
        >
          <RadioButton
            value="third"
            status={checked === "third" ? "checked" : "unchecked"}
            onPress={() => setChecked("third")}
            color={Colors.btn}
            uncheckedColor={Colors.bord}
          />
          <Text
            style={{
              fontWeight: "600",
              color: theme.txt,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Bahasa Indonesia
          </Text>
        </View>
        <View
          style={[
            style.radio,
            {
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            },
          ]}
        >
          <RadioButton
            value="four"
            status={checked === "four" ? "checked" : "unchecked"}
            onPress={() => setChecked("four")}
            color={Colors.btn}
            uncheckedColor={Colors.bord}
          />
          <Text
            style={{
              fontWeight: "600",
              color: theme.txt,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Chineses
          </Text>
        </View>
        <View
          style={[
            style.radio,
            {
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            },
          ]}
        >
          <RadioButton
            value="five"
            status={checked === "five" ? "checked" : "unchecked"}
            onPress={() => setChecked("five")}
            color={Colors.btn}
            uncheckedColor={Colors.bord}
          />
          <Text
            style={{
              fontWeight: "600",
              color: theme.txt,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Croatian
          </Text>
        </View>
        <View
          style={[
            style.radio,
            {
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            },
          ]}
        >
          <RadioButton
            value="six"
            status={checked === "six" ? "checked" : "unchecked"}
            onPress={() => setChecked("six")}
            color={Colors.btn}
            uncheckedColor={Colors.bord}
          />
          <Text
            style={{
              fontWeight: "600",
              color: theme.txt,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Czech
          </Text>
        </View>
        <View
          style={[
            style.radio,
            {
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            },
          ]}
        >
          <RadioButton
            value="seven"
            status={checked === "seven" ? "checked" : "unchecked"}
            onPress={() => setChecked("seven")}
            color={Colors.btn}
            uncheckedColor={Colors.bord}
          />
          <Text
            style={{
              fontWeight: "600",
              color: theme.txt,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Danish
          </Text>
        </View>
        <View
          style={[
            style.radio,
            {
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            },
          ]}
        >
          <RadioButton
            value="eight"
            status={checked === "eight" ? "checked" : "unchecked"}
            onPress={() => setChecked("eight")}
            color={Colors.btn}
            uncheckedColor={Colors.bord}
          />
          <Text
            style={{
              fontWeight: "600",
              color: theme.txt,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Filipino
          </Text>
        </View>
        <View
          style={[
            style.radio,
            {
              paddingVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            },
          ]}
        >
          <RadioButton
            value="nine"
            status={checked === "nine" ? "checked" : "unchecked"}
            onPress={() => setChecked("nine")}
            color={Colors.btn}
            uncheckedColor={Colors.bord}
          />
          <Text
            style={{
              fontWeight: "600",
              color: theme.txt,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Finland
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
