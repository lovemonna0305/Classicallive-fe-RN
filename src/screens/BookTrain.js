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
import { useNavigation } from "@react-navigation/native";

export default function BookTrain() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={"black"}
          title="Schedule sessions"
          titleStyle={{ color: "black", fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
          centerTitle={false}
          elevation={0}
          style={{ backgroundColor: "transparent", marginTop: 20 }}
          leading={
            <TouchableOpacity
              onPress={() => navigation.navigate("Gymintroduction")}
            >
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: "transparent" }}
                color="black"
                size={40}
              />
            </TouchableOpacity>
          }
        />
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
          }}>
            <View style={{
              margin: 20
            }}>

              <Text
                style={{
                  color: theme.txt,
                  fontWeight: "500",
                  fontFamily: "Plus Jakarta Sans",
                  marginTop: 20,
                  fontSize: 12
                }}
              >
                Name
              </Text>
              <View style={{ paddingTop: 8 }}>
                <TextInput
                  placeholder="Steve Harris"
                  selectionColor={Colors.primary}
                  placeholderTextColor={Colors.disable}
                  style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                  onChangeText={(e) => setValues({ ...values, firstname: e })}
                />
              </View>
              <View style={{ paddingTop: 15 }}>
                <Text
                  style={{
                    color: theme.txt,
                    fontWeight: "500",
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 12
                  }}
                >
                  Phone Number
                </Text>
                <View style={{ paddingTop: 8 }}>
                  <TextInput
                    placeholder="+264125486"
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                    onChangeText={(e) => setValues({ ...values, lastname: e })}
                  />
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <Text
                  style={{
                    color: theme.txt,
                    fontWeight: "500",
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 12
                  }}
                >
                  Age
                </Text>
                <View style={{ paddingTop: 8 }}>
                  <TextInput
                    placeholder="34"
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                    onChangeText={(e) => setValues({ ...values, lastname: e })}
                  />
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <Text
                  style={{
                    fontWeight: "500",
                    color: theme.txt,
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 12
                  }}
                >
                  Address
                </Text>
                <View style={{ paddingTop: 8 }}>
                  <TextInput
                    placeholder="Logas"
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                    onChangeText={(e) => setValues({ ...values, lastname: e })}
                  />
                </View>
              </View>

              <View style={{ padding: 5, flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1, padding: 5 }}>
                  <Text
                    style={{
                      color: theme.txt,
                      fontWeight: "500",
                      paddingVertical: 5,
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    From
                  </Text>
                  <View style={{ paddingTop: 8 }}>
                    <TextInput
                      placeholder="DD/MM/YY"
                      selectionColor={Colors.primary}
                      placeholderTextColor={Colors.disable}
                      style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                      onChangeText={(e) => setValues({ ...values, lastname: e })}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, padding: 5 }}>
                  <Text
                    style={{
                      color: theme.txt,
                      fontWeight: "500",
                      paddingVertical: 5,
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    To
                  </Text>
                  <View style={{ paddingTop: 8 }}>
                    <TextInput
                      placeholder="DD/MM/YY"
                      selectionColor={Colors.primary}
                      placeholderTextColor={Colors.disable}
                      style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                      onChangeText={(e) => setValues({ ...values, lastname: e })}
                    />
                  </View>
                </View>
              </View>
              <View style={{ paddingTop: 15 }}>
                <Text
                  style={{
                    fontWeight: "500",
                    color: theme.txt,
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 12
                  }}
                >
                  Type of exercise
                </Text>
                <View style={{ paddingTop: 8 }}>
                  <TextInput
                    placeholder="Yoga"
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                    onChangeText={(e) => setValues({ ...values, lastname: e })}
                  />
                </View>
              </View>
              <View style={{ paddingTop: 15 }}>
                <Text
                  style={{
                    fontWeight: "500",
                    color: theme.txt,
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 12
                  }}
                >
                  Coach name
                </Text>
                <View style={{ paddingTop: 8 }}>
                  <TextInput
                    placeholder="Willman Banks"
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                    onChangeText={(e) => setValues({ ...values, lastname: e })}
                  />
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: "row", marginTop: 20 }}>
                <View style={{ width: "30%" }}>
                  <TouchableOpacity
                    style={[
                      style.btn1,
                      {
                        borderColor: "#4A6C00",
                        borderWidth: 1,
                        backgroundColor: "#4A6C00",
                      },
                    ]}
                  >
                    <Text style={[{ color: "white" }]}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "30%" }}>
                  <TouchableOpacity
                    style={[
                      style.btn1,
                      {
                        borderColor: theme.txt,
                        borderWidth: 1,
                        backgroundColor: theme.bg,
                      },
                    ]}
                  >
                    <Text style={[{ color: theme.txt }]}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
