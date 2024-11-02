import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv_0bWI7O2O7yqDdOj8tGKVL0Iw93FQYQ",
  authDomain: "avito-11d05.firebaseapp.com",
  projectId: "avito-11d05",
  storageBucket: "avito-11d05.appspot.com",
  messagingSenderId: "286661727976",
  appId: "1:286661727976:web:edb3b04599968d0f355b5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
