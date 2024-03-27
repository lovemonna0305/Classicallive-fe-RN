import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { AppBar } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function User() {
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
      <StatusBar
        backgroundColor={darkMode === true ? "#000" : "#fff"}
        barStyle={darkMode === true ? "light-content" : "dark-content"}
        translucent={false}
      />
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="User Info"
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Icon name="arrow-back" color={theme.txt} size={30} />
            </TouchableOpacity>
          }
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingTop: 30,
              alignItems: "center",

              // height:'25%'
            }}
          >
            <Avatar.Image
              source={require("../../assets/img/user.png")}
              size={100}
              style={{ backgroundColor: Colors.secondary }}
            ></Avatar.Image>
            <View
              style={{
                position: "absolute",
                height: "30%",
                width: "20%",
                marginTop: 100,
                alignItems: "center",
                right: 105,
              }}
            >
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Avatar.Image
                  source={require("../../assets/img/edit.png")}
                  size={30}
                  style={{}}
                ></Avatar.Image>
                <Modal transparent={true} visible={visible}>
                  <View
                    style={{
                      width: width,
                      flex: 1,
                      backgroundColor: "#000000aa",
                      transparent: "true",
                    }}
                  >
                    <View
                      style={[
                        style.modalcontainer,
                        { backgroundColor: theme.bg, width: width - 20 },
                      ]}
                    >
                      <View
                        style={{ paddingHorizontal: 20, alignSelf: "flex-end" }}
                      >
                        <TouchableOpacity onPress={() => setVisible(false)}>
                          <Icon name="close-sharp" color="black" size={20} />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={[
                          style.title,
                          { color: theme.txt, alignSelf: "center" },
                        ]}
                      >
                        Change your picture
                      </Text>
                      <View
                        style={[
                          style.divider1,
                          { color: Colors.disable, marginBottom: 20 },
                        ]}
                      ></View>
                      <View
                        style={{
                          // paddingTop: 15 ,
                          paddingVertical: 15,
                          backgroundColor:
                            theme == "light" ? "#434E58" : "#E3E7EC",
                          borderRadius: 10,
                          paddingHorizontal: 20,
                          flexDirection: "row",
                        }}
                      >
                        <Icon name="camera" size={25} color={theme.txt} />
                        <Text
                          style={[
                            style.subtitle,
                            { color: theme.txt, paddingLeft: 15 },
                          ]}
                        >
                          Take a photo
                        </Text>
                      </View>
                      <View style={{ paddingTop: 15 }}>
                        <View
                          style={{
                            //  paddingTop: 15 ,
                            paddingVertical: 15,
                            backgroundColor:
                              theme == "light" ? "#4A4A65" : "#E3E7EC",
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            flexDirection: "row",
                          }}
                        >
                          <Icon
                            name="folder-open-outline"
                            size={25}
                            color={theme.txt}
                          />
                          <Text
                            style={[
                              style.subtitle,
                              { color: theme.txt, paddingLeft: 15 },
                            ]}
                          >
                            Choose from your file
                          </Text>
                        </View>
                      </View>
                      <View style={{ paddingTop: 15 }}>
                        <View
                          style={{
                            //  paddingTop: 15 ,
                            paddingVertical: 15,
                            backgroundColor:
                              theme == "light" ? "#434E58" : "#E3E7EC",
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            flexDirection: "row",
                          }}
                        >
                          <Icon name="trash" size={25} color="#FF4747" />
                          <Text
                            style={[
                              style.subtitle,
                              { color: "#FF4747", paddingLeft: 15 },
                            ]}
                          >
                            Delete Photo
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              color: theme.txt,
              fontWeight: "500",
              marginTop: 20,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            First Name
          </Text>
          <View style={{ paddingTop: 10 }}>
            <TextInput
              placeholder="Enter Your First Name"
              selectionColor={Colors.primary}
              placeholderTextColor={Colors.disable}
              style={[
                style.txtinput,
                { backgroundColor: theme.bg, fontFamily: "Plus Jakarta Sans" },
              ]}
            />
          </View>

          <Text
            style={{
              color: theme.txt,
              fontWeight: "500",
              marginTop: 20,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Last Name
          </Text>
          <View style={{ paddingTop: 10 }}>
            <TextInput
              placeholder="Enter Your Last Name"
              selectionColor={Colors.primary}
              placeholderTextColor={Colors.disable}
              style={[
                style.txtinput,
                { backgroundColor: theme.bg, fontFamily: "Plus Jakarta Sans" },
              ]}
            />
          </View>

          <Text
            style={{
              color: theme.txt,
              fontWeight: "500",
              marginTop: 20,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Email
          </Text>
          <View style={{ paddingTop: 10 }}>
            <TextInput
              placeholder="Enter Your Email Address"
              selectionColor={Colors.primary}
              placeholderTextColor={Colors.disable}
              style={[
                style.txtinput,
                { backgroundColor: theme.bg, fontFamily: "Plus Jakarta Sans" },
              ]}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View
              style={[
                style.radio,
                {
                  width: width / 2.4,
                  paddingVertical: 7,
                  flexDirection: "row",
                },
              ]}
            >
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
                color={Colors.primary}
              />
              <Text
                style={{
                  paddingTop: 8,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  color: theme.txt,
                }}
              >
                Male
              </Text>
            </View>
            <View style={{ margin: 10 }}></View>
            <View
              style={[
                style.radio,
                {
                  width: width / 2.4,
                  paddingVertical: 7,
                  flexDirection: "row",
                },
              ]}
            >
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
                color={Colors.primary}
              />
              <Text
                style={{
                  paddingTop: 8,
                  fontWeight: "600",
                  fontFamily: "Plus Jakarta Sans",
                  color: theme.txt,
                }}
              >
                Female
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: theme.txt,
              fontWeight: "500",
              marginTop: 20,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Location
          </Text>
          <View style={{ paddingTop: 10 }}>
            <TextInput
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              multiline={true}
              selectionColor={Colors.primary}
              placeholderTextColor={Colors.disable}
              style={[
                style.txtinput,
                {
                  backgroundColor: theme.bg,
                  height: 120,
                  textAlignVertical: "top",
                  fontFamily: "Plus Jakarta Sans",
                },
              ]}
            />
          </View>

          <View style={{ paddingVertical: 30 }}>
            <TouchableOpacity style={style.btn}>
              <Text style={style.btntxt}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
