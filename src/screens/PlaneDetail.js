import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import { AppBar, Spacer } from "@react-native-material/core";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../theme/style";
import { Colors } from "../theme/color";
import theme from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import themeContext from "../theme/themeContex";

export default function PlaneDetail() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectDate, setSelectDate] = useState("Choose date");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dt = new Date(date);
    const x = dt.toISOString().split("T");
    const x1 = x[0].split("-");
    setSelectDate(x1[2] + "/" + x1[1] + "/" + x1[0]);
    hideDatePicker();
  };

  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title="Today's Plane"
          titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate("TodayPlane")}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: Colors.secondary }}
                color="black"
                size={40}
              />
            </TouchableOpacity>
          }
        />
        <View style={{ paddingTop: 15 }}>
          <Text
            style={[
              style.txt1,
              {
                fontWeight: "500",
                color: theme.txt,
                fontFamily: "Plus Jakarta Sans",
              },
            ]}
          >
            Plane Name
          </Text>
          <View style={{ paddingTop: 10 }}>
            <TextInput
              placeholder="Enter your plane name"
              placeholderTextColor={Colors.disable}
              style={[
                style.txtinput,
                { borderColor: Colors.border, fontFamily: "Plus Jakarta Sans" },
              ]}
              selectionColor={Colors.border}
            />
          </View>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
            Selected Date
          </Text>
          <View
            style={[
              style.txtinput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                borderColor: Colors.border,
              },
            ]}
          >
            <TextInput
              value={selectDate}
              style={{ color: Colors.disable, fontFamily: "Plus Jakarta Sans" }}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <Icons name="calendar" size={18} color={theme.txt} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={[style.txt1, { fontWeight: "500", color: theme.txt }]}>
            Description
          </Text>
          <View style={{ paddingTop: 10 }}>
            <TextInput
              placeholder="Enter your plane name"
              placeholderTextColor={Colors.disable}
              multiline={true}
              style={[
                style.txtinput,
                {
                  borderColor: Colors.border,
                  height: 150,
                  textAlignVertical: "top",
                  fontFamily: "Plus Jakarta Sans",
                },
              ]}
              selectionColor={Colors.border}
            />
          </View>
        </View>
        <View
          style={{
            paddingTop: 20,
            justifyContent: "flex-end",
            flex: 1,
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            style={style.btn}
            onPress={() => navigation.navigate("TodaysPlaneAll")}
          >
            <Text style={style.btntxt}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
