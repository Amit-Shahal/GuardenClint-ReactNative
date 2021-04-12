import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import mainStack from "./Utils/mainStack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import LoginProvider from "./Utils/LoginContext";

import VerifyUserByEmail from "./Pages/Login/VerifyUserByEmail";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import VerifyOTP from "./Pages/Login/VerifyOTP";
import SplashScreen from "./Pages/Login/SpalshScreen";
import ResetPassword from "./Pages/Login/ResetPassword";

const Stack = createStackNavigator();


export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            name="mainStack"
            component={mainStack}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen
            name="VerifyUserByEmail"
            component={VerifyUserByEmail}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoginProvider>
  );
}
