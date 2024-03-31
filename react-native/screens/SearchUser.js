import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";

const QUERY_USER_DETAIL = gql`
  query Query($username: String!) {
    # Ensure username is required
    userDetail(username: $username) {
      username
      name
      followingDetail {
        _id
        email
        name
        username
      }
      followerDetail {
        username
        name
        email
        _id
      }
      email
      _id
    }
  }
`;

const MUTATION_ADD_FOLLOW = gql`
  mutation Mutation($addFollow: AddFollow!) {
    addFollow(addFollow: $addFollow) {
      followingId
      followerId
      updatedAt
      createdAt
      _id
    }
  }
`;

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);

  const { loading, error, data, refetch } = useQuery(QUERY_USER_DETAIL, {
    variables: { username },
    // Consider error handling and loading state in the UI
  });

  const [addFollow] = useMutation(MUTATION_ADD_FOLLOW, {
    // Handle potential errors during mutation
    onError: (error) => Alert.alert("Error following user:", error.message),
  });

  const handleFollow = async () => {
    if (data && data.userDetail) {
      const followingId = data.userDetail._id;
      try {
        await addFollow({ variables: { addFollow: { followingId } } });
        setIsFollowed(true);
        Alert.alert("Followed user successfully!");
      } catch (error) {
        Alert.alert("Error following user:", error.message);
      }
    }
  };

  const handleSearch = () => {
    setIsFollowed(false);
    setUsername("");
    // Consider refetching data to clear previous results
    refetch();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search user by username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <Button title="Reset" onPress={handleSearch} style={styles.button} />
      {data && data.userDetail && (
        <View>
          <Text style={styles.text}>{data.userDetail.name}</Text>
          <Text style={styles.text}>{data.userDetail.email}</Text>
          {isFollowed ? (
            <Button
              title="Following"
              disabled={true}
              style={styles.followingButton}
            />
          ) : (
            <Button
              title="Follow"
              onPress={handleFollow}
              style={styles.followButton}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    marginBottom: 10,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  followButton: {
    backgroundColor: "#007AFF",
  },
  followingButton: {
    backgroundColor: "#ccc",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SearchUser;
