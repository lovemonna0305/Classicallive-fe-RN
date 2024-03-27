import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function MessageN() {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="Notification"
          titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingTop: 20 }}>
            <Text style={[style.subtitle, { color: theme.txt }]}>Today</Text>
          </View>
          <View style={{ paddingTop: 20, flexDirection: "row" }}>
            <Avatar.Icon
              icon="bell-outline"
              color={Colors.btn}
              size={30}
              style={{ backgroundColor: Colors.secondary }}
            />
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={[style.txt, { color: theme.txt }]}>
                Edward lecky successfully completed leg training
              </Text>
              {/* <Text style={[style.txt,{color:theme.txt}]}></Text> */}
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                2 hours Ago
              </Text>
            </View>
          </View>
          <View style={{ paddingTop: 20, flexDirection: "row" }}>
            <Avatar.Icon
              icon="calendar-month"
              color={Colors.btn}
              size={30}
              style={{ backgroundColor: Colors.secondary }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={[style.txt, { color: theme.txt }]}>
                Classicallive added a new training entitled "Easy to tighten abdominal
                muscles"
              </Text>
              {/* <Text style={[style.txt,{color:theme.txt,}]}></Text> */}
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                3 hours Ago
              </Text>
            </View>
          </View>
          <View style={{ paddingTop: 20, flexDirection: "row" }}>
            <Avatar.Icon
              icon="bell-outline"
              color={Colors.btn}
              size={30}
              style={{ backgroundColor: Colors.secondary }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={[style.txt, { color: theme.txt }]}>
                Jaden successfully completed hands training
              </Text>
              {/* <Text style={[style.txt,{color:theme.txt}]}></Text> */}
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                2 hours Ago
              </Text>
            </View>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text style={[style.subtitle, { color: theme.txt }]}>
              A week ago
            </Text>
          </View>
          <View style={{ paddingTop: 20, flexDirection: "row" }}>
            <Avatar.Icon
              icon="calendar-month"
              color={Colors.btn}
              size={30}
              style={{ backgroundColor: Colors.secondary }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={[style.txt, { color: theme.txt }]}>
                Classicallive added a new training entitled "Easy to tighten abdominal
                muscles"
              </Text>
              {/* <Text style={[style.txt,{color:theme.txt,}]}></Text> */}
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                3 hours Ago
              </Text>
            </View>
          </View>
          <View style={{ paddingTop: 20, flexDirection: "row" }}>
            <Avatar.Icon
              icon="calendar-month"
              color={Colors.btn}
              size={30}
              style={{ backgroundColor: Colors.secondary }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={[style.txt, { color: theme.txt }]}>
                Classicallive added a new training entitled "how to run like in the
                olympics"
              </Text>
              {/* <Text style={[style.txt,{color:theme.txt,}]}></Text> */}
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.disable,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                5 hours Ago
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
