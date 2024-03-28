import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Login from "../screens/Login";
import Detail from "../screens/Detail";
import TabNavigator from "./TabNavigator";

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
