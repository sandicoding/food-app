import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import { PrimaryButton } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { halperIdr } from '../../helpers';
import { clearCart, decreaseQuantity, increaseQuantity } from '../../redux/actions/CartAction';
import { getIdUserAction, getUserAction } from '../../redux/actions/AuthAction';
import { checkoutAction } from '../../redux/actions/CheckoutAction';
import { useFocusEffect } from '@react-navigation/native';


const CartScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const userState = useSelector((state) => state.auth);
    const { user } = userState;

    const cartsState = useSelector((state) => state.cart);
    const { cart } = cartsState;

    const total = cart?.reduce((a, b) => a + (b.qty * b.price), 0);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getIdUserAction())
            // dispatch(clearCart())
        }, [dispatch])
    )

    const handleDescrement = (item) => {
        dispatch(decreaseQuantity(item))
    }

    const handleIncrement = (item) => {
        dispatch(increaseQuantity(item))
    }

    const handleOrder = () => {
        const data = {
            total: total,
            Pay: 'Belum Bayar',
            status: 'Cooking',
            date: new Date(),
            orderID: Math.random().toString(36).substr(2, 9),
            name: cart?.map((item) => {
                return {
                    name: item.name,
                    qty: item.qty,
                }
            }),
            userId: user?.uid,
            warungId: cart[0]?.userId,
        }

        dispatch(checkoutAction(data, navigation))
    }

    const CartCard = ({ item }) => {
        return (
            <View style={style.cartCard}>
                <Image source={{ uri: item.image }} style={{ height: 80, width: 80 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontSize: 13, color: COLORS.grey }}>
                        {item.description}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.price}</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item?.qty}</Text>
                    <View style={style.actionBtn}>
                        <TouchableOpacity onPress={() => handleDescrement(item)}>
                            <Icon name="remove" size={25} color={COLORS.white} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleIncrement(item)}>
                            <Icon name="add" size={25} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={cart}
                renderItem={({ item }) => <CartCard item={item} />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={() => (
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 15,
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Total Price
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Rp {halperIdr(total)}</Text>
                        </View>
                        <View style={{ marginHorizontal: 30 }}>
                            <PrimaryButton title="CHECKOUT" onPress={handleOrder} />
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default CartScreen;
