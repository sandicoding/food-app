import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DangerButton } from '../../components/Button'
import { getUserAction, logoutAction } from '../../redux/actions/AuthAction'

// create a
const Profile = ({ navigation }) => {
    const dispatch = useDispatch()

    const userState = useSelector((state) => state.auth);
    const { user } = userState;

    useEffect(() => {
        dispatch(getUserAction());
    }, [dispatch])

    const handleLogout = () => {
        dispatch(logoutAction(navigation))
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerProfile}>
                <Text style={styles.titleHeader}>Profile</Text>
                <Image
                    style={styles.imageProfile}
                    source={require("../../assets/restaurant/avatar.jpg")}
                />
                <Text style={styles.nameProfile}>{user?.fullname}</Text>
                <Text style={styles.emailProfile}>{user?.email}</Text>
                <View style={styles.containerButtonLogout}>
                    <DangerButton title="Logout" onPress={handleLogout} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        backgroundColor: '#fff',
    },
    containerProfile: {
        flex: 1,
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    imageProfile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
    },
    nameProfile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
    },
    emailProfile: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
    },
    containerButtonLogout: {
        alignItems: 'center',
        marginTop: 20,
    }
})

export default Profile