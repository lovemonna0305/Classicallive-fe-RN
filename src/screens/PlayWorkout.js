import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useState, useContext } from "react";
import { AppBar, Spacer } from "@react-native-material/core";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../theme/style";
import { Colors } from "../theme/color";
import theme from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";
import { SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
export default function PlayWorkout() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground
        // source={require("../../assets/image/playworkout.png")}
        style={{ height: height / 2, width: width }}
      >
        <ImageBackground
          // source={require("../../assets/image/transperent.png")}
          style={{
            height: height / 1.5,
            width: width,
            marginTop: -140,
            marginBottom: 10,
          }}
        >
          <AppBar
            // color='white'
            // title="User Join Profile"
            // centerTitle={true}
            elevation={0}
            leading={
              <TouchableOpacity
                onPress={() => navigation.navigate("Workoutdetail")}
              >
                <Avatar.Icon
                  icon="arrow-left"
                  style={{
                    backgroundColor: Colors.secondary,
                    marginTop: 270,
                    marginLeft: 20,
                  }}
                  color="black"
                  size={40}
                />
              </TouchableOpacity>
            }
          />
        </ImageBackground>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        <View style={{ paddingHorizontal: 20, height: 340 }}>
          <View style={{ paddingTop: 20 }}>
            <Text style={[style.title, { color: theme.txt }]}>
              Doing leg stretch
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                alignItems: "center",
              }}
            >
              <Icons name="alarm" color={Colors.disable} size={20} />
              <Text style={[style.txt1, { color: theme.txt, paddingLeft: 2 }]}>
                15 minutes
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                paddingLeft: 20,
                alignItems: "center",
              }}
            >
              <Icons name="video-outline" color={Colors.disable} size={20} />
              <Text style={[style.txt1, { color: theme.txt, paddingLeft: 2 }]}>
                1/9 Steps video
              </Text>
            </View>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text
              style={{
                fontSize: 40,
                color: theme.txt,
                textAlign: "center",
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              09:47
            </Text>
          </View>
          <View
            style={{
              paddingTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[style.txt1, { color: Colors.disable, fontSize: 20 }]}>
              Back
            </Text>
            <Avatar.Icon
              icon="pause"
              style={{ backgroundColor: Colors.primary, marginHorizontal: 20 }}
              color="white"
              size={50}
            />
            <Text style={[style.txt1, { color: Colors.disable, fontSize: 20 }]}>
              Next
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
