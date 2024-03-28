import { View, Text, Button } from "react-native";

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Home"
        onPress={() =>
          navigation.navigate("Home", {
            id: 2,
          })
        }
      />
    </View>
  );
}
export default Profile;
