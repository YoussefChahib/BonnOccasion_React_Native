import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductScreen = ({ route }) => {
  const { product, navigation } = route.params;
  const [imageUrls, setImageUrls] = useState([product.imageSource, product.imageSource, product.imageSource]);

  const renderItem = ({ item }) => (
    <Image source={item} style={{ width: '100%', height: 300 }} />
  );

  return (
    <View className="bg-white h-full w-full">
      <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />
      {/* Top Bar */}
      <View className="flex-row items-center justify-between p-4 absolute top-0 w-full" >
        <TouchableOpacity onPress={() => navigation.navigate('Home')} >
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-white font-bold text-xl">Product Details</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
      {/* Product Details */}
      <ScrollView contentContainerStyle={{ paddingTop: 80, paddingHorizontal: 16 }}>
        <View className="bg-white p-4 rounded-lg">
          <FlatList
            data={imageUrls}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
          <Text className="text-lg font-bold mt-2">{product.name}</Text>
          <Text className="text-gray-600">${product.price}</Text>
          <Text className="text-gray-700 mt-4">{product.description}</Text>
        </View>
      </ScrollView>
      {/* Add to Cart Button */}
      <View className="absolute bottom-40 w-full px-4">
        <TouchableOpacity className="bg-green-400 p-4 rounded-lg">
          <Text className="text-white font-bold text-center">Add to Cart</Text>
        </TouchableOpacity>
      </View>
      {/* Navigation Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#fff',
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
          <Ionicons name="add-circle-outline" size={32} color="gray" />
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
          <Ionicons name="cart-outline" size={32} color="gray" />
        </View>
      </View>
    </View>
  );
};

export default ProductScreen;