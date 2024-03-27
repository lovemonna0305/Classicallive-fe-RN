import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import style from "../theme/style";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import QuestionHeight from "./FriendProfile";
import { useNavigation } from "@react-navigation/native";
import { getProfile, getUser } from "../actions/auth";
import Gymcoachslider from "../components/Gymcoachslider"

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Gymintroduction() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const { profile, user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   store.dispatch(getUser(user._id));
  //   store.dispatch(getProfile(user.profile));
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"transparent"} translucent={true} />
      <ScrollView >
        <View style={{ height: 150 }}>
          <ImageBackground
            // source={require("../../assets/image/gymheader.png")}
            style={{ flex: 1 }}
          >
            <AppBar
              color={"white"}
              title="Hufit"
              titleStyle={{ color: "white", fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
              centerTitle={false}
              elevation={0}
              style={{ backgroundColor: "transparent", marginTop: 20 }}
              leading={
                <TouchableOpacity
                  onPress={() => navigation.navigate("Homepage")}
                >
                  <Avatar.Icon
                    icon="arrow-left"
                    style={{ backgroundColor: "transparent" }}
                    color="white"
                    size={40}
                  />
                </TouchableOpacity>
              }
            />
          </ImageBackground>
        </View>
        <View style={{ marginTop: 30, padding: 20 }}>
          <View style={{ display: "flex", alignItems: "center" }}>
            {/* <Image source={require('../../assets/image/gym1.png')}></Image> */}
          </View>
          <View style={{ display: 'flex', flexDirection: "row", marginTop: 20 }}>
            <Icon name="location-outline" size={20} style={{ color: "#4A6C00", marginRight: 10 }}></Icon>
            <Text>Mr John Smith. 132, My Street, Kingston, New York 12401</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: "row", marginTop: 10 }}>
            <Icon name="mail-outline" size={20} style={{ color: "#4A6C00", marginRight: 10 }}></Icon>
            <Text>hufit@gmail.com</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "#4A6C00", marginBottom: 8 }}>Facilities and Equipment</Text>
            <Text style={{ lineHeight: 20 }}>Cardio equipment (treadmills, stationary bikes, etc.)
              Weightlifting equipment (dumbbells, barbells, machines)
              Group exercise rooms
              Swimming pool
              Sauna, steam room, or spa facilities
              Indoor/outdoor tracks</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "#4A6C00", marginBottom: 8 }}>Classes and Programs</Text>
            <Text style={{ lineHeight: 20 }}>Yoga, Pilates, HIIT, CrossFit, Zumba, etc.
            </Text>
            <Text style={{ lineHeight: 20 }}>
              Personal training availability
            </Text>
            <Text style={{ lineHeight: 20 }}>
              Bootcamps or specialized workshops
            </Text>
            <Text style={{ lineHeight: 20 }}>
              Cycling classes or spin rooms
            </Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "#4A6C00", marginBottom: 8 }}>Our coaches</Text>
            <Gymcoachslider />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
