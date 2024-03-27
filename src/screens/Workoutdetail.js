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
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import themeContext from "../theme/themeContex";
import { SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Workoutdetail() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true}/> */}
      <StatusBar backgroundColor={"transparent"} translucent={true} />

      <ImageBackground
        // source={require("../../assets/image/workoutdetail.png")}
        style={{ height: height / 1.5, width: width }}
      >
        <ImageBackground
          // source={require("../../assets/image/transparentworkoutdetail.png")}
          style={{ height: height / 1.5, width: width }}
        >
          <AppBar
            style={{ backgroundColor: "transparent" }}
            title="Workout Detail"
            titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
            centerTitle={true}
            elevation={0}
            leading={
              <TouchableOpacity
                onPress={() => navigation.navigate("Allworkout")}
              >
                <Avatar.Icon
                  icon="arrow-left"
                  style={{ backgroundColor: Colors.secondary, marginLeft: 20 }}
                  color="black"
                  size={40}
                />
              </TouchableOpacity>
            }
          />
        </ImageBackground>
      </ImageBackground>
      <ScrollView style={{ marginTop: -200 }}>
        <View
          style={{
            backgroundColor: theme.bg,
            height: height,
            paddingHorizontal: 20,
          }}
        >
          <Text style={[style.subtitle, { color: theme.txt, paddingTop: 20 }]}>
            Up and Down Stairs
          </Text>
          <View
            style={{
              paddingTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: theme.box,
                  height: 35,
                  width: 35,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icons name="alarm" color={theme.txt} size={20} />
              </View>
              <Text
                style={[style.txt1, { color: Colors.disable, marginLeft: 5 }]}
              >
                59 minutes
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: theme.box,
                  height: 35,
                  width: 35,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icons name="video-outline" color={theme.txt} size={20} />
              </View>
              <Text
                style={[style.txt1, { color: Colors.disable, marginLeft: 5 }]}
              >
                59 minutes
              </Text>
            </View>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text
              style={{
                fontSize: 16,
                color: theme.txt,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              120+ People have joined
            </Text>
          </View>
          <View
            style={{
              paddingTop: 15,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ScrollView
              nestedScrollEnabled={true}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("UserJProfile")}
              >
                <Avatar.Image
                  // source={require("../../assets/image/wod1.png")}
                  size={50}
                />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 7 }}></View>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserJProfile")}
              >
                <Avatar.Image
                  // source={require("../../assets/image/wod2.png")}
                  size={50}
                />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 7 }}></View>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserJProfile")}
              >
                <Avatar.Image
                  // source={require("../../assets/image/wod3.png")}
                  size={50}
                />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 7 }}></View>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserJProfile")}
              >
                <Avatar.Image
                  // source={require("../../assets/image/wod4.png")}
                  size={50}
                />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 7 }}></View>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserJProfile")}
              >
                <Avatar.Image
                  // source={require("../../assets/image/wod5.png")}
                  size={50}
                />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 7 }}></View>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserJProfile")}
              >
                <Avatar.Image
                  // source={require("../../assets/image/wod6.png")}
                  size={50}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={[style.subtitle, { color: theme.txt }]}>
              Description
            </Text>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, fontSize: 14, lineHeight: 25 },
              ]}
            >
              Lorem Ipsum is simply dummy text of the printing
            </Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, fontSize: 14, lineHeight: 25 },
              ]}
            >
              and typesetting industry. Lorem Ipsum has been
            </Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, fontSize: 14, lineHeight: 25 },
              ]}
            >
              the industry's standard dummy text ever since
            </Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, fontSize: 14, lineHeight: 25 },
              ]}
            >
              the 1500s. When an unkown printer took a galley
            </Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, fontSize: 14, lineHeight: 25 },
              ]}
            >
              of type and scrambled it to make a type.
            </Text>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={[style.subtitle, { color: theme.txt }]}>
              List Videos
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              // source={require("../../assets/image/legstretch.png")}
              style={{
                height: height / 9,
                width: width / 5,
              }}
              resizeMode="stretch"
            />
            <View style={{ paddingHorizontal: 10, marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: theme.txt,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  marginBottom: 5,
                }}
              >
                Doing leg stretch
              </Text>
              <Text style={[style.subtxt]}>Finish this exercise in 15</Text>
              <Text style={[style.subtxt]}>minutes</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("PlayWorkout")}
              style={{ flex: 1, justifyContent: "flex-end" }}
            >
              <Avatar.Icon
                icon="chevron-right"
                style={{
                  backgroundColor: theme.bg,
                  alignSelf: "center",
                  // borderColor: '#E3E7EC',
                  borderWidth: 1,
                  marginHorizontal: 20,
                  borderTopColor: "#E3E7EC",
                  borderLeftColor: "#E3E7EC",
                  borderBottomColor: "#FE970F",
                  borderRightColor: "#FE970F",
                }}
                color={theme.txt}
                size={40}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              // source={require("../../assets/image/liftingbelly.png")}
              style={{
                height: height / 9,
                width: width / 5,
              }}
              resizeMode="stretch"
            />
            <View style={{ paddingHorizontal: 10, marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: theme.txt,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  marginBottom: 5,
                }}
              >
                Lifting Belly
              </Text>
              <Text style={[style.subtxt]}>Finish this exercise in 15</Text>
              <Text style={[style.subtxt]}>minutes</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Avatar.Icon
                icon="chevron-right"
                style={{
                  backgroundColor: theme.bg,
                  alignSelf: "center",
                  borderColor: "#E3E7EC",
                  borderWidth: 1,
                  marginHorizontal: 20,
                }}
                color={theme.txt}
                size={40}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              // source={require("../../assets/image/highjump.png")}
              style={{
                height: height / 9,
                width: width / 5,
              }}
              resizeMode="stretch"
            />
            <View style={{ paddingHorizontal: 10, marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: theme.txt,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  marginBottom: 5,
                }}
              >
                High Jump
              </Text>
              <Text style={[style.subtxt]}>Finish this exercise in 15</Text>
              <Text style={[style.subtxt]}>minutes</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Avatar.Icon
                icon="chevron-right"
                style={{
                  backgroundColor: theme.bg,
                  alignSelf: "center",
                  borderColor: "#E3E7EC",
                  borderWidth: 1,
                  marginHorizontal: 20,
                }}
                color={theme.txt}
                size={40}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
