import React from "react";
import { View, FlatList, StyleSheet, Text, Button } from "react-native";
import { useQuery, gql } from "@apollo/client";
import PostCard from "../components/PostCard";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const GET_POSTS = gql`
    query Query {
      postsByDate {
        updatedAt
        tags
        likes {
          username
          updatedAt
          createdAt
        }
        imgUrl
        createdAt
        comments {
          username
          updatedAt
          createdAt
          content
        }
        content
        _id
        authorDetail {
          _id
          email
          name
          username
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_POSTS);
  const navigation = useNavigation();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>YouTube</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Create Post"
            onPress={() => navigation.navigate("CreatePost")}
            color="#ff0000"
            style={styles.button}
          />
          <Button
            title="Search User"
            onPress={() => navigation.navigate("SearchUser")}
            color="#ff0000"
            style={styles.button}
          />
          <Button
            title="Profile User"
            onPress={() => navigation.navigate("ProfileUser")}
            color="#ff0000"
            style={styles.button}
          />
        </View>
      </View>
      <FlatList
        data={data.postsByDate}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PostCard post={item} />}
        style={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#ff0000",
    paddingVertical: 7,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginLeft: 8,
  },
  flatListContainer: {
    flex: 1,
    marginTop: 8,
  },
});

export default HomeScreen;
