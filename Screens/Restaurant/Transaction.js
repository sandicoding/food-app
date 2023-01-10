import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { halperIdr } from '../../helpers';
import { getIdUserAction } from '../../redux/actions/AuthAction';
import { checkoutListAction } from '../../redux/actions/CheckoutAction';

const Transaction = () => {

    const dispatch = useDispatch();

    const userState = useSelector((state) => state.auth);
    const checkoutState = useSelector((state) => state.orders);

    const { user } = userState;
    const { transactions } = checkoutState;

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getIdUserAction())
            dispatch(checkoutListAction(user?.uid))
        },[dispatch, user?.uid])
    )

    const nanosecondsToTime = (nanoseconds) => {
        
        const date = new Date(nanoseconds*1000);

        const hours = date?.getHours();
        const minutes = date?.getMinutes();
        return `${hours}:${minutes}`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.header}>Transaction</Text>
            </View>
            <View style={styles.containerList}>
                <FlatList
                    data={transactions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemName}>Order ID: {item?.orderID}</Text>
                                <Text style={styles.itemTime}>{nanosecondsToTime(item?.date?.seconds)}</Text>
                            </View>
                            <View style={styles.itemBodyFood}>
                                <FlatList
                                    data={item?.name}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.itemBodyFood}>
                                            <Text style={styles.itemTitle}>{item?.name}</Text>
                                            <Text style={styles.itemStatus}>x{item?.qty}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={styles.itemBody}>
                                <Text style={styles.itemTitle}>total: </Text>
                                <Text style={styles.itemStatus}>Rp{halperIdr(item?.total)}</Text>
                            </View>
                            <View style={styles.itemBody}>
                                <Text style={styles.itemTitle}>Status: </Text>
                                <Text style={item?.status === 'Cooking' ? styles.itemStatusProccessCooking : styles?.itemStatusProccessDone}>{item?.status}</Text>
                            </View>
                            <View style={styles.itemBody}>
                                <Text style={styles.itemTitle}>Pay: </Text>
                                <Text style={item?.Pay === 'Belum Bayar' ? styles.itemStatusProccessUnpaid : styles?.itemStatusProccessAlreadyPaid}>{item?.Pay}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    containerHeader: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',

    },
    containerList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    itemContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    itemTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    itemBody: {
        flexDirection: 'row',
        marginTop: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    itemStatus: {
        fontSize: 16,
    },
    itemStatusProccessCooking: {
        fontSize: 16,
        color: '#FFC107',
    },
    itemStatusProccessDone: {
        fontSize: 16,
        color: '#4CAF50',
    },
    itemStatusProccessUnpaid: {
        fontSize: 16,
        color: '#F44336',
    },
    itemStatusProccessAlreadyPaid: {
        fontSize: 16,
        color: '#4CAF50',
    },
    itemBodyFood : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
})

export default Transaction