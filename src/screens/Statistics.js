import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useContext } from "react";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../theme/style";
import { Colors } from "../theme/color";
import theme from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Statistics() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} 
        barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <Avatar.Image
            // source={require("../../assets/image/statisticuser4.png")}
            size={80}
          />
          <View>
            <Avatar.Image
              // source={require("../../assets/image/green4.png")}
              style={{
                position: "absolute",
                marginTop: -70,
                marginLeft: 25,
              }}
              size={15}
            />
          </View>
        </View>
        <View style={{ paddingTop: 20, alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 20,
              color: theme.txt,
              fontWeight: "600",
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Andeas Dewindow
          </Text>
          <Text style={[style.txt1, { textAlign: "center" }]}>
            A sports lover
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
          <View
            style={{
              paddingTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingRight: 15,
              }}
            >
              {/* <Image source={require("../../assets/image/workout.png")} /> */}
              <View style={{ paddingLeft: 5 }}>
                <Text style={style.txt1}>Workout</Text>
                <Text style={[style.title, { color: theme.txt }]}>153</Text>
              </View>
            </View>
            <View
              style={[
                style.verticaldivider,
                { backgroundColor: Colors.disable },
              ]}
            ></View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 15,
              }}
            >
              {/* <Image source={require("../../assets/image/calories1.png")} /> */}
              <View style={{ paddingLeft: 5 }}>
                <Text style={style.txt1}>Calories</Text>
                <Text style={[style.title, { color: theme.txt }]}>320</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: theme.txt,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              Activities
            </Text>
          </View>
          <View style={{ paddingTop: 15, alignItems: "center" }}>
            <Image
              // source={require("../../assets/image/activities4.png")}
              style={{ height: height / 4.9, width: width / 1.2 }}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: theme.txt,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              Today's Report
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              marginBottom: 10,
              justifyContent: "space-between",
            }}
          >
            <Image
              // source={require("../../assets/image/purpole4.png")}
              resizeMode="stretch"
              style={{ width: width / 2.4, height: height / 7 }}
            />
            <Image
              // source={require("../../assets/image/red4.png")}
              resizeMode="stretch"
              style={{ width: width / 2.4, height: height / 7 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              marginBottom: 70,
              justifyContent: "space-between",
            }}
          >
            <Image
              // source={require("../../assets/image/sky4.png")}
              resizeMode="stretch"
              style={{ width: width / 2.4, height: height / 7 }}
            />
            <Image
              // source={require("../../assets/image/orange4.png")}
              resizeMode="stretch"
              style={{ width: width / 2.4, height: height / 7 }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
