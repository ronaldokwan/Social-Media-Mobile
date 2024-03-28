import { View, Text, Button } from "react-native";

function Detail({ route, navigation }) {
  const { id } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detail Screen</Text>
      <Text>Id: {id}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Detail", { id: id + 1 })}
      />
    </View>
  );
}

export default Detail;
