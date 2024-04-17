// import React from "react";
// import StackNavigator from "./src/navigator/StackNavigator";
// import "react-native-gesture-handler";
// import Toast from 'react-native-toast-message';
// import './src/localization/i18n';
// import { _stripe } from "./src/constants";
// import './src/utils/global';
// import { StoreProvider } from "./src/store/store";
// import { StripeProvider } from "@stripe/stripe-react-native";

// export default function App() {
//   return (
//     <>
//     <StoreProvider>
//       <StripeProvider  
//         publishableKey={_stripe.publishableKey}
//         merchantIdentifier="merchant.identifier"
//         urlScheme="your-url-scheme"
//       >
//         <StackNavigator />
//         <Toast />
//       </StripeProvider>
//     </StoreProvider>
//     {/* </StripeProvider> */}
//     </>
//   );
// }

import React from 'react';
import colors from './src/styles/colors';
import Home from './src/scenes/home';
import Viewer_Home from './src/scenes/home/viewer';
import Speaker_Home from './src/scenes/home/speaker';
import Meeting from './src/scenes/ILS';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_NAMES} from './src/navigators/screenNames';

const RootStack = createStackNavigator();

export default function App({}) {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          animationEnabled: false,
          presentation: 'modal',
        }}
        initialRouteName={SCREEN_NAMES.Home}>
        <RootStack.Screen
          name={SCREEN_NAMES.Home}
          component={Home}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={SCREEN_NAMES.Viewer_Home}
          component={Viewer_Home}
          options={{
            headerStyle: {
              backgroundColor: colors.primary['900'],
            },
            headerBackTitle: 'Home',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <RootStack.Screen
          name={SCREEN_NAMES.Speaker_Home}
          component={Speaker_Home}
          options={{
            headerStyle: {
              backgroundColor: colors.primary['900'],
            },
            headerBackTitle: 'Home',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <RootStack.Screen
          name={SCREEN_NAMES.Meeting}
          component={Meeting}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
