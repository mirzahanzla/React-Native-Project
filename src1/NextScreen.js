import React, {useState} from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { myAuth } from './FirebaseFile';
import { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';

const NextScreen = ({ /*route,*/ navigation }) => {
    //const { userId } = route.params;
    useEffect(()=>{
        setTimeout(()=>{
        myAuth.onAuthStateChanged(user=>{
            const routeName = user !== null?'MainScreen':'Login';
            navigation.dispatch(StackActions.replace(routeName));
        })
        }, 3000);
    },
    []);

    // return (
    //     <View style={styles.container}>
    //         <Text style={styles.text}>Welcome to FirstScreen!</Text>
    //     </View>
    // );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default NextScreen;
