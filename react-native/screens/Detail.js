import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as SecureStore from "expo-secure-store";

function Detail({ route, navigation }) {
  const { id } = route.params;
  const [token, setToken] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync("access_token").then(setToken);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detail Screen</Text>
      {token && <Text>{token}</Text>}
      <Text>Id: {id}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Detail", { id: id + 1 })}
      />
    </View>
  );
}

export default Detail;
