import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { myAuth } from "./FirebaseFile";
import { signOut } from "firebase/auth";
import { StackActions } from "@react-navigation/native";

const ResultScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { email, userId, fullName, fatherName, age } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("MainScreen")}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const handleSignOut = async () => {
    try {
      await signOut(myAuth);
      navigation.dispatch(StackActions.replace("Login"));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.infoBox, styles.hoverEffect]}>
        <Text style={styles.infoText}>Email: {email}</Text>
        <Text style={styles.infoText}>User ID: {userId}</Text>
        <Text style={styles.infoText}>Full Name: {fullName}</Text>
        <Text style={styles.infoText}>Father's Name: {fatherName}</Text>
        <Text style={styles.infoText}>Age: {age}</Text>
      </Animated.View>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5,
  },
  signOutButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  hoverEffect: {
    transform: [{ scale: 1 }],
    transitionProperty: "transform",
    transitionDuration: "0.3s",
  },
  headerButton: {
    marginLeft: 10,
    padding: 10,
  },
  headerButtonText: {
    fontSize: 16,
    color: "blue",
  },
});

export default ResultScreen;
