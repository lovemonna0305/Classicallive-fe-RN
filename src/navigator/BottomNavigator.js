import React, { useContext, useState } from "react";
import Svg from "react-native-svg";
import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../theme/color";
import themeContext from "../theme/themeContex";
import Icon from "react-native-vector-icons/FontAwesome5";
import MealIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

// Customer
import CustomerHomepage from "../screens/customer/Homepage";
import CustomerCategoryList from "../screens/customer/CategoryList";
import CustomerHistoryList from "../screens/customer/HistoryList";

// Performer
import PerformerHomepage from "../screens/Performer/Homepage";
import { storage } from "../utils/storage";
import PerformerCategoryList from "../screens/Performer/CategoryList";
import PerformerHistoryList from "../screens/Performer/HistoryList";
import Message from "../screens/common/Message";

export default function MyTabs() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState("false");
  let currentUser = global.currentUser;
  let role = currentUser.role.name;
  global.isLoading = true;

  return (
    <Tab.Navigator
      screenOptions={{
        // BottomTabBarHeight:30,
        tabBarStyle: { position: "absolute", height: 60 },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      {role == "customer" ? (
        <>
          <Tab.Screen
            name="HomePage"
            component={CustomerHomepage}
            options={{
              tabBarShowLabel: true,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color: focused ? theme.icon : Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    marginBottom: 15,
                    fontSize: 12,
                  }}
                >
                  {t("home")}
                </Text>
              ),
              tabBarIcon: ({ focused, color }) => {
                return (
                  <Icon
                    name="home"
                    size={20}
                    color={focused ? theme.icon : Colors.disable}
                  />
                );
              },
              headerShown: false,
            }}
          />

           <Tab.Screen
            name="Message"
            component={Message}
            options={{
              tabBarShowLabel: true,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color: focused ? theme.icon : Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    marginBottom: 15,
                    fontSize: 12,
                  }}
                >
                  {t("message")}
                </Text>
              ),
              tabBarIcon: ({ focused, color }) => {
                return (
                  <Icon
                    name="envelope"
                    size={20}
                    color={focused ? theme.icon : Colors.disable}
                  />
                );
              },
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="CustomerCategoryList"
            component={CustomerCategoryList}
            options={{
              tabBarShowLabel: true,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color: focused ? theme.icon : Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    marginBottom: 15,
                    fontSize: 12,
                  }}
                >
                  {t("browse")}
                </Text>
              ),
              tabBarIcon: ({ focused, color }) => {
                return (
                  <Icon
                    name="search"
                    size={20}
                    color={focused ? theme.icon : Colors.disable}
                  />
                );
              },
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="CustomerHistoryList"
            component={CustomerHistoryList}
            options={{
              tabBarShowLabel: true,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color: focused ? theme.icon : Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    marginBottom: 15,
                    fontSize: 12,
                  }}
                >
                  {t("history")}
                </Text>
              ),
              tabBarIcon: ({ focused, color }) => {
                return (
                  <Icon
                    name="history"
                    size={20}
                    color={focused ? theme.icon : Colors.disable}
                  />
                );
              },
              headerShown: false,
            }}
          /> 
        </>
      ) : (
        <>
          <Tab.Screen
            name="PerformerHomePage"
            component={PerformerHomepage}
            options={{
              tabBarShowLabel: true,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color: focused ? theme.icon : Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    marginBottom: 15,
                    fontSize: 12,
                  }}
                >
                  {t("home")}
                </Text>
              ),
              tabBarIcon: ({ focused, color }) => {
                return (
                  <Icon
                    name="home"
                    size={20}
                    color={focused ? theme.icon : Colors.disable}
                  />
                );
              },
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="Message"
            component={Message}
            options={{
              tabBarShowLabel: true,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color: focused ? theme.icon : Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    marginBottom: 15,
                    fontSize: 12,
                  }}
                >
                  {t("message")}
                </Text>
              ),
              tabBarIcon: ({ focused, color }) => {
                return (
                  <Icon
                    name="envelope"
                    size={20}
                    color={focused ? theme.icon : Colors.disable}
                  />
                );
              },
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="PerformerCategoryList"
            component={PerformerCategoryList}
            options={{
              tabBarShowLabel: true,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color: focused ? theme.icon : Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    marginBottom: 15,
                    fontSize: 12,
                  }}
                >
                  {t("browse")}
                </Text>
              ),
              tabBarIcon: ({ focused, color }) => {
                return (
                  <Icon
                    name="search"
                    size={20}
                    color={focused ? theme.icon : Colors.disable}
                  />
                );
              },
              headerShown: false,
            }}
          />
           <Tab.Screen
            name="PerformerHistoryList"
            component={PerformerHistoryList}
            options={{
              tabBarShowLabel: true,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color: focused ? theme.icon : Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                    marginBottom: 15,
                    fontSize: 12,
                  }}
                >
                  {t("history")}
                </Text>
              ),
              tabBarIcon: ({ focused, color }) => {
                return (
                  <Icon
                    name="history"
                    size={20}
                    color={focused ? theme.icon : Colors.disable}
                  />
                );
              },
              headerShown: false,
            }}
          />
        </>
      )}

      {/* <Tab.Screen
            name="Workout"
            component={Workout}
            options={{
              tabBarShowLabel: true,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color: focused ? theme.icon : Colors.disable,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  Workout
                </Text>
              ),
              tabBarIcon: ({ focused, color }) => {
                return (
                  <Icon
                    name="dumbbell"
                    size={23}
                    color={focused ? theme.icon : Colors.disable}
                  />
                );
              },
              headerShown: false,
            }}
          /> 
          <Tab.Screen
        name="Meal Plans"
        component={Workout}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? theme.icon : Colors.disable,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              Meal Plans
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => {
            return (
              <MealIcon
                name="silverware-fork-knife"
                size={25}
                color={focused ? theme.icon : Colors.disable}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? theme.icon : Colors.disable,
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              Statistics
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name="analytics-sharp"
                size={30}
                color={focused ? theme.icon : Colors.disable}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? theme.icon : Colors.disable,
                fontFamily: "Plus Jakarta Sans",
                marginBottom: 15,
                fontSize: 12,
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon
                name="user"
                size={20}
                color={focused ? theme.icon : Colors.disable}
              />
            );
          },
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
}
