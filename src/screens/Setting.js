import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Swiper from 'react-native-swiper';
import React, { useState, useContext, useEffect } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { Colors } from "../theme/color";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import style from "../theme/style";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../actions/auth";
import { useStore } from "../store/store";

export default function Setting() {
  const {changeStore} = useStore();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { isLoading, error, message } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth);



  const handlelogout = async () => {
    console.log('logout');
    // await store.dispatch(logout());
    await changeStore({
      isLoggedin:false,
      showSplashScreen:true,
      role: ''});
    navigation.navigate("Login")
  }


  const styles = StyleSheet.create({
    wrapper: { height: 370 },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 90,
      height: 90,

    },
    imagecontainer: {

    },
    borderstyle: {
      flex: 1,
      flexDirection: "row",
      paddingHorizontal: 20,
      borderBottomColor: "#ECECEC",
      borderBottomWidth: 1,
      padding: 20
    }
  });


  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: "#F7F6f6", paddingTop: 40 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}

      <AppBar
        color={theme.bg}
        title="Setting"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        style={{ backgroundColor: "#F7F6f6", marginBottom: 30 }}
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


      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginHorizontal: 20, backgroundColor: "#F7F6f6" }}>
          <View style={{ flex: 5, backgroundColor: "#FFFFFF", borderRadius: 10, flexDirection: "column", }}>
            <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
              {/* <Image source={require('../../assets/image/settingavatar.png')}
                style={styles.image}> */}
              {/* </Image> */}
              <Text style={{ fontSize: 18, fontWeight: 700 }}>Sam</Text>
            </View>
            <View style={{ padding: 20, marginBottom: 200 }}>
              <TouchableOpacity onPress={() => { navigation.navigate("AccountProfile") }}>
                <View style={styles.borderstyle}>
                  <Icon name='person-outline' size={20}></Icon>
                  <Text style={{ fontSize: 15, marginLeft: 30, fontWeight: 600 }}>Account Detail</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("AccountProfile") }}>
                <View style={styles.borderstyle}>
                  <Icon name='settings-outline' size={20}></Icon>
                  <Text style={{ fontSize: 15, marginLeft: 30, fontWeight: 600 }}>Settings</Text>
                </View>
              </TouchableOpacity>

            </View>

            <View style={{ flex: 2, flexDirection: 'column' }}>
              <View style={{ padding: 30, }}>
                <TouchableOpacity
                  style={[
                    style.btn1,
                    {
                      backgroundColor: "#4A6C00",
                    },
                  ]}
                  onPress={() => handlelogout()}
                >
                  <Text style={[style.btntxt1, { color: 'white', textAlign: 'center' }]}>
                    Log out
                  </Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", color: "red", fontSize: 17, marginTop: 20, fontWeight: 700 }}>Delete Account</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
