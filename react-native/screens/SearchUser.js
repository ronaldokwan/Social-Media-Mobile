import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";

const QUERY_USER_DETAIL = gql`
  query Query($username: String!) {
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
  });
  const [addFollow] = useMutation(MUTATION_ADD_FOLLOW, {
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
    refetch();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search User</Text>
      <TextInput
        placeholder="Search user by username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <Button
        title="Reset"
        onPress={handleSearch}
        color="#ff0000"
        style={styles.button}
      />
      {data && data.userDetail && (
        <View style={styles.userContainer}>
          <Text style={styles.name}>{data.userDetail.name}</Text>
          <Text style={styles.email}>{data.userDetail.email}</Text>
          {isFollowed ? (
            <Button
              title="Following"
              disabled={true}
              color="#ccc"
              style={styles.followingButton}
            />
          ) : (
            <Button
              title="Follow"
              onPress={handleFollow}
              color="#ff0000"
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 16,
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
  userContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
    color: "#555",
  },
  followButton: {
    backgroundColor: "#ff0000",
    borderRadius: 4,
  },
  followingButton: {
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
});

export default SearchUser;
