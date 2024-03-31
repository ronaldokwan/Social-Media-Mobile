import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";

const GET_USER_PROFILE = gql`
  query ExampleQuery {
    userById {
      username
      name
      followingDetail {
        _id
        email
        username
        name
      }
      followerDetail {
        _id
        username
        name
        email
      }
      email
      _id
    }
  }
`;

const ProfileScreen = () => {
  const { loading, error, data, refetch } = useQuery(GET_USER_PROFILE);

  useFocusEffect(
    React.useCallback(() => {
      const refetchData = async () => {
        try {
          await refetch();
        } catch (error) {
          console.error("Error refetching data:", error.message);
        }
      };
      refetchData();
      return () => {};
    }, [])
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { username, name, email, followingDetail, followerDetail } =
    data.userById;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{username}</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email}</Text>
      <Text style={styles.sectionTitle}>Following:</Text>
      <View style={styles.userList}>
        {followingDetail.map((user) => (
          <Text key={user._id} style={styles.userText}>
            {user.username}
          </Text>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Followers:</Text>
      <View style={styles.userList}>
        {followerDetail.map((user) => (
          <Text key={user._id} style={styles.userText}>
            {user.username}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff0000",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    color: "#555",
  },
  value: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 18,
    color: "#ff0000",
  },
  userList: {
    marginTop: 10,
    marginLeft: 20,
  },
  userText: {
    marginBottom: 5,
  },
});

export default ProfileScreen;
