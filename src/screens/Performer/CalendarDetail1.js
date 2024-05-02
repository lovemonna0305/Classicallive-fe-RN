import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";

import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { color } from "@rneui/base";
import {Agenda, Calendar, CalendarList, LocaleConfig} from 'react-native-calendars';


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PerformerCalendarDetail1() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');

  const { program } = useSelector((state) => state.customer);
  const { currentUser } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);

  
  const events = [
    { start: '2017-09-07 00:30:00', end: '2017-09-07 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 01:30:00', end: '2017-09-07 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 04:10:00', end: '2017-09-07 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 01:05:00', end: '2017-09-07 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 14:30:00', end: '2017-09-07 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 01:20:00', end: '2017-09-08 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 04:10:00', end: '2017-09-08 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 00:45:00', end: '2017-09-08 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 11:30:00', end: '2017-09-08 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 01:30:00', end: '2017-09-09 02:00:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 03:10:00', end: '2017-09-09 03:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 00:10:00', end: '2017-09-09 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
]

  useEffect(() => {
    (async () => {})();
    console.log("Post Details page->");
  }, []);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30,  }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("detail")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
      />

      <View style={{ flex: 1, margin: 20, paddingVertical:50 }}>
      <Agenda
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={{
            '2012-05-22': [{name: 'item 1 - any js object'}],
            '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
            '2012-05-24': [],
            '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
          }}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={month => {
            console.log('trigger items loading');
          }}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={calendarOpened => {
            console.log(calendarOpened);
          }}
          // Callback that gets called on day press
          onDayPress={day => {
            console.log('day pressed');
          }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={day => {
            console.log('day changed');
          }}
          // Initially selected day
          selected={'2012-05-16'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2012-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2012-05-30'}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            return <View />;
          }}
          // Specify how each date should be rendered. day can be undefined if the item is not first in that day
          renderDay={(day, item) => {
            return <View />;
          }}
          // Specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            return <View />;
          }}
          // Specify how agenda knob should look like
          renderKnob={() => {
            return <View />;
          }}
          // Override inner list with a custom implemented component
          // renderList={listProps => {
          //   return <MyCustomList {...listProps} />;
          // }}
          // Specify what should be rendered instead of ActivityIndicator
          renderEmptyData={() => {
            return <View />;
          }}
          // Specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          // Hide knob button. Default = false
          hideKnob={true}
          // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
          showClosingKnob={false}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          markedDates={{
            '2012-05-16': {selected: true, marked: true},
            '2012-05-17': {marked: true},
            '2012-05-18': {disabled: true}
          }}
          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
          disabledByDefault={true}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
          onRefresh={() => console.log('refreshing...')}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
          refreshControl={null}
          // Agenda theme
          theme={{
            // ...calendarTheme,
            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue'
          }}
          // Agenda container style
          style={{}}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            width: width,
            backgroundColor: "#000000aa",
          }}
        >
          <View
            style={[
              style.modalcontainer,
              {
                backgroundColor: theme.bg,
                width: width - 30,
                marginVertical: 170,
              },
            ]}
          >
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ paddingTop: 10, alignSelf: "center" }}>
                <Avatar.Icon
                  icon="help"
                  color="#FF4747"
                  size={80}
                  style={{
                    borderWidth: 5,
                    borderColor: "#FF4747",
                    backgroundColor: theme.bg,
                  }}
                />
              </View>
              <View style={{ paddingTop: 20 }}>
                <Text
                  style={[
                    style.subtitle,
                    { color: theme.txt, textAlign: "center" },
                  ]}
                >
                  {t("really_start")}
                </Text>
              </View>
              <View style={{ paddingTop: 20 }}>
                <Text
                  style={[
                    style.subtxt,
                    { color: Colors.disable, textAlign: "center" },
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{
                    paddingHorizontal: 30,
                    paddingVertical: 12,
                    borderColor: "#FF4747",
                    borderWidth: 1,
                    borderRadius: 20,
                    backgroundColor: theme.bg,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FF4747",
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    {t("enter")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 35,
                    paddingVertical: 12,
                    backgroundColor: Colors.primary,
                    borderRadius: 20,
                    marginLeft: 10,
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.bg,
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    {t("cancel")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
