import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { myAuth } from "./FirebaseFile";
import { StackActions, useNavigation } from "@react-navigation/native";

const NextScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      myAuth.onAuthStateChanged((user) => {
        const routeName = user !== null ? "MainScreen" : "Login";
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to NextScreen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default NextScreen;
