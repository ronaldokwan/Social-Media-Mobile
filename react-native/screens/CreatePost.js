import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
  mutation AddPosts($addPosts: AddPosts) {
    addPosts(addPosts: $addPosts) {
      updatedAt
      tags
      likes {
        username
        updatedAt
        createdAt
      }
      imgUrl
      createdAt
      content
      comments {
        username
        updatedAt
        createdAt
        content
      }
      authorId
      _id
    }
  }
`;

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

const CreatePost = ({ navigation }) => {
  const [postInput, setPostInput] = useState({
    content: "",
    tags: "",
    imgUrl: "",
  });

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
    onCompleted: () => {
      Alert.alert("Success", "Post created successfully.");
      setPostInput({ content: "", tags: "", imgUrl: "" });
      navigation.goBack();
    },
  });

  const handleCreatePost = async () => {
    try {
      await createPost({
        variables: { addPosts: postInput },
        refetchQueries: [{ query: GET_POSTS }],
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create Post</Text>
      <TextInput
        placeholder="Enter content"
        onChangeText={(text) =>
          setPostInput((prevInput) => ({ ...prevInput, content: text }))
        }
        value={postInput.content}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter tags"
        onChangeText={(text) =>
          setPostInput((prevInput) => ({ ...prevInput, tags: text }))
        }
        value={postInput.tags}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter image URL"
        onChangeText={(text) =>
          setPostInput((prevInput) => ({ ...prevInput, imgUrl: text }))
        }
        value={postInput.imgUrl}
        style={styles.input}
      />
      <Button title="Create Post" onPress={handleCreatePost} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
});

export default CreatePost;
