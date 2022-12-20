import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { halperIdr } from '../../helpers';
import SPACING from '../../config/SPACING';
import colors from '../../config/Restaurant/colors';
import { useDispatch, useSelector } from 'react-redux';

const { height } = Dimensions.get('window');

const FoodStells = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Form Create Food") }>
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.listFoods}>
                    <View style={styles.food}>
                        <Image source={require('../../assets/meatPizza.png')} style={styles.image} />
                        <Text style={styles.name}>Food Name</Text>
                        <Text style={styles.description}>description</Text>
                        <Text style={styles.price}>Rp. 100.000</Text>
                    </View>
                    <View style={styles.food}>
                        <Image source={require('../../assets/meatPizza.png')} style={styles.image} />
                        <Text style={styles.name}>Food Name</Text>
                        <Text style={styles.description}>description</Text>
                        <Text style={styles.price}>Rp. 100.000</Text>
                    </View>
                    <View style={styles.food}>
                        <Image source={require('../../assets/meatPizza.png')} style={styles.image} />
                        <Text style={styles.name}>Food Name</Text>
                        <Text style={styles.description}>description</Text>
                        <Text style={styles.price}>Rp. 100.000</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: SPACING * 2,
        paddingTop: SPACING * 4
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 60
    },
    listFoods: {
        marginTop: SPACING * 2,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    food: {
        marginRight: SPACING * 2,
        width: 150,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        padding: SPACING * 2,
        marginTop: SPACING * 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: SPACING * 2
    },
    description: {
        fontSize: 12,
        color: '#999',
        marginTop: SPACING
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: SPACING
    }
})

export default FoodStells;