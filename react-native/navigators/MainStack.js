import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import LogoutButton from "../components/LogoutButton.js";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext.js";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  (async () => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      setIsSignedIn(true);
    }
  })();
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <NavigationContainer>
        <Stack.Navigator>
          {isSignedIn ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                options={{
                  headerRight: () => <LogoutButton />,
                }}
                component={Home}
              />
              <Stack.Screen name="Detail" component={Detail} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
