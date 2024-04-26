import { View, Text, Dimensions } from "react-native";

import React, { useState, useContext, useEffect, useRef } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function StatusView({ status = "reserv" }) {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  useEffect(() => {
  }, []);

  return (
    <>
      {status.includes('approved')&&(
        <View style={[style.row, { alignItems: "center" }]}>
          <View style={[style.statusContainer, {backgroundColor:Colors.green}]}>
            <Text style={{ color: theme.txt, fontSize: 10 }}>{t('approved')}</Text>
          </View>
        </View>)
      }
      {status.includes('reserv')&&(
        <View style={[style.row, { alignItems: "center" }]}>
          <View style={[style.statusContainer, {backgroundColor:"blue"}]}>
            <Text style={{ color: theme.txt, fontSize: 10 }}>{t('reserved')}</Text>
          </View>
        </View>)
      }
      {status.includes('canceled')&&(
        <View style={[style.row, { alignItems: "center" }]}>
          <View style={[style.statusContainer, {backgroundColor:Colors.cancel}]}>
            <Text style={{ color: theme.txt, fontSize: 10 }}>{t("canceled")}</Text>
          </View>
        </View>)
      }
      {status.includes('completed')&&(
        <View style={[style.row, { alignItems: "center" }]}>
          <View style={[style.statusContainer, {backgroundColor:Colors.green}]}>
            <Text style={{ color: theme.txt, fontSize: 10 }}>{t("completed")}</Text>
          </View>
        </View>)
      }
      {status.includes('request_cancel')&&(
        <View style={[style.row, { alignItems: "center" }]}>
          <View style={[style.statusContainer, {backgroundColor:Colors.cancel}]}>
            <Text style={{ color: theme.txt, fontSize: 10 }}>{t("request_cancel")}</Text>
          </View>
        </View>)
      }
      {status.includes('deleted')&&(
        <View style={[style.row, { alignItems: "center" }]}>
          <View style={[style.statusContainer, {backgroundColor:Colors.cancel}]}>
            <Text style={{ color: theme.txt, fontSize: 10 }}>{t("deleted")}</Text>
          </View>
        </View>)
      }
    </>
  );
}
