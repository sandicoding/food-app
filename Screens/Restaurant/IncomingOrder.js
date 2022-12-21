import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { halperIdr } from '../../helpers';
import SPACING from '../../config/SPACING';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { listOrderByStallsIdAction } from '../../redux/actions/OrderAction';
import { getIdUserAction, getUserAction } from '../../redux/actions/AuthAction';
import COLORS from '../../consts/colors';
import { acceptOrderAction, acceptPaymentAction } from '../../redux/actions/AcceptOrderAction';

const IncomingOrder = () => {

    const dispatch = useDispatch();

    const ordersStallsState = useSelector((state) => state.ordersStalls);
    const { orders } = ordersStallsState;

    const userState = useSelector((state) => state.auth);
    const { user: currentUser } = userState;

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getUserAction());
            dispatch(getIdUserAction())
            dispatch(listOrderByStallsIdAction(currentUser?.uid))
        }, [dispatch])
    )

    const handleReadyOrder = (item) => {
        dispatch(acceptOrderAction(item?.id))
    }

    const handlePaymentOrder = (item) => {
        dispatch(acceptPaymentAction(item?.id))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerText}>List Orders</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.contentHeaderText}>Orders</Text>
                </View>
                <View style={styles.contentBody}>
                    {orders?.map((item, index) => (
                        <View key={index} style={styles.listOrder}>
                            <View style={styles.listOrderHeader}>
                                <View style={styles.listOrderHeaderLeft}>
                                    <Text style={styles.listOrderHeaderText}>Order ID: {item?.orderID}</Text>
                                    <Text style={styles.listOrderHeaderStatus}>Status: {item?.status}</Text>
                                    <Text style={item?.Pay === 'Belum Bayar' ? styles.listOrderHeaderStatusPayment : styles.listOrderHeaderStatusPaymentSuccess }>Payment: {item?.Pay}</Text>
                                </View>
                                <View style={styles.listOrderHeaderRight}>
                                    <Text style={styles.listOrderHeaderText}>Total: {halperIdr(item?.total)}</Text>
                                </View>
                            </View>
                            <View style={styles.listOrderBody}>
                                <View style={styles.listOrderBodyLeft}>
                                    {item?.name?.map((item, index) => (
                                        <View key={index}>
                                            <View key={index} style={styles.listOrderBodyItem}>
                                                <Text style={styles.listOrderBodyText}>{item?.name} x {item?.qty}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.listOrderBodyRight}>
                                    {item?.status === "Cooking" && (
                                        <TouchableOpacity style={styles.buttonReady} onPress={() => handleReadyOrder(item)}>
                                            <Text style={styles.buttonReadyText}>Ready</Text>
                                        </TouchableOpacity>
                                    )}
                                    {item?.Pay === "Belum Bayar" && (
                                        <TouchableOpacity onPress={() => handlePaymentOrder(item)}>
                                            <View style={styles.buttonPay} >
                                                <Text style={styles.buttonPayText}>Pay</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flex: 1,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SPACING * 2,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: SPACING
    },
    content: {
        flex: 9,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: SPACING * 2,
    },
    contentHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: SPACING * 2
    },
    contentHeaderText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    contentBody: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: SPACING * 2,
    },
    listOrder: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginBottom: SPACING * 2,
        padding: SPACING * 2,
        elevation: 5
    },
    listOrderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SPACING
    },
    listOrderHeaderLeft: {
        flexDirection: "row",
        flexDirection: "column"
    },
    listOrderHeaderText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    listOrderHeaderRight: {
        flexDirection: "row",
        alignItems: "center"
    },
    listOrderBody: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    listOrderBodyLeft: {
        flex: 1,
        marginRight: SPACING
    },
    listOrderBodyItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SPACING
    },
    listOrderBodyText: {
        fontSize: 16
    },
    listOrderBodyRight: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonReady: {
        backgroundColor: COLORS.primary,
        padding: SPACING,
        borderRadius: 10
    },
    buttonReadyText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold"
    },
    buttonPay: {
        backgroundColor: COLORS.blue,
        padding: SPACING,
        borderRadius: 10
    },
    buttonPayText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold"
    },
    listOrderHeaderStatus: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.blue
    },
    listOrderHeaderStatusPayment: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.red
    },
    listOrderHeaderStatusPaymentSuccess: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.green
    }

})



export default IncomingOrder