import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { getAuth } from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userResponse = await axios.get(
            `http://10.0.2.2:8080/users/${currentUser.uid}`
          );
          const userData = userResponse.data;
          setUser(userData);

          const productsResponse = await axios.get(
            `http://10.0.2.2:8080/items/user/${userData.userId}`
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
      <TouchableOpacity onPress={() => handleDeleteProduct(item.itemId)}>
        <Ionicons name="close-circle-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>;

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("../assets/images/background.png")}
      />
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
      {/* User Info */}
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
      {/* Products List */}
      <FlatList
        contentContainerStyle={styles.productList}
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.itemId.toString()}
      />
      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <View style={styles.navigationItem}>
          <Ionicons name="add-circle-outline" size={32} color="gray" />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.homeButton}
        >
          <Ionicons name="home-outline" size={22} color="white" />
        </TouchableOpacity>
        <View style={styles.navigationItem}>
          <Ionicons name="cart-outline" size={32} color="gray" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    position: "absolute",
    top: 0,
    width: "100%"
  },
  topBarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  userInfo: {
    alignItems: "center",
    marginTop: 80,
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
    marginTop: 10,
    color: "white"
  },
  productList: {
    paddingHorizontal: 16,
    paddingBottom: 88
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  productImage: {
    width: 80,
    height: 80
  },
  productDetails: {
    flex: 1,
    marginLeft: 16
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold"
  },
  productPrice: {
    color: "gray"
  },
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingVertical: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10
  },
  navigationItem: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  homeButton: {
    backgroundColor: "blue",
    borderRadius: 9999,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10
  }
});

export default ProfileScreen;
