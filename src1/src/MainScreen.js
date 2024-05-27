import React, {useState} from 'react';
import { Text, StyleSheet, View, Button, Touchable } from 'react-native';
import { myAuth } from './FirebaseFile';
import {onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const MainScreen = ({ /*route,*/ navigation }) => {
    //const { userId } = route.params;
    // useEffect(()=>{
    //     onAuthStateChanged(user=>{
    //         const routeName = user !== null?'MainScreen':'Login';
    //     })
    // },[])

    return (
        <View style={styles.container}>
            <Text>{myAuth.currentUser.email}</Text>
            <Text>{myAuth.currentUser.uid}</Text>

            <TouchableOpacity  onPress={async ()=>{
                    await myAuth.signOut();
                    navigation.dispatch(StackActions.replace('FirstScreen'));
                }}>
                <Text>SignOut</Text>
            </TouchableOpacity>
        </View>
    );
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

export default MainScreen;
