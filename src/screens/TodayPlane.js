import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";
import style from "../theme/style";
import { Colors } from "../theme/color";
import RoundCheckbox from "rn-round-checkbox";
import CheckBox from "react-native-just-checkbox";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function TodayPlane() {
  // const [isSelected, setIsSelected] = useState(false)

  const categories = [
    // require("../../assets/image/list1.png"),
    // require("../../assets/image/list2.png"),
    // require("../../assets/image/list3.png"),
    // require("../../assets/image/list4.png"),
  ];
  const [categoryIndex, setcategoryIndex] = useState(0);

  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  const Categorylist = () => {
    return (
      <View style={style.categorycontainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setcategoryIndex(index)}
          >
            <Image
              source={item}
              key={index}
              resizeMode="stretch"
              style={[
                categoryIndex == index && style.categoryTextSelected,
                { width: width / 5, height: height / 8.5 },
              ]}
            ></Image>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="Today's Plane"
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity
              onPress={() => navigation.navigate("BottomNavigator")}
            >
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: Colors.secondary }}
                color="black"
                size={40}
              />
            </TouchableOpacity>
          }
        />

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={[style.inputContainer, { backgroundColor: theme.bg }]}>
            <Icon name="search" size={20} color={Colors.disable} />
            <TextInput
              placeholder="search"
              selectionColor={Colors.primary}
              placeholderTextColor={Colors.disable}
              style={{
                flex: 1,
                color: Colors.active,
                fontFamily: "Plus Jakarta Sans",
              }}
            />

            <View
              style={[
                style.verticaldivider,
                { backgroundColor: Colors.disable, marginHorizontal: 10 },
              ]}
            ></View>
            <Image
              // source={require("../../assets/image/Filter1.png")}
              style={{ width: width / 20, height: height / 40 }}
            ></Image>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: theme.txt,
            marginTop: 20,
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          Category
        </Text>
        <Categorylist></Categorylist>
        <Text
          style={{ fontSize: 20, color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        >
          Workout List
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              // source={require("../../assets/image/listc.png")}
              resizeMode="stretch"
              style={{ width: width / 5, height: height / 9 }}
            ></Image>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: theme.txt,
                  marginBottom: 5,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                Doing leg stretch
              </Text>
              <Text
                style={[
                  style.subtxt,
                  { width: 180, fontFamily: "Plus Jakarta Sans" },
                ]}
              >
                Finish this exercise in 15 minutes
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <CheckBox
                isChecked={true}
                checkBoxSize={40}
                checkColor={Colors.primary}
                squareCheckBox={false}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              // source={require("../../assets/image/lista.png")}
              resizeMode="stretch"
              style={{ width: width / 5, height: height / 9 }}
            ></Image>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: theme.txt,
                  marginBottom: 5,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                Lifting Belly
              </Text>
              <Text style={[style.subtxt, { width: 180 }]}>
                Finish this exercise in 15 minutes
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <CheckBox
                isChecked={false}
                checkBoxSize={40}
                checkColor={Colors.primary}
                squareCheckBox={false}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              // source={require("../../assets/image/listb.png")}
              resizeMode="stretch"
              style={{ width: width / 5, height: height / 9 }}
            ></Image>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: theme.txt,
                  marginBottom: 5,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                High Jump
              </Text>
              <Text style={[style.subtxt, { width: 180 }]}>
                Finish this exercise in 15 minutes
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <CheckBox
                isChecked={false}
                checkBoxSize={40}
                checkColor={Colors.primary}
                squareCheckBox={false}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              // source={require("../../assets/image/listb.png")}
              resizeMode="stretch"
              style={{ width: width / 5, height: height / 9 }}
            ></Image>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: theme.txt,
                  marginBottom: 5,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                High Jump
              </Text>
              <Text style={[style.subtxt, { width: 180 }]}>
                Finish this exercise in 15 minutes
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <CheckBox
                isChecked={false}
                checkBoxSize={40}
                checkColor={Colors.primary}
                squareCheckBox={false}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              // source={require("../../assets/image/listb.png")}
              resizeMode="stretch"
              style={{ width: width / 5, height: height / 9 }}
            ></Image>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: theme.txt,
                  marginBottom: 5,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                High Jump
              </Text>
              <Text style={[style.subtxt, { width: 180 }]}>
                Finish this exercise in 15 minutes
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <CheckBox
                isChecked={false}
                checkBoxSize={40}
                checkColor={Colors.primary}
                squareCheckBox={false}
              />
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 20,
            width: width - 80,
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={style.btn}
            onPress={() => navigation.navigate("PlaneDetail")}
          >
            <Text style={style.btntxt}>Next Step</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
