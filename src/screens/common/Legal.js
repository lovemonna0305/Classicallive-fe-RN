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
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { Colors } from "../../theme/color";
import themeContext from "../../theme/themeContex";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";

export default function Legal() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,paddingTop: 30, }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="Legal and Policies"
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
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

        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{ marginVertical: 15 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
                color: theme.txt,
              }}
            >
              Terms
            </Text>
            <View style={{ marginVertical: 15 }}>
              <Text
                style={{
                  lineHeight: 20,
                  fontFamily: "Plus Jakarta Sans",
                  color: Colors.disable,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                ornare quam vel facilisis feugiat amet sagittis arcu, tortor.
                Sapien, consequat ultrices morbi orci semper sit nulla. Leo
                auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est
                id tincidunt fames.
              </Text>
              <Text
                style={{
                  lineHeight: 20,
                  fontFamily: "Plus Jakarta Sans",
                  color: Colors.disable,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                ornare quam vel facilisis feugiat amet sagittis arcu, tortor.
                Sapien, consequat ultrices morbi orci semper sit nulla. Leo
                auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est
                id tincidunt fames.
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
                color: theme.txt,
              }}
            >
              Changes to the Service and/or Terms:
            </Text>
            <View style={{ marginVertical: 15 }}>
              <Text
                style={{
                  lineHeight: 20,
                  fontFamily: "Plus Jakarta Sans",
                  color: Colors.disable,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                ornare quam vel facilisis feugiat amet sagittis arcu, tortor.
                Sapien, consequat ultrices morbi orci semper sit nulla. Leo
                auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est
                id tincidunt fames.
              </Text>
              <Text
                style={{
                  lineHeight: 20,
                  fontFamily: "Plus Jakarta Sans",
                  color: Colors.disable,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                ornare quam vel facilisis feugiat amet sagittis arcu, tortor.
                Sapien, consequat ultrices morbi orci semper sit nulla. Leo
                auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est
                id tincidunt fames.
              </Text>
              <Text
                style={{
                  lineHeight: 20,
                  fontFamily: "Plus Jakarta Sans",
                  color: Colors.disable,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                ornare quam vel facilisis feugiat amet sagittis arcu, tortor.
                Sapien, consequat ultrices morbi orci semper sit nulla. Leo
                auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est
                id tincidunt fames.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
