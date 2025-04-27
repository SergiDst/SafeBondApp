import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuthContext } from '../context/ContextLogin';
import { RegisterComponent } from './RegisterComponent';
import { LoginComponent } from './LoginComponent';
export const Form = () => {

    const { isLoggingIn } = useAuthContext()

    return (
        <>
            <View style={styles.cont}>
                {isLoggingIn ? (
                    <RegisterComponent />
                ) : (
                    <LoginComponent />
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cont: {
        position: 'relative',
        marginTop: 20,
        justifyContent: 'flex-start',
        width: '90%',
        marginHorizontal: 'auto'
    },
});