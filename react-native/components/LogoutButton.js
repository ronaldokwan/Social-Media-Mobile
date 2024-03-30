import React, { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LogoutButton() {
  const { setIsSignedIn } = useContext(AuthContext);
  return (
    <TouchableOpacity>
      <Text
        style={{
          fontWeight: "bold",
        }}
        onPress={async () => {
          await SecureStore.deleteItemAsync("access_token");
          setIsSignedIn(false);
        }}
      >
        Logout
      </Text>
    </TouchableOpacity>
  );
}
