import { View, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
// import { createStackNavigator } from '@react-navigation/stack';

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventRegister } from "react-native-event-listeners";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import Introduction from "../Introduction";

import Splash from "../screens/Splash";
import Login from "../screens/loginscreens/Login";
import Signup from "../screens/loginscreens/Signup";


import Forgot from "../screens/loginscreens/Forgot";

import Languagelist from "../screens/Languagelist";
import Forgotpass from "../screens/loginscreens/Forgotpass";
import NewPassword from "../screens/loginscreens/NewPassword";
import Otp from "../screens/loginscreens/Otp";

// import Yourwallet from "../screens/Yourwallet";
// import Location from "../screens/Location";
// import BookTrain from "../screens/BookTrain";
// import User from "../screens/User";
// import Security from "../screens/Security";
// import Paymentmethod from "../screens/Paymentmethod";
// import Setting from "../screens/Setting";

// import Gymintroduction from "../screens/Gymintroduction";
// import TodayPlane from "../screens/TodayPlane";
// import PlaneDetail from "../screens/PlaneDetail";
// import Workout from "../screens/Workout";
// import Allworkout from "../screens/Allworkout";
// import Workoutdetail from "../screens/Workoutdetail";
// import PlayWorkout from "../screens/PlayWorkout";

// Customer

import CustomerHomepage from "../screens/customer/Homepage";
import CustomerPoints from "../screens/customer/Points";
import CustomerCategory from "../screens/customer/Category";
import CustomerPostList from "../screens/customer/PostList";
import CustomerReview from "../screens/customer/Review";
import CustomerHistoryDetail from "../screens/customer/HistoryDetail";
import CustomerInterCategoryList from "../screens/customer/InterCategoryList";
import CustomerReviewList from "../screens/customer/ReviewList";
import CustomerPostDetail from "../screens/customer/PostDetail";
import CustomerProgramEnter from "../screens/customer/ProgramEnter";
// import CustomerPayment from "../screens/customer/Payment";
import CustomerHistoryList from "../screens/customer/HistoryList";
import CustomerCategoryList from "../screens/customer/CategoryList";

// // Performer
import PerformerCategory from "../screens/Performer/Category";
// import PerformerPostDetail from "../screens/Performer/PostDetail";
import PerformerHistoryDetail from "../screens/Performer/HistoryDetail";

import PerformerPostCreate from "../screens/Performer/PostCreate";
import PerformerPostEdit from "../screens/Performer/PostEdit";
import PerformerProgramEnter from "../screens/Performer/ProgramEnter";
// import PerformerCalendarDetail from "../screens/Performer/CalendarDetail";
import PerformerCustomerList from "../screens/Performer/CustomerList";

// import Messagedelete from '../screens/Messagedelete';

import Profile from "../screens/common/Settings";
import Language from "../screens/common/Language";
import Legal from "../screens/common/Legal";
import Notification from "../screens/common/Notification";
import AccountProfile from "../screens/common/AccountProfile";
import LiveChat from "../screens/common/LiveChat";

import { Colors } from "../theme/color";
import { storage } from "../utils/storage";

import UpdatePassword from "../screens/common/UpdatePassword";
import { roleList } from "../constants";
import '../utils/global';
import { useStore } from "../store/store";
import PerformerHomepage from "../screens/Performer/Homepage";
import Message from "../screens/common/Message";

import PerformerCategoryList from "../screens/Performer/CategoryList";
import PerformerHistoryList from "../screens/Performer/HistoryList";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {

  // let role = storage.getItem("role");
  // const { skipIntro } = useSelector((state) => state.common);
  const {store, changeStore} = useStore();
  // console.log("store------------------------------------------>")
  // console.log('isLoading', store.isLoading);
  // console.log('currentUser.id', (store.currentUser)&&store.currentUser.id);
  // console.log('program.id', (store.program)&&store.program.id);
  // console.log("store--------------------------->")
  const [darkMode, setDarkMode] = useState(false);
  // store.isLoading = true;
  
  // storage.removeItem('currentUser');

  // const toggleSwitch = () => setDarkMode(previousState => !previousState);
  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
    });

    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  const [showSplashScreen, setshowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      // setshowSplashScreen(false);
      changeStore({...store, showSplashScreen:false});
    }, 3000);
    const fetchStatus = async () => {
      const currentUser = await storage.getItem("currentUser");
      if(currentUser!=null){
        // setIsLoggedin(true);
        changeStore({...store, isLoggedin:true});
      }
    };
    fetchStatus();
  }, []);

  return (
    <themeContext.Provider
      value={darkMode === false ? theme.dark : theme.light}
    >
      <NavigationContainer
        theme={darkMode === false ? DarkTheme : DefaultTheme}
      >
        <StatusBar
          backgroundColor={
            darkMode === false ? Colors.active : Colors.secondary
          }
          barStyle={darkMode === false ? "light-content" : "dark-content"}
          translucent={false}
        />
        <Stack.Navigator>
          {store.showSplashScreen ? (
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
          ) : null}
          {(store.isLoggedin) ? (
            <>
              {store.currentUser.role_id == 4 ? (
                <>
                  <Stack.Screen
                    name="Home"
                    component={CustomerHomepage}
                    options={{ headerShown: false }}
                  />           
                  <Stack.Screen
                    name="CustomerCategory"
                    component={CustomerCategory}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CategoryList"
                    component={CustomerCategoryList}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="HistoryList"
                    component={CustomerHistoryList}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="CustomerPostDetail"
                    component={CustomerPostDetail}
                    options={{ headerShown: false }}
                  />
                  
                 <Stack.Screen
                    name="CustomerPostList"
                    component={CustomerPostList}
                    options={{ headerShown: false }}
                  />
                 

                  <Stack.Screen
                    name="CustomerHistoryDetail"
                    component={CustomerHistoryDetail}
                    options={{ headerShown: false }}
                  /> 
                  <Stack.Screen
                    name="CustomerPoints"
                    component={CustomerPoints}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ReviewList"
                    component={CustomerReviewList}
                    options={{ headerShown: false }}
                  />
                    <Stack.Screen
                    name="Review"
                    component={CustomerReview}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="InterCategoryList"
                    component={CustomerInterCategoryList}
                    options={{ headerShown: false }}
                  />

                  
                  <Stack.Screen
                    name="ProgramEnter"
                    component={CustomerProgramEnter}
                    options={{ headerShown: false }}
                  />
                  {/*<Stack.Screen
                    name="CustomerPayment"
                    component={CustomerPayment}
                    options={{ headerShown: false }}
                  /> */}
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Home"
                    component={PerformerHomepage}
                    options={{ headerShown: false }}
                  />
                   <Stack.Screen
                    name="PerformerCategory"
                    component={PerformerCategory}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="PostCreate"
                    component={PerformerPostCreate}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="PerformerPostEdit"
                    component={PerformerPostEdit}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CategoryList"
                    component={PerformerCategoryList}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="PerformerHistoryDetail"
                    component={PerformerHistoryDetail}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="PerformerProgramEnter"
                    component={PerformerProgramEnter}
                    options={{ headerShown: false }}
                  />

                  {/*<Stack.Screen
                    name="PerformerPostDetail"
                    component={PerformerPostDetail}
                    options={{ headerShown: false }}
                  />
                 

                  
                  <Stack.Screen
                    name="PerformerCalendarDetail"
                    component={PerformerCalendarDetail}
                    options={{ headerShown: false }}
                  />
                  */}
                  <Stack.Screen
                    name="HistoryList"
                    component={PerformerHistoryList}
                    options={{ headerShown: false }}
                  /> 
                  <Stack.Screen
                    name="CustomerList"
                    component={PerformerCustomerList}
                    options={{ headerShown: false }}
                  /> 

                  
                </>
              )}
              <Stack.Screen
                name="Message"
                component={Message}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Notification"
                component={Notification}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LiveChat"
                component={LiveChat}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Language"
                component={Language}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Legal"
                component={Legal}
                options={{ headerShown: false }}
              />











              <Stack.Screen
                name="AccountProfile"
                component={AccountProfile}
                options={{ headerShown: false }}
              />

              {/* <Stack.Screen
                name="Yourwallet"
                component={Yourwallet}
                options={{ headerShown: false }}
              />
              
              <Stack.Screen
                name="FriendProfile"
                component={FriendProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Paymentmethod"
                component={Paymentmethod}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Setting"
                component={Setting}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BookTrain"
                component={BookTrain}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Languagelist"
                component={Languagelist}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="User"
                component={User}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Security"
                component={Security}
                options={{ headerShown: false }}
              />

              

              <Stack.Screen
                name="TodayPlane"
                component={TodayPlane}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="TodaysPlaneAll"
                component={TodaysPlaneAll}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="PlaneDetail"
                component={PlaneDetail}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Workout"
                component={Workout}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Allworkout"
                component={Allworkout}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Workoutdetail"
                component={Workoutdetail}
                options={{ headerShown: false }}
              />
              
              <Stack.Screen
                name="Message"
                component={Message}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="MessageN"
                component={MessageN}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Messagedelete"
                component={Messagedelete}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="PlayWorkout"
                component={PlayWorkout}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Location"
                component={Location}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Otp"
                component={Otp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgot"
                component={Forgot}
                options={{ headerShown: false }}
              />*/}
              <Stack.Screen
                name="UpdatePassword"
                component={UpdatePassword}
                options={{ headerShown: false }}
              />

              {/* <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{ headerShown: false }}
              />  */}


            </>
          ) : (
            <>
              <Stack.Screen
                name="Introduction"
                component={Introduction}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen
                name="CreateAccount"
                component={CreateAccount}
                options={{ headerShown: false }}
              /> */}
              <Stack.Screen
                name="Otp"
                component={Otp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgot"
                component={Forgot}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgotpass"
                component={Forgotpass}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UpdatePassword"
                component={UpdatePassword}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
