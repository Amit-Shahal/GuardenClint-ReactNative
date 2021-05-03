import React from "react";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Forum from "../Pages/Main/Forum";
import ForumDetails from "../Pages/Main/ForumDetails.jsx";

enableScreens();
const Stack = createSharedElementStackNavigator();

export default function ForumStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen
        name="ForumDetails"
        component={ForumDetails}
        // options={() => ({
        //   gestureEnabled: false,
        //   transitionSpec: {
        //     open: { animation: "timing", config: { duration: 1000 } },
        //     close: { animation: "timing", config: { duration: 1000 } },
        //   },
        //   cardStyleInterpolator: ({ current: { progress } }) => {
        //     return {
        //       cardStyle: {
        //         opacity: progress,
        //       },
        //     };
        //   },
        // })}
      />
    </Stack.Navigator>
  );
}
