import React from "react";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Forum from "../Pages/Main/forum";
import ForumDetails from "../Pages/Main/ForumDetails.jsx";

enableScreens();
const Stack = createSharedElementStackNavigator();

export default function ForumStack() {
  const config = { animation: "timing", config: { duration: 500 } };

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen
        name="ForumDetails"
        component={ForumDetails}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { item } = route.params;
          return [
            {
              id: `item.${item.Question_ID}.img`,
            },
            {
              id: `item.${item.Question_ID}.txt`,
              resize: "clip",
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
}
