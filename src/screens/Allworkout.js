import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ImageBackground,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import style from "../theme/style";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import Icons from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import QuestionHeight from "./FriendProfile";
// import {Avatar,Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Allworkout() {
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
      <AppBar
        color={theme.bg}
        title="All Workout"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.navigate("Workout")}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: Colors.secondary, marginLeft: 20 }}
              color="black"
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={[style.inputContainer, { backgroundColor: theme.bg }]}>
            <Icons name="search" size={20} color={Colors.disable} />
            <TextInput
              placeholder="Search..."
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
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

          <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Workoutdetail")}
              >
                <View>
                  <ImageBackground
                    // source={require("../../assets/image/workout1.png")}
                    resizeMode="stretch"
                    style={{ width: width / 2.4, height: height / 6 }}
                  >
                    <View style={{ flexDirection: "row", margin: 10 }}>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(00, 00, 00, 0.4)",
                          }}
                        >
                          Things
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 5,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(10, 00, 00, 0.4)",
                          }}
                        >
                          Legs
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  color: theme.txt,
                }}
              >
                Up and Down Stairs
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                Train your thighs and legs
              </Text>
            </View>

            <View style={{ padding: 10 }}></View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Workoutdetail")}
              >
                <View>
                  <ImageBackground
                    // source={require("../../assets/image/workout2.png")}
                    resizeMode="stretch"
                    style={{ width: width / 2.4, height: height / 6 }}
                  >
                    <View style={{ flexDirection: "row", margin: 10 }}>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(00, 00, 00, 0.4)",
                          }}
                        >
                          Stomach
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 5,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(10, 00, 00, 0.4)",
                          }}
                        >
                          Hand
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  color: theme.txt,
                }}
              >
                Lifting Belly
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                Shape the stomach to loo...
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Workoutdetail")}
              >
                <View>
                  <ImageBackground
                    // source={require("../../assets/image/workout3.png")}
                    resizeMode="stretch"
                    style={{ width: width / 2.4, height: height / 6 }}
                  >
                    <View style={{ flexDirection: "row", margin: 10 }}>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(00, 00, 00, 0.4)",
                          }}
                        >
                          Things
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 5,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(10, 00, 00, 0.4)",
                          }}
                        >
                          Legs
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  color: theme.txt,
                }}
              >
                Up and Down Stairs
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                Train your thighs and legs
              </Text>
            </View>
            <View style={{ padding: 10 }}></View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Workoutdetail")}
              >
                <View>
                  <ImageBackground
                    // source={require("../../assets/image/workout4.png")}
                    resizeMode="stretch"
                    style={{ width: width / 2.4, height: height / 6 }}
                  >
                    <View style={{ flexDirection: "row", margin: 10 }}>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(00, 00, 00, 0.4)",
                          }}
                        >
                          Stomach
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 5,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(10, 00, 00, 0.4)",
                          }}
                        >
                          Hand
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  color: theme.txt,
                }}
              >
                Lifting Belly
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                Shape the stomach to loo...
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row", marginVertical: 20 }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Workoutdetail")}
              >
                <View>
                  <ImageBackground
                    // source={require("../../assets/image/workout5.png")}
                    resizeMode="stretch"
                    style={{ width: width / 2.4, height: height / 6 }}
                  >
                    <View style={{ flexDirection: "row", margin: 10 }}>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(00, 00, 00, 0.4)",
                          }}
                        >
                          Things
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 5,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(10, 00, 00, 0.4)",
                          }}
                        >
                          Legs
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  color: theme.txt,
                }}
              >
                Up and Down Stairs
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                Train your thighs and legs
              </Text>
            </View>
            <View style={{ padding: 10 }}></View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Workoutdetail")}
              >
                <View>
                  <ImageBackground
                    // source={require("../../assets/image/workout6.png")}
                    resizeMode="stretch"
                    style={{ width: width / 2.4, height: height / 6 }}
                  >
                    <View style={{ flexDirection: "row", margin: 10 }}>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(00, 00, 00, 0.4)",
                          }}
                        >
                          Stomach
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 5,
                            color: Colors.secondary,
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Plus Jakarta Sans",
                            borderRadius: 10,
                            backgroundColor: "rgba(10, 00, 00, 0.4)",
                          }}
                        >
                          Hand
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  color: theme.txt,
                }}
              >
                Lifting Belly
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                Shape the stomach to loo...
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
