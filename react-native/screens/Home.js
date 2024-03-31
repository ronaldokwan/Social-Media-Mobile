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
      <View style={styles.buttonContainer}>
        <Button
          title="Create Post"
          onPress={() => navigation.navigate("CreatePost")}
          style={styles.button}
        />
        <Button
          title="Search User"
          onPress={() => navigation.navigate("SearchUser")}
          style={styles.button}
        />
        <Button
          title="Profile User"
          onPress={() => navigation.navigate("ProfileUser")}
          style={styles.button}
        />
      </View>
      <FlatList
        data={data.postsByDate}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <PostCard post={item} />;
        }}
        style={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  flatListContainer: {
    flex: 1,
    marginTop: 8,
  },
});

export default HomeScreen;
