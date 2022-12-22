import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../config/Restaurant/colors';

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.yellow} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading;
