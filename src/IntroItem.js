import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import style from "./theme/style";
import Slides from "./Slides";
import { Colors } from "./theme/color";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
import { useTranslation } from 'react-i18next';

export default function IntroItem({ item }) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ width: width }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={{ flex: 2 }}>
        <Image
          source={item.bg}
          style={{ width: width, height: height*1.2 }}
          resizeMode="stretch"
        ></Image>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.footbackground,
          paddingHorizontal: 18,
          paddingTop:40,
          paddingLeft: 30,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          paddingBottom: 90,
        }}
      >
        <Text style={[style.introtext,{color:Colors.btn}]}>{t(item.title1)}</Text>
        {/* <Text style={[style.introtext]}>{t(item.title2)}</Text> */}
        <View style={{ paddingTop: 15 }}>
          <Text style={[style.txt]}>{t(item.subtitle)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
