import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { getAuth } from "firebase/auth";

const AddProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPictureUrl, setProductPictureUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8080/categories")
      .then(response => {
        const categoriesDict = {};
        response.data.forEach(category => {
          categoriesDict[category.categoryName] = category;
        });
        setCategories(categoriesDict);
        console.log("Categories dictionary:", categoriesDict);

        const firstCategoryName = Object.keys(categoriesDict)[0];
        if (firstCategoryName) {
          setSelectedCategory(categoriesDict[firstCategoryName]);
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.status === 404) {
          console.warn("API endpoint nit found ");
        }
      });
  }, []);

  const handleAddProduct = async () => {
    try {
      // Get the currently logged-in user from Firebase
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Retrieve the user information from your backend API using the Firebase user ID
        const response = await axios.get(
          `http://10.0.2.2:8080/users/firebase/${currentUser.uid}`
        );
        const seller = response.data;

        // Create a new product object
        const newProduct = {
          name: productName,
          description: productDescription,
          price: parseFloat(productPrice),
          pictureUrl: productPictureUrl,
          category: selectedCategory,
          seller: seller
        };

        // Send a POST request to your Spring API to add the new product
        await axios.post("http://10.0.2.2:8080/items", newProduct);

        console.log("Product added successfully");
        // Reset the form fields
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductPictureUrl("");
        setSelectedCategory("");
      } else {
        console.log("No user currently logged in");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("../assets/images/background.png")}
      />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>Add Product</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Description"
          value={productDescription}
          onChangeText={setProductDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Product Price"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Product Picture URL"
          value={productPictureUrl}
          onChangeText={setProductPictureUrl}
        />
        <Picker
          style={styles.picker}
          selectedValue={selectedCategory}
          onValueChange={itemValue => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Select a Category" value={null} />
          {Object.keys(categories).map(categoryName =>
            <Picker.Item
              key={categoryName}
              label={categoryName}
              value={categories[categoryName]}
            />
          )}
        </Picker>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </ScrollView>
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
  formContainer: {
    paddingTop: 80,
    paddingHorizontal: 16
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  addButton: {
    backgroundColor: "green",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold"
  }
});

export default AddProductScreen;
