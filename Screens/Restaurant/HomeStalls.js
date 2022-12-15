import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ImageBackground, SafeAreaView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { halperIdr } from '../../helpers';
import SPACING from '../../config/SPACING';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { listOrderByStallsIdAction } from '../../redux/actions/OrderAction';
import { getIdUserAction, getUserAction } from '../../redux/actions/AuthAction';
import colors from '../../config/Restaurant/colors';

const { height } = Dimensions.get('window');

const HomeStalls = () => {

    const dispatch = useDispatch();

    const [totalOrder, setTotalOrder] = useState(0);
    const [income, setIncome] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);

    const userState = useSelector((state) => state.auth);
    const orderState = useSelector((state) => state.ordersStalls);
    
    const { user: currentUser } = userState;
    const { orders } = orderState;

    const calculateTotalOrder = () => {
        setTotalOrder(orders?.length);
    }

    const calculateIncome = () => {
        let total = 0;

        const filterOrders = orders?.filter((item) => item?.status === "Selesai");

        filterOrders?.map((item) => {
            total += item?.total;
        })

        console.log(total, "total")
        setIncome(total);
    }


    const handleRefresh = () => {
        setRefreshing(true);
        dispatch(getUserAction());
        dispatch(getIdUserAction())
        dispatch(listOrderByStallsIdAction(currentUser?.uid))
        calculateTotalOrder();
        calculateIncome()
        setRefreshing(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getUserAction());
            dispatch(getIdUserAction())
            dispatch(listOrderByStallsIdAction(currentUser?.uid))
            calculateTotalOrder();
            calculateIncome()
        }, [dispatch])
    )

    const refreshScroll = () => {}

    console.log(income, "income");
    console.log(orders, "orders");

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <View style={{ padding: SPACING * 2, marginTop: SPACING * 2 }}>
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                style={{
                                    width: SPACING * 4.5,
                                    height: SPACING * 4.5,
                                    borderRadius: SPACING * 3,
                                    marginRight: SPACING,
                                }}
                                source={require("../../assets/restaurant/avatar.jpg")}
                            />
                            <Text
                                style={{
                                    fontSize: SPACING * 1.7,
                                    fontWeight: "800",
                                    color: colors.dark,
                                }}
                            >
                                Hello, {currentUser?.fullname}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.containterWidged}>
                        <View style={styles.container}>
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Ionicons name="ios-restaurant" size={24} color="white" />
                                    <Text style={styles.title}>Total Order</Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <Text style={styles.number}>{totalOrder}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.cardIncome}>
                                <View style={styles.cardHeader}>
                                    <AntDesign name="wallet" size={24} color="white" />
                                    <Text style={styles.title}>Income</Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <Text style={styles.number}>{halperIdr(income)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    card: {
        height: height / 4,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#FF6347",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    title: {
        fontSize: 18,
        color: "#fff",
    },
    cardContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    number: {
        fontSize: 16,
        color: "#fff",
    },
    cardIncome: {
        height: height / 5,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#00BFFF",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    containterWidged: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    }
})

export default HomeStalls;