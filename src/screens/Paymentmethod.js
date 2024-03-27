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
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { Card } from 'react-native-paper';
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Paymentmethod({ route, navigation }) {
  const theme = useContext(themeContext);
  const [checked, setChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      <AppBar
        color={theme.bg}
        title="Link your payment "
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        style={{ backgroundColor: "#FFFFFF", marginTop: 20 }}
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
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Text
            style={[
              style.title1,
              { color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 25 },
            ]}
          >
            Payment Method
          </Text>
          <View style={{
            backgroundColor: "#E8F6F7", padding: 10, borderRadius: 15, marginTop: 20, display: 'flex',
            justifyContent: "center", flexDirection: "column"
          }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Icon name="information-circle-sharp" size={25} style={{ marginRight: 5 }}></Icon>
              <Text
                style={{
                  color: theme.txt,
                  fontSize: 16,
                  fontFamily: "Plus Jakarta Sans",
                  textAlign: "center"
                }}
              >
                Something you need to know
              </Text>
            </View>
            <View>
              <Text style={{ textAlign: "center" }}>Detail</Text>
            </View>
          </View>
          <Card style={{ marginTop: 30 }}>
            <Card.Content style={{ backgroundColor: "#F8F8F8", borderRadius: 10 }}>
              <View style={{ display: "flex", flexDirection: "column", }}>
                <Text
                  style={{
                    color: theme.txt,
                    fontWeight: "500",
                    fontFamily: "Plus Jakarta Sans",
                    marginTop: 20,
                    fontSize: 14
                  }}
                >
                  Card Number
                </Text>
                <View style={{ paddingTop: 8 }}>
                  <TextInput
                    placeholder="•••• •••• •••• ••••"
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                    onChangeText={(e) => setValues({ ...values, firstname: e })}
                  />
                </View>
                <Text
                  style={{
                    color: theme.txt,
                    fontWeight: "500",
                    fontFamily: "Plus Jakarta Sans",
                    marginTop: 20,
                    fontSize: 14
                  }}
                >
                  Expire Date (MM/YY)
                </Text>
                <View style={{ paddingTop: 8 }}>
                  <TextInput
                    placeholder="MM/YY"
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                    onChangeText={(e) => setValues({ ...values, firstname: e })}
                  />
                </View>
                <Text
                  style={{
                    color: theme.txt,
                    fontWeight: "500",
                    fontFamily: "Plus Jakarta Sans",
                    marginTop: 20,
                    fontSize: 14
                  }}
                >
                  CVV (3 digits)
                </Text>
                <View style={{ paddingTop: 8 }}>
                  <TextInput
                    placeholder="••••"
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    style={[style.accsettingtxtbox, { backgroundColor: theme.bg }]}
                    onChangeText={(e) => setValues({ ...values, firstname: e })}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
          <Text style={{ fontSize: 14, fontWeight: 400, lineHeight: 24, color: "#3C4447", padding: 20 }}>Fine print:
            You can cancel your subscription at any time. By starting your free trial, you agree to our Terms of Service.
          </Text>
          <View style={{ padding: 50 }}>
            <TouchableOpacity
              style={[
                style.btn2,
              ]}
            >
              <Text style={[style.btntxt1, { color: "white", textAlign: "center" }]}>
                CTA
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
