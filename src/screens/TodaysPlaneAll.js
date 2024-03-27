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

export default function TodaysPlaneAll() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 10 }]}
    >
      {/* <StatusBar backgroundColor={theme=='light'? '#000':'#fff'} 
        barStyle={theme=='light' ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="All Today's Plane"
          titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity
              onPress={() => navigation.navigate("PlaneDetail")}
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
        <View
          style={{
            paddingTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={[style.subtitle, { color: theme.txt }]}>12</Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, paddingVertical: 5 },
              ]}
            >
              Mon
            </Text>
          </View>
          <View>
            <Text style={[style.subtitle, { color: theme.txt }]}>13</Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, paddingVertical: 5 },
              ]}
            >
              Tue
            </Text>
          </View>
          <View>
            <Text style={[style.subtitle, { color: theme.txt }]}>14</Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, paddingVertical: 5 },
              ]}
            >
              Wed
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.icon,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <Text style={[style.subtitle, { color: theme.bg }]}>15</Text>
            <Text style={[style.txt1, { color: theme.bg, paddingVertical: 5 }]}>
              Thr
            </Text>
          </View>
          <View>
            <Text style={[style.subtitle, { color: theme.txt }]}>16</Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, paddingVertical: 5 },
              ]}
            >
              Fri
            </Text>
          </View>
          <View>
            <Text style={[style.subtitle, { color: theme.txt }]}>17</Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, paddingVertical: 5 },
              ]}
            >
              Sat
            </Text>
          </View>
          <View>
            <Text style={[style.subtitle, { color: theme.txt }]}>18</Text>
            <Text
              style={[
                style.txt1,
                { color: Colors.disable, paddingVertical: 5 },
              ]}
            >
              Sun
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[style.subtitle, { color: theme.txt }]}>
            Build Leg Muscles
          </Text>
          <Icons name="square-edit-outline" color={theme.txt} size={25} />
        </View>
        <View style={{ paddingTop: 20 }}>
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
            the 1500s.
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    marginBottom: 5,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  Doing leg stretch
                </Text>
                <Text style={[style.subtxt]}>Finish this exercise in 15</Text>
                <Text style={[style.subtxt]}>minutes</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Avatar.Icon
                  icon="chevron-right"
                  style={{
                    backgroundColor: theme.bg,
                    alignSelf: "center",
                    borderColor: "#E3E7EC",
                    borderWidth: 1,
                    // marginHorizontal:20
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
                    marginBottom: 5,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  Lifting Belly
                </Text>
                <Text style={[style.subtxt]}>Finish this exercise in 15</Text>
                <Text style={[style.subtxt]}>minutes</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Avatar.Icon
                  icon="chevron-right"
                  style={{
                    backgroundColor: theme.bg,
                    alignSelf: "center",
                    borderColor: "#E3E7EC",
                    borderWidth: 1,
                    // marginHorizontal:20
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
                    marginBottom: 5,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  High Jump
                </Text>
                <Text style={[style.subtxt]}>Finish this exercise in 15</Text>
                <Text style={[style.subtxt]}>minutes</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Avatar.Icon
                  icon="chevron-right"
                  style={{
                    backgroundColor: theme.bg,
                    alignSelf: "center",
                    borderColor: "#E3E7EC",
                    borderWidth: 1,
                    // marginHorizontal:20
                  }}
                  color={theme.txt}
                  size={40}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
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
                    marginBottom: 5,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  Doing leg stretch
                </Text>
                <Text style={[style.subtxt]}>Finish this exercise in 15</Text>
                <Text style={[style.subtxt]}>minutes</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Avatar.Icon
                  icon="chevron-right"
                  style={{
                    backgroundColor: theme.bg,
                    alignSelf: "center",
                    borderColor: "#E3E7EC",
                    borderWidth: 1,
                    // marginHorizontal:20
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
                    marginBottom: 5,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  Lifting Belly
                </Text>
                <Text style={[style.subtxt]}>Finish this exercise in 15</Text>
                <Text style={[style.subtxt]}>minutes</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Avatar.Icon
                  icon="chevron-right"
                  style={{
                    backgroundColor: theme.bg,
                    alignSelf: "center",
                    borderColor: "#E3E7EC",
                    borderWidth: 1,
                    // marginHorizontal:20
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
                    marginBottom: 5,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  High Jump
                </Text>
                <Text style={[style.subtxt]}>Finish this exercise in 15</Text>
                <Text style={[style.subtxt]}>minutes</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Avatar.Icon
                  icon="chevron-right"
                  style={{
                    backgroundColor: theme.bg,
                    alignSelf: "center",
                    borderColor: "#E3E7EC",
                    borderWidth: 1,
                    // marginHorizontal:20
                  }}
                  color={theme.txt}
                  size={40}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
