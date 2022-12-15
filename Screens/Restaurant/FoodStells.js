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
                    <TouchableOpacity>
                        <AntDesign name="plusOutlined" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listFoods}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.food}>
                        <Image source={require('../../assets/meatPizza.png')} style={styles.image} />
                        <Text style={styles.name}>Food Name</Text>
                        <text style={styles.description}>description</text>
                        <Text style={styles.price}>Rp. 100.000</Text>
                    </View>
                    <View style={styles.food}>
                        <Image source={require('../../assets/meatPizza.png')} style={styles.image} />
                        <Text style={styles.name}>Food Name</Text>
                        <text style={styles.description}>description</text>
                        <Text style={styles.price}>Rp. 100.000</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: SPACING * 2,
        paddingTop: SPACING * 2
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 60
    },
    listFoods: {
        marginTop: SPACING * 2
    },
    food: {
        marginRight: SPACING * 2,
        width: 150,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        padding: SPACING * 2
    },
    image: {
        width: 150,
        height: 150,
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