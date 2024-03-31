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
      <Button
        title="Create Post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <FlatList
        data={data.postsByDate}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <PostCard post={item} />;
        }}
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
});

export default HomeScreen;
