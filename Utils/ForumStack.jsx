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
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 500 } },
            close: { animation: "timing", config: { duration: 500 } },
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
            // {
            //   id: `item.${item.Question_ID}.view`,
            //   animation: "move",
            //   // resize: "stretch",
            // },
            // {
            //   id: `item.${item.Question_ID}.txt`,
            // },
            {
              id: `item.${item.Question_ID}.img`,
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
}
