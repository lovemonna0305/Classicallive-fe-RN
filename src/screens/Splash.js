import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from "react-native";
import React, { useState, useContext } from "react";
import style from "../theme/style";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import theme from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import logoimage from "../../assets/img/apple-icon.png";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Splash() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View
        // source={
        //   darkMode === true
        //     ? require("../../assets/img/onbor1.png")
        //     : require("../../assets/img/onbor1.png")
        // }
        style={{ flex: 1,backgroundColor:"#4A6C00", opacity: 0.6, }}
      >
        {/* <View source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
        </View> */}

        <View
          style={{ flex: 2.5, alignItems: "center", justifyContent: "center" }}
        >
          <Image source={logoimage}></Image>
          {/* <Image source={require('../../assets/image/gymflextext.png')}></Image> */}
        </View>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={50} color={Colors.secondary} />
        </View>
      </View>
    </SafeAreaView>
  );
}
