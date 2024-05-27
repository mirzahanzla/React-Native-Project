// // // import React, { useState, useEffect, useRef } from "react";
// // // import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated, Easing } from "react-native";
// // // import { myAuth } from "./FirebaseFile";

// // // export default function MainScreen({ navigation }) {
// // //   const [todos, setTodos] = useState([]);
// // //   const [scaleValue] = useState(new Animated.Value(1));

// // //   const handleLogout = async () => {
// // //     try {
// // //       await myAuth.signOut();
// // //       navigation.navigate("Login");
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   };

// // //   const fetchData = async () => {
// // //     try {
// // //       const response = await fetch("https://jsonplaceholder.typicode.com/todos");
// // //       const data = await response.json();
// // //       setTodos(data);
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   };

// // //   const handlePressIn = () => {
// // //     Animated.spring(scaleValue, {
// // //       toValue: 0.95,
// // //       useNativeDriver: true,
// // //     }).start();
// // //   };

// // //   const handlePressOut = () => {
// // //     Animated.spring(scaleValue, {
// // //       toValue: 1,
// // //       friction: 3,
// // //       tension: 40,
// // //       useNativeDriver: true,
// // //     }).start();
// // //   };

// // //   const animatedStyle = {
// // //     transform: [{ scale: scaleValue }],
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.welcomeText}>Welcome, {myAuth.currentUser?.email}</Text>
// // //       <View style={styles.buttonContainer}>
// // //         <TouchableOpacity
// // //           activeOpacity={0.7}
// // //           onPressIn={handlePressIn}
// // //           onPressOut={handlePressOut}
// // //           onPress={handleLogout}
// // //         >
// // //           <Animated.View style={[styles.button, animatedStyle]}>
// // //             <Text style={styles.buttonText}>Logout</Text>
// // //           </Animated.View>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity
// // //           activeOpacity={0.7}
// // //           onPressIn={handlePressIn}
// // //           onPressOut={handlePressOut}
// // //           onPress={fetchData}
// // //         >
// // //           <Animated.View style={[styles.button, animatedStyle]}>
// // //             <Text style={styles.buttonText}>Fetch Todos</Text>
// // //           </Animated.View>
// // //         </TouchableOpacity>
// // //       </View>
// // //       <FlatList
// // //         data={todos}
// // //         keyExtractor={(item) => item.id.toString()}
// // //         renderItem={({ item }) => (
// // //           <View style={styles.item}>
// // //             <Text style={styles.itemText}>{item.title}</Text>
// // //             <Text style={styles.itemStatus}>{item.completed ? "Completed" : "Pending"}</Text>
// // //           </View>
// // //         )}
// // //         contentContainerStyle={styles.list}
// // //       />
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 20,
// // //     justifyContent: "center",
// // //     backgroundColor: "#f5f5f5",
// // //   },
// // //   welcomeText: {
// // //     fontSize: 24,
// // //     fontWeight: "bold",
// // //     textAlign: "center",
// // //     marginBottom: 20,
// // //   },
// // //   buttonContainer: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-around",
// // //     marginBottom: 20,
// // //   },
// // //   button: {
// // //     backgroundColor: "green",
// // //     borderRadius: 20,
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 24,
// // //     marginBottom: 16,
// // //   },
// // //   buttonText: {
// // //     fontSize: 15,
// // //     color: "white",
// // //     fontWeight: "bold",
// // //     textAlign: "center",
// // //   },
// // //   list: {
// // //     flexGrow: 1,
// // //   },
// // //   item: {
// // //     backgroundColor: "#fff",
// // //     padding: 15,
// // //     borderRadius: 10,
// // //     marginBottom: 10,
// // //     elevation: 2,
// // //   },
// // //   itemText: {
// // //     fontSize: 18,
// // //     fontWeight: "bold",
// // //   },
// // //   itemStatus: {
// // //     fontSize: 14,
// // //     color: "#666",
// // //   },
// // // });


import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated } from "react-native";
import { myAuth } from "./FirebaseFile";

export default function MainScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [scaleValue] = useState(new Animated.Value(1));

  const handleLogout = async () => {
    try {
      await myAuth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  const navigateToTodoScreen = () => {
    navigation.navigate("TodoScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {myAuth.currentUser?.email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleLogout}
        >
          <Animated.View style={[styles.button, animatedStyle]}>
            <Text style={styles.buttonText}>Logout</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={fetchData}
        >
          <Animated.View style={[styles.button, animatedStyle]}>
            <Text style={styles.buttonText}>Fetch Todos</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={navigateToTodoScreen}
        >
          <Animated.View style={[styles.button, animatedStyle]}>
            <Text style={styles.buttonText}>Go to Todo Screen</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemStatus}>{item.completed ? "Completed" : "Pending"}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgb(255, 0, 0)", // Red color
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemStatus: {
    fontSize: 14,
    color: "#666",
  },
});
