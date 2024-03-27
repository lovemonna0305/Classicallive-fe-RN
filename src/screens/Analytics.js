import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import React, { useState, useContext, useEffect } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";

import { useSelector } from "react-redux";
import { Card } from 'react-native-paper';
import { Avatar } from "react-native-paper";
import Dropdown from '../components/SelectDropdown'

export default function Analytics() {
  const theme = useContext(themeContext);
  const [role, setRole] = useState("professional");
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleValueChange = (value) => {
    setSelectedValue(value);
  };
  const handleSave = async () => {
    await store.dispatch(updateUser(user._id, { role }));
    navigation.navigate("Language");
  };

  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    textalign: {
      textAlign: "right"
    },
    text1: {
      fontSize: 20,
      fontSize: 48,
      fontWeight: 700,
      color: "#4A6C00",
      paddingLeft: 20,
      display: "flex"
    },
    outcardtxt: {
      fontFamily: "Poppins",
      color: "#4D4D4D",
      fontSize: 14,
      fontWeight: 400,
      paddingTop: 0,
      paddingLeft: 15
    },
    text2: {
      fontSize: 16,
      paddingTop: 20,
      fontWeight: 500
    },
    viewstyle: {
      flex: 1,
      paddingTop: 20,
      display: "flex",
      backgroundColor: "#F7F6F6",
    },
    btn: {
      fontSize: 10,
      fontWeight: 500,
      backgroundColor: "#4A6C00",
      borderRadius: 8
    },
    container: {
      borderWidth: 1,
      borderColor: '#4A6C00',
      borderRadius: 5,
      padding: 5,
      marginBottom: 5
      // flex:1,
      // justifyContent:"center",
      // alignItems:"center"
    },
  });
  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 50 }]}
    >
      <AppBar
        color={theme.bg}
        title="Analytics"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans",fontSize:30,fontWeight:700,fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        style={{ backgroundColor: "#FFFFFF" }}
        leading={
          <TouchableOpacity
            onPress={() => navigation.navigate("Homepage")}
          >
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: "#FFFFFF" }}
              color="black"
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[style.main, { backgroundColor: theme.bg }]}>
          {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
          {/* <View>
            <Text style={[style.title1, { color: theme.txt }]}>Analytics</Text>
          </View> */}

          <Card style={{ marginTop: 5, marginLeft: 0 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Text style={style.welcometxt}>Your Tokens</Text>
              <View style={styles.row}>
                <Text style={styles.text1}>32 </Text>
                <Text style={styles.text2}>Tokens left</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Yourwallet")}
                style={[style.cardbtn, { backgroundColor: Colors.btn }]}
              >
                <Text style={style.cardbtntxt}>Buy Token</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          <Card style={{ marginTop: 5, marginLeft: 0 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Text style={style.welcometxt}>Gym attendance</Text>
              <Text style={style.welcometxt}>Filter</Text>
              <Image
                // source={require('../../assets/image/demochart.jpg')}
                style={{ width: 300, height: 170 }}
              />
            </Card.Content>
          </Card>

          <Card style={{ marginTop: 5, marginLeft: 0 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Text style={[style.welcometxt, { fontWeight: 700, textAlign: "center" }]}>Current schedules</Text>
              <View style={[styles.row, styles.container]}>
                <Image
                  // source={require('../../assets/image/useravatar.jpg')}
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: "#3F3F3F", fontSize: 14 }}>Training with personal coach</Text>
                  <Text style={{ color: "#4A6C00", fontSize: 12 }} >Coach Tim from Hufit</Text>
                  <View style={styles.row}>
                    <Icon
                      name={'location'}
                      color={"#4A6C00"}
                      size={15}
                    />
                    <Text style={{ color: "#3F3F3F", fontSize: 12 }} >12 streets</Text>
                    <Icon
                      name={'time-outline'}
                      color={"#4A6C00"}
                      size={15}
                    />
                    <Text style={{ color: "#3F3F3F", fontSize: 12 }} >12 streets</Text>
                  </View>

                </View>
              </View>
              <View style={[styles.row, styles.container]}>
                <Image
                  // source={require('../../assets/image/useravatar.jpg')}
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: "#3F3F3F", fontSize: 14 }}>Training with personal coach</Text>
                  <Text style={{ color: "#4A6C00", fontSize: 12 }} >Coach Tim from Hufit</Text>
                  <View style={styles.row}>
                    <Icon
                      name={'location'}
                      color={"#4A6C00"}
                      size={15}
                    />
                    <Text style={{ color: "#3F3F3F", fontSize: 12 }} >12 streets</Text>
                    <Icon
                      name={'time-outline'}
                      color={"#4A6C00"}
                      size={15}
                    />
                    <Text style={{ color: "#3F3F3F", fontSize: 12 }} >12 streets</Text>
                  </View>

                </View>
              </View>
              <View style={[styles.row, styles.container]}>
                <Image
                  // source={require('../../assets/image/useravatar.jpg')}
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: "#3F3F3F", fontSize: 14 }}>Training with personal coach</Text>
                  <Text style={{ color: "#4A6C00", fontSize: 12 }} >Coach Tim from Hufit</Text>
                  <View style={styles.row}>
                    <Icon
                      name={'location'}
                      color={"#4A6C00"}
                      size={15}
                    />
                    <Text style={{ color: "#3F3F3F", fontSize: 12 }} >12 streets</Text>
                    <Icon
                      name={'time-outline'}
                      color={"#4A6C00"}
                      size={15}
                    />
                    <Text style={{ color: "#3F3F3F", fontSize: 12 }} >12 streets</Text>
                  </View>

                </View>
              </View>
              <View style={[styles.row, styles.container]}>
                <Image
                  // source={require('../../assets/image/useravatar.jpg')}
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: "#3F3F3F", fontSize: 14 }}>Training with personal coach</Text>
                  <Text style={{ color: "#4A6C00", fontSize: 12 }} >Coach Tim from Hufit</Text>
                  <View style={styles.row}>
                    <Icon
                      name={'location'}
                      color={"#4A6C00"}
                      size={15}
                    />
                    <Text style={{ color: "#3F3F3F", fontSize: 12 }} >12 streets</Text>
                    <Icon
                      name={'time-outline'}
                      color={"#4A6C00"}
                      size={15}
                    />
                    <Text style={{ color: "#3F3F3F", fontSize: 12 }} >12 streets</Text>
                  </View>

                </View>
              </View>
              <View style={[{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                <Icon
                  name={'add-outline'}
                  color={"#4A6C00"}
                  size={19}
                />
                <Text style={[style.welcometxt, { color: "#676767", fontWeight: 700, textAlign: "center", fontSize: 14 }]}>Add schedule</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={{ marginTop: 5, marginLeft: 0 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Text style={[style.welcometxt, { fontWeight: 700, textAlign: "center" }]}>Exercise analytics</Text>
              <View style={[styles.container]}>
                <View style={styles.row}>
                  <Image
                    // source={require('../../assets/image/analysis.jpg')}
                    style={{ width: 60, height: 60, borderRadius: 7 }}
                  />
                  <View style={{ marginLeft: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 600 }}>Hufit</Text>
                    <Text style={{ color: "#373737", fontSize: 12, lineHeight: 20 }} >Attend on 3rd Aug</Text>
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={[style.welcometxt, { fontWeight: 500, textAlign: "left" }]}>Your activity</Text>
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                    <Text style={{ fontSize: 12 }}>Swimming pool</Text>
                    <Text style={{ fontSize: 12 }} >Yoga</Text>
                    <Text style={{ fontSize: 12 }}>Coach</Text>
                  </View>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Text style={{ fontSize: 15, fontWeight: 500, marginLeft: 10 }}>Analytics</Text>
                  <Image
                    // source={require('../../assets/image/analysischart.jpg')}
                    style={{ width: 280, height: 200, borderRadius: 7 }}
                  />
                </View>
              </View>

            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}
