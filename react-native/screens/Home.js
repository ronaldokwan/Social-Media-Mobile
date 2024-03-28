import { View, Text, Button } from "react-native";

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
