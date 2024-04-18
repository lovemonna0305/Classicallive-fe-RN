import React from "react";
import StackNavigator from "./src/navigator/StackNavigator";
import "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
import './src/localization/i18n';
import { _stripe } from "./src/constants";
import './src/utils/global';
import { StoreProvider } from "./src/store/store";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <>
    <StoreProvider>
      <StripeProvider  
        publishableKey={_stripe.publishableKey}
        merchantIdentifier="merchant.identifier"
        urlScheme="your-url-scheme"
      >
        <StackNavigator />
        <Toast />
      </StripeProvider>
    </StoreProvider>
    {/* </StripeProvider> */}
    </>
  );
}


