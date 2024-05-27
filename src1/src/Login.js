/*
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from './FirebaseFile';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [age, setAge] = useState('');
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');

  const handleLogin = async () => {
    const usersCollectionRef = collection(db, 'users');
    const userQuerySnapshot = await getDocs(
      query(usersCollectionRef, where('email', '==', email), where('password', '==', password))
    );
  
    if (userQuerySnapshot.empty) {
      setErrorMessage('Error: Invalid email or password.');
      return;
    }
  
    const userData = userQuerySnapshot.docs[0].data();
    userData.id = userQuerySnapshot.docs[0].id;
    setUserData(userData);
  }; 

  const handleUpdateProfile = async (fullName, rollNo) => {
    const userDocRef = doc(db, 'users', userData.id);
    try {
      await updateDoc(userDocRef, {
        age: age,
        fullName: fullName,
        rollNo: rollNo,
      });
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  return (
    <View behavior='padding' style={styles.container}>
      {userData ? (
        <View style={styles.profileContainer}>
          <Text>Email: {userData.email}</Text>
          <TextInput
            placeholder="Age"
            onChangeText={text => setAge(text)}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Full Name"
            onChangeText={text => setFullName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Roll No"
            onChangeText={text => setRollNo(text)}
            style={styles.input}
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => handleUpdateProfile(fullName, rollNo)} // Pass fullName and rollNo to handleUpdateProfile
            style={styles.button}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text>{errorMessage}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  profileContainer: {
    alignItems: 'center',
  },
});
*/


import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { myAuth } from './FirebaseFile';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from react-navigation
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // Initialize navigation

    const handleSignIn = () => {
      myAuth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.uid); // Print the user ID
                navigation.navigate('NextScreen', { userId: user.uid }); // Navigate to next screen with user ID in props
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    };

    const handleSignUp = () => {
      navigation.navigate('SignUpScreen');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                style={styles.input}
            />
            <TouchableOpacity
                onPress={handleSignIn}
                style={[styles.button, styles.signInButton]}
            >
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.signUpButton]}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '80%',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    signInButton: {
        backgroundColor: '#007bff',
    },
    signUpButton: {
        backgroundColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
