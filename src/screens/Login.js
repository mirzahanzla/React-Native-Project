import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { myAuth } from "./FirebaseFile";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Clear input fields when the screen is focused
      setEmail("");
      setPassword("");
    }, [])
  );

  useEffect(() => {
    const unsubscribe = myAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, navigate to the next screen
        navigation.navigate("MainScreen", { userId: user.uid });
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  const handleSignIn = async () => {
    try {
      const userCredential = await myAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log(user.uid);
      navigation.navigate("MainScreen", { userId: user.uid });
    } catch (error) {
      console.error(error.message);
      // Display error message to the user
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Login Page</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <View style={styles.passwordInput}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          style={[styles.input, styles.passwordField]}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleSignIn}
        style={[styles.button, styles.signInButton]}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCreateAccount}
        style={[styles.createAccountButton]}
        activeOpacity={0.7}
      >
        <Text style={styles.createAccountText}>Create New Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleForgotPassword}
        style={[styles.forgotPasswordButton]}
        activeOpacity={0.7}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordInput: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordField: {
    flex: 1,
  },
  toggleButton: {
    marginBottom: 18,
    marginLeft: -25,
  },
  button: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createAccountButton: {
    marginTop: 10,
  },
  createAccountText: {
    color: "#007bff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#007bff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
