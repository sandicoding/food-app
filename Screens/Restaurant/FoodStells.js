import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { halperIdr } from '../../helpers';
import SPACING from '../../config/SPACING';
import colors from '../../config/Restaurant/colors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, listFoodByStallsIdAction } from '../../redux/actions/FoodAction';
import { getIdUserAction, getUserAction } from '../../redux/actions/AuthAction';
import { useFocusEffect } from "@react-navigation/native";
import Loading from '../../components/Loading';

const { height } = Dimensions.get('window');

const FoodStells = (props) => {
    const dispatch = useDispatch();

    const userState = useSelector((state) => state.auth);
    const foodsState = useSelector((state) => state.foods);

    const { user: currentUser } = userState;
    const { foods, loading, error } = foodsState;

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getUserAction());
            dispatch(getIdUserAction())
            dispatch(listFoodByStallsIdAction(currentUser?.uid))
        }, [dispatch])
    )

    const handleDelete = (id) => {
        dispatch(deleteFoodAction(id))
    }

    if(error) {
        return (
            <View style={styles.container}>
                <Text>No Data</Text>
            </View>
        )
    }

    if(loading) {
        return <Loading/>
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Form Create Food", { userId: currentUser?.uid, warung: currentUser?.fullname })}>
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.listFoods}>
                    {foods?.map((item, index) => (
                        <View style={styles.foodContainer} key={index}>
                            <View style={styles.foodAction}>
                                <TouchableOpacity onPress={() => props.navigation.navigate("Form Create Food", { item  })}>
                                    <AntDesign name="edit" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item?.id)}>
                                    <AntDesign name="delete" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.food}>
                                <Image source={{ uri: item?.image }} style={styles.image} />
                                <Text style={styles.name}>{item?.name}</Text>
                                <Text style={styles.description}>{item?.description}</Text>
                                <Text style={styles.price}>Rp. {halperIdr(item?.price)}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView >
        </View >
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
        marginTop: SPACING * 2,
        textAlign: 'center'
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
    },
    foodContainer: {
        display: 'flex',
    },
    foodAction: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 80,
        height: 50,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: SPACING,
        zIndex: 1,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

export default FoodStells;