import { View, Text, Button } from "react-native";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {console.log("Home Screen")}
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Detail", {
            id: 1,
          })
        }
      />
    </View>
  );
}

export default Home;
