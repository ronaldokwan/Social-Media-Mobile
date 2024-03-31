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
      <Text>{username}</Text>
      <Text style={styles.label}>Name:</Text>
      <Text>{name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text>{email}</Text>

      <Text style={styles.sectionTitle}>Following:</Text>
      <View>
        {followingDetail.map((user) => (
          <Text key={user._id}>{user.username}</Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Followers:</Text>
      <View>
        {followerDetail.map((user) => (
          <Text key={user._id}>{user.username}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 18,
  },
});

export default ProfileScreen;
