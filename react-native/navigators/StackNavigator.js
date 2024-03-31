import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import LogoutButton from "../components/LogoutButton.js";
import CreatePost from "../screens/CreatePost";
import { useState, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";
import SearchUser from "../screens/SearchUser";
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(AuthContext);
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
                name="Home"
                options={{
                  headerRight: () => <LogoutButton />,
                }}
                component={Home}
              />
              <Stack.Screen name="CreatePost" component={CreatePost} />
              <Stack.Screen name="SearchUser" component={SearchUser} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
