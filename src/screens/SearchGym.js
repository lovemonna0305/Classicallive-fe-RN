import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
// Import Map and Marker
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useContext } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { Card } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import Gymslider from '../components/Gymslider'
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function SearchGym({ route, navigation }) {
  const theme = useContext(themeContext);
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [age, setAge] = useState();

  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'blue',

    },
    mapStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 50 }]}
    >

      <AppBar
        color={theme.bg}
        title="Search"
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        style={{ backgroundColor: "#FFFFFF" }}
        leading={
          <TouchableOpacity
            onPress={() => navigation.navigate("Homepage")}
          >
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: "#FFFFFF" }}
              color="black"
              size={40}
            />
          </TouchableOpacity>
        }
      />

      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <ScrollView>
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <Text
              style={{
                color: theme.txt,
                fontSize: 16,
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 700
              }}
            >
              Gym near you
            </Text>
            <Gymslider />
            <Card style={{ marginTop: 10 }}>
              <Card.Content style={{ backgroundColor: "white", borderRadius: 10 }}>
                <View style={[style.row, { justifyContent: "flex-start" }]}>
                  <View style={[style.row, { marginTop: 5 }]}>
                    <Icon name="location-outline" size={20}></Icon>
                    <Text style={{ marginTop: 0 }}>Location</Text>
                  </View>
                  <TextInput
                    placeholder="Use your location"
                    selectionColor={Colors.primary}
                    placeholderTextColor={Colors.disable}
                    require
                    style={[
                      style.txtinput,
                      {
                        borderWidth: 2,
                        backgroundColor: theme.bg,
                        fontSize: 12,
                        height: 35,
                        fontFamily: "Plus Jakarta Sans",
                        marginLeft: 80,
                        flexDirection: "row", // Align the TextInput and right icon horizontally
                        alignItems: "center", // Vertically center the TextInput and right icon
                      },
                    ]}
                  />
                </View>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, width: width * 0.85, height: height / 2, }}>
                  <View style={styles.container}>
                    <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    customMapStyle={mapStyle}>
                    <Marker
                      draggable
                      coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                      }}
                      onDragEnd={
                        (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                      }
                      title={'Test Marker'}
                      description={'This is a description of the marker'}
                    />
                  </MapView>
                    {/* <Image source={require('../../assets/image/Gmap.jpg')} style={{ width: 300, height: 200, resizeMode: 'contain', }}>
                  </Image> */}
                  </View>
                </View>
              </Card.Content>
            </Card>
            <Text
              style={{
                color: theme.txt,
                fontSize: 14,
                fontFamily: "Plus Jakarta Sans",
                marginTop: 15
              }}
            >
              Search by Facilities
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 2,
              marginTop: 10
            }}>
              <Icon name="search" size={24} color="#888" style={{ marginRight: 10, }} />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#888"
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: '#333'
                }}
              />
            </View>
            <Text
              style={{
                color: theme.txt,
                fontSize: 14,
                fontFamily: "Plus Jakarta Sans",
                marginTop: 15
              }}
            >
              Recently searched
            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate("Gymintroduction") }}>
              <View style={[style.row, { marginTop: 15, }]}>
                <Icon name="time-outline" size={15} style={{ marginTop: 3, marginRight: 15 }}></Icon>
                <Text>Hufit</Text>
              </View>
            </TouchableOpacity>

            <View style={[style.row, { marginTop: 15, }]}>
              <Icon name="time-outline" size={15} style={{ marginTop: 3, marginRight: 15 }}></Icon>
              <Text>best gym</Text>
            </View>
            <View style={[style.row, { marginTop: 15, }]}>
              <Icon name="time-outline" size={15} style={{ marginTop: 3, marginRight: 15 }}></Icon>
              <Text>the rock</Text>
            </View>
            <View style={[style.row, { marginTop: 15, marginBottom: 40 }]}>
              <Icon name="time-outline" size={15} style={{ marginTop: 3, marginRight: 15 }}></Icon>
              <Text>good meals</Text>
            </View>
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}
