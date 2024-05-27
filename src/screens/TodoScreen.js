

import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Card } from "react-native-elements";
import { myAuth, db } from "./FirebaseFile";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { StackActions } from "@react-navigation/native";
import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";

const TodoScreen = ({ navigation }) => {
  const [apiData, setApiData] = useState(null);
  const [isApiDataLoading, setIsApiDataLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(myAuth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.email));
      }
    });
    return unsubscribe;
  }, []);


  const handleSignOut = async () => {
    try {
      await signOut(myAuth);
      navigation.dispatch(StackActions.replace("Login"));
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchApiData = async () => {
    setIsApiDataLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching API data: ", error);
    } finally {
      setIsApiDataLoading(false);
    }
  };

  const replaceTitlesWithCities = async () => {
    setIsApiDataLoading(true);
    const apiKey = "";//////////////use your URL in OpenWeather
    const bbox = "12,32,15,37,10";
    const url = `https://api.openweathermap.org/data/2.5/box/city?bbox=${bbox}&units=metric&appid=${apiKey}`

    try {
      const response = await axios.get(url);
      const cities = response.data.list.filter(
        (city) => city.main.temp >= 10 && city.main.temp <= 35
      );

      let cityNames = [];
      while (cityNames.length < 199) {
        cityNames = cityNames.concat(cities.map((city) => city.name));
      }

      const updatedData = apiData.map((item, index) => {
        if (cityNames[index]) {
          return { ...item, title: cityNames[index] };
        } else {
          return item;
        }
      });

      setApiData(updatedData);
    } catch (error) {
      console.error("Error fetching cities: ", error);
    } finally {
      setIsApiDataLoading(false);
    }
  };

  async function storeDataInFirestore() {
    try {
      await setDoc(doc(db, "users", user.email), {
        apiData,
      });
      alert("Data Stored Successfully");
      setApiData(null);
    } catch (err) {
      alert("Error Saving Data", err.message);
    }
  }

  async function retrieveDataFromFirestore() {
    try {
      const userDoc = await getDoc(doc(db, "users", user.email));
      alert("Data retrieved Successfully");
      setApiData(userDoc.data().apiData);
    } catch (err) {
      alert("Error Retrieving Data", err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContainer}>
        <Text style={{ textAlign: "center" }}>
          Email: {myAuth.currentUser.email}
        </Text>

    
  <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.buttonText1}>Sign Out</Text>
      </TouchableOpacity>

      </Card>
      <Card containerStyle={styles.cardContainer}>
        {isApiDataLoading && <Text>Loading API Data...</Text>}
        <View style={styles.horizontalButtonContainer}>
          <TouchableOpacity
            onPress={fetchApiData}
            style={[styles.button, styles.fetchButton]}
          >
            <Text style={styles.buttonText}>F-Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={replaceTitlesWithCities}
            style={[styles.button, styles.replaceButton]}
          >
            <Text style={styles.buttonText}>R-Titles</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={storeDataInFirestore}
            style={[styles.button, styles.storeButton]}
          >
            <Text style={styles.buttonText}>Store-Firestore</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={retrieveDataFromFirestore}
            style={[styles.button, styles.retrieveButton]}
          >
            <Text style={styles.buttonText}>Retrieve-Firestore</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {apiData && (
        <>
          <FlatList
            data={apiData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.dataItem}>
                <Text>ID: {item.id}</Text>
                <Text>Title: {item.title}</Text>
                <Text>Completed: {item.completed ? "Yes" : "No"}</Text>
              </View>
            )}
            style={styles.dataContainer}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonText1: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  fetchButton: {
    backgroundColor: "#28a745",
  },
  replaceButton: {
    backgroundColor: "#17a2b8",
  },
  signOutButton: {
    backgroundColor: "#007bff",
  },
  storeButton: {
    backgroundColor: "#ffc107",
  },
  retrieveButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dataContainer: {
    width: "100%",
    marginTop: 20,
  },
  dataItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cardContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  horizontalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default TodoScreen;
