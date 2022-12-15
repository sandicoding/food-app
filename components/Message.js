import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Message = ({ text, color, backgroundColor }) => {

    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [])

    return (
        show && (
            <View style={[styles.container, { backgroundColor }]}>
                <Text style={[styles.text, { color }]}>{text}</Text>
            </View>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
    }
})

export default Message