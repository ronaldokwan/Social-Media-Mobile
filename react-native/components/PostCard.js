import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";

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

const ADD_COMMENT = gql`
  mutation Mutation($addComments: AddComments) {
    addComments(addComments: $addComments) {
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

const ADD_LIKE = gql`
  mutation AddLikes($id: ID!) {
    addLikes(_id: $id) {
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

const PostCard = ({ post }) => {
  const [comment, setComment] = useState("");
  const { data, loading, error } = useQuery(GET_POSTS);
  const [addComment] = useMutation(ADD_COMMENT);
  const [addLike] = useMutation(ADD_LIKE);

  const handleCommentSubmit = async () => {
    try {
      await addComment({
        variables: {
          addComments: {
            content: comment,
            _id: post._id,
          },
        },
        refetchQueries: [{ query: GET_POSTS }],
      });
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    try {
      await addLike({
        variables: {
          id: post._id,
        },
        refetchQueries: [{ query: GET_POSTS }],
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{post.authorDetail.username}</Text>
        <Image source={{ uri: post.imgUrl }} style={styles.image} />
      </View>
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.likesCommentsContainer}>
        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Text style={styles.likeButtonText}>{post.likes.length} Likes</Text>
        </TouchableOpacity>
        <FlatList
          data={post.comments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentUsername}>{item.username}</Text>
              <Text style={styles.commentContent}>{item.content}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.commentFormContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleCommentSubmit}
        >
          <Text style={styles.commentButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  username: {
    fontWeight: "bold",
    marginRight: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    marginBottom: 16,
  },
  likesCommentsContainer: {
    marginBottom: 16,
  },
  likesCount: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  commentContainer: {
    marginBottom: 8,
  },
  commentUsername: {
    fontWeight: "bold",
  },
  commentFormContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  commentButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  commentButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  likeButtonText: {
    fontWeight: "bold",
    marginRight: 8,
  },
});

export default PostCard;
