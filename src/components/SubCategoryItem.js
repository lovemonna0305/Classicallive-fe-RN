import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState, useContext, useEffect } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useTranslation } from "react-i18next";

import { useNavigation } from "@react-navigation/native";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function SubCategoryItem({ items }) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  const [darkMode, setDarkMode] = useState(false);

  const [select, setSelect] = useState(false);
  let idArray = [];

  useEffect(() => {
    console.log(items)
  }, []);
  const selectItem = (id) => {
    setSelect(true)
    idArray.push(id)
    console.log("id--",idArray)
  };

  return (
    <View
      style={{
        paddingTop: 15,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {items &&
        items.map((item, index) => (
          <View style={{ margin: 3 }}>
            <TouchableOpacity
              style={
                (select)?{paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 20,
                  borderColor: theme.icon,
                  backgroundColor: theme.bg,
                  borderWidth: 1,
                  marginLeft: 10,}:{paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 20,
                    borderColor: "#E3E7EC",
                    backgroundColor: theme.bg,
                    borderWidth: 1,
                
              }}
              onPress={()=>selectItem(item.value)}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: theme.txt,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
            {/* selected */}
            {/* <TouchableOpacity
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 20,
            borderColor: theme.icon,
            backgroundColor: theme.bg,
            borderWidth: 1,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: theme.icon,
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            Stomach(11)
          </Text>
        </TouchableOpacity> */}
          </View>
        ))}
    </View>
  );
}
