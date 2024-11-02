import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { getAuth } from "firebase/auth";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userResponse = await axios.get(
            `http://10.0.2.2:8080/users/firebase/${currentUser.uid}`
          );
          const userData = userResponse.data;
          setUser(userData);

          const productsResponse = await axios.get(
            `http://10.0.2.2:8080/items/user/firebase/${userData.firebaseUserId}`
          );

          const productsData = productsResponse.data;
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching user and products:", error);
      }
    };

    fetchUserAndProducts();
  }, []);

  const handleDeleteProduct = async productId => {
    try {
      await axios.delete(`http://10.0.2.2:8080/items/${productId}`);
      setProducts(prevProducts =>
        prevProducts.filter(product => product.itemId !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const renderProduct = ({ item }) =>
    <View style={styles.productCard}>
      <Image source={{ uri: item.pictureUrl }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>
          ${item.price}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteProduct(item.itemId)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>;

  return (
    <View style={styles.container}>
      {user &&
        <View style={styles.userInfo}>
          <Image
            source={{ uri: user.profilePictureUrl }}
            style={styles.profilePicture}
          />
          <Text style={styles.username}>
            {user.username}
          </Text>
        </View>}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.itemId.toString()}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  },
  productList: {
    paddingBottom: 20
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10
  },
  productDetails: {
    flex: 1
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  productPrice: {
    fontSize: 14,
    color: "#888"
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 5
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default ProfileScreen;
