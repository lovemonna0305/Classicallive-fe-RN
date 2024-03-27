import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet
} from "react-native";
import React, { useState, useContext } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Card } from 'react-native-paper';
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";

export default function Yourwallet({ route, navigation }) {
  const theme = useContext(themeContext);
  const [gender, setGender] = useState("male");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F6f6" }}>
      <AppBar
        color={theme.bg}
        title="My Wallet"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        style={{ backgroundColor: "#F7F6f6", marginTop: 20 }}
        leading={
          <TouchableOpacity
            onPress={() => navigation.navigate("Homepage")}
          >
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: "#F7F6f6" }}
              color="black"
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={style.viewstyle}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Card style={{ margin: 15 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Text style={style.welcometxt}>Your coins</Text>
              <View style={[style.row, { flex: 1, flexDirection: "row", marginTop: 20 }]}>
                <View style={{ flex: 2, justifyContent: "center", flexDirection: "column" }}>
                  <Image  style={{
                    width: 70, height: 70
                  }} />
                </View>
                <View style={{ flex: 3, justifyContent: "flex-start", flexDirection: 'row' }}>
                  <Text style={style.text1}>32 </Text>
                  <Text style={[style.text2, { marginTop: 5 }]}>Tokens left</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={{ margin: 15 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <View style={[style.row, { flex: 1, flexDirection: "column", marginTop: 0 }]}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={style.firsttxt}>Recent activity</Text>
                  <Text style={style.secondtxt}>Show all</Text>
                </View>
                <View style={style.bottomlinestyle}>
                  <Text style={style.firsttxt}>Added 12 tokens</Text>
                  <Text style={style.secondtxt}>7 minutes ago</Text>
                </View>
                <View style={style.bottomlinestyle}>
                  <Text style={style.firsttxt}>Used 13 token at Hufit</Text>
                  <Text style={style.secondtxt}>Yesterday</Text>
                </View>
                <View style={style.bottomlinestyle}>
                  <Text style={style.firsttxt}>Added 12 tokens</Text>
                  <Text style={style.secondtxt}>7 minutes ago</Text>
                </View>
                <View style={style.bottomlinestyle}>
                  <Text style={style.firsttxt}>Scanned 13 token at Hufit</Text>
                  <Text style={style.secondtxt}>Yesterday</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={{ margin: 15 }}>
            <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
              <View style={[style.row, { flex: 1, flexDirection: "column", marginTop: 0 }]}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={style.firsttxt}>Purchage Tokens</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", marginTop: 30, justifyContent: "space-between" }}>
                  <Icon name="remove-outline" size={40} style={{ marginTop: 10 }}></Icon>
                  <TextInput placeholder="10" style={{ borderWidth: 2, height: 50, marginTop: 10, width: 50, fontSize: 30, padding: 5 }} />
                  <Icon name="add-outline" size={40} style={{ marginTop: 10 }}></Icon>
                  <Image 
                  // source={require('../../assets/image/gymflexlogo.png')} 
                  style={{
                    width: 70, height: 70
                  }} />
                </View>
                <View style={{ marginTop: 50 }}>
                  <TouchableOpacity
                    style={[
                      style.btn2,
                    ]}
                  >
                    <Text style={[style.btntxt1, { color: "white" }]}>
                      Buy Tokens
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
