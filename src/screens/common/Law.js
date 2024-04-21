import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,

} from "react-native";
import React, { useState, useContext } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { Colors } from "../../theme/color";
import themeContext from "../../theme/themeContex";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import { t } from "i18next";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Law() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);



  const lawString = `
  <div style="font-size: 30px; color: ${theme.txt}">
  クラシック音楽のライブ配信アプリケーション「Classical LIVE」（以下「本アプリ」といいます）を運営する者（以下「運営者」といいます）は、本アプリのユーザー（演奏ユーザーと視聴ユーザーのいずれも含みます）及びユーザー登録希望者（以下「ユーザー等」といいます）の個人情報保護の重要性について認識し、個人情報の保護に関する法律（以下「個人情報保護法」といいます）を遵守すると共に、以下のプライバシーポリシー（以下「本プライバシーポリシー」といいます）に従い、適切な取扱い及び保護に努めます。
</div>

        `;

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title={t('law')}
          titleStyle={{ color: theme.txt }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: theme.bg }}
                color={theme.txt}
                size={40}
              />
            </TouchableOpacity>
          }
        />
          <View style={{ marginVertical: 20, flex:1}}>
            <WebView originWhitelist={['*']} source={{ html: lawString }} style={{ flex: 1,  backgroundColor: theme.bg, fontweight: 'bold', fontsize: 20 }} />
          </View>
      </View>
    </SafeAreaView>
  );
}
