import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";

const QUERY_USER_DETAIL = gql`
  query Query($username: String) {
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
  mutation Mutation($addFollow: AddFollow) {
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
  const { loading, error, data } = useQuery(QUERY_USER_DETAIL, {
    variables: { username },
  });

  const [addFollow] = useMutation(MUTATION_ADD_FOLLOW);

  const handleFollow = () => {
    if (data && data.userDetail) {
      const followingId = data.userDetail._id;
      addFollow({
        variables: { addFollow: { followingId } },
      })
        .then(() => {
          setIsFollowed(true);
          Alert.alert("Followed user successfully!");
        })
        .catch((error) => {
          Alert.alert("Error following user:", error.message);
        });
    }
  };

  const handleSearch = () => {
    setIsFollowed(false);
    setUsername("");
  };

  return (
    <View>
      <TextInput
        placeholder="Search user by username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button title="Reset" onPress={handleSearch} />
      {data && data.userDetail && (
        <View>
          <Text>{data.userDetail.name}</Text>
          <Text>{data.userDetail.email}</Text>
          {isFollowed ? (
            <Button title="Following" disabled={true} />
          ) : (
            <Button title="Follow" onPress={handleFollow} />
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
