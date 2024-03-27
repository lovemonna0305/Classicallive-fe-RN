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
  import { getPrograms } from "../actions/customer";
  import { setProgram } from "../actions/common";
  
  import { useNavigation } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux";

  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;
  
  export default function Button({ type, action, style }) {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const theme = useContext(themeContext);
  
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
  
    const [darkMode, setDarkMode] = useState(false);
 
  
    useEffect(() => {
      // console.log("items",items);
      
    }, []);
  
    return (
      <View>
        
      </View>
    );
  }
  