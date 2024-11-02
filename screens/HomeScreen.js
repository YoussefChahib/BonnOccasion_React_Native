import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, FlatList, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Fetch categories from your Spring Boot API
    axios.get('http://10.0.2.2:8080/categories')
      .then(response => {
        setCategories([{ categoryId: 0, categoryName: 'All Categories' }, ...response.data]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        #
        setLoading(false);
      });
  }, []);

  // Test data for productssss
  const products = [
    { id: 1, name: 'Product 1', price: 9.99, category: "food", imageSource: require('../assets/images/light.png') },
    { id: 2, name: 'Product 2', price: 14.99, category: "food", imageSource: require('../assets/images/light.png') },
    { id: 3, name: 'Product 3', price: 19.99, category: "voiture", imageSource: require('../assets/images/light.png') },
    { id: 4, name: 'Product 4', price: 24.99, category: "voiture", imageSource: require('../assets/images/light.png') },
    { id: 5, name: 'Product 5', price: 29.99, category: "casquette", imageSource: require('../assets/images/light.png') },
    { id: 6, name: 'Product 6', price: 34.99, category: "casquette", imageSource: require('../assets/images/light.png') },
    { id: 7, name: 'Product 5', price: 29.99, category: "casquette", imageSource: require('../assets/images/light.png') },
    { id: 8, name: 'Product 6', price: 34.99, category: "casquette", imageSource: require('../assets/images/light.png') },
  ];

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Product', { product: item, navigation })}
      activeOpacity={0.7}
    >
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 8,
          margin: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 3,
        }}
      >
        <Image source={item.imageSource} style={{ width: '100%', height: 200 }} />
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>{item.name}</Text>
        <Text style={{ color: 'gray' }}>${item.price}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item.categoryName)} 
        style={{
          backgroundColor: selectedCategory === item.categoryName ? '#0daece' : '#34D400', 
          padding: 8,
          borderRadius: 8,
          marginRight: 8,
        }}
      >
        <Text style={{ color: 'white' }}>{item.categoryName}</Text>
      </TouchableOpacity>
    );
  };

  // Filiter products based on the selected category
  const filteredProducts = selectedCategory === 'All Categories'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light" />
      <Image style={{ position: 'absolute', width: '100%', height: '100%' }} source={require('../assets/images/background.png')} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, position: 'absolute', top: 0, width: '100%' }}>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="white" onPress={() => navigation.navigate('Profile')}/>
        </TouchableOpacity>
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Home</Text>
        </View>
        <TouchableOpacity onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 64, padding: 16 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={categories}
            horizontal
            keyExtractor={(item) => item.categoryId.toString()}
            renderItem={renderCategory}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 16, paddingHorizontal: 16, paddingBottom: 120 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={{ width: '50%', padding: 8 }}>
              {renderProduct({ item: product })}
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: 'white',
          paddingVertical: 16,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 10,
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Ionicons name="add-circle-outline" size={32} color="gray" onPress={() => navigation.navigate('AddProduct')}/>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            backgroundColor: 'blue',
            borderRadius: 9999,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 10,
          }}
        >
          <Ionicons name="home-outline" size={22} color="white" />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Ionicons name="cart-outline" size={32} color="gray" onPress={() => navigation.navigate('Mycard')}/>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
