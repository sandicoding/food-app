import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { MaterialIcons as Icon, AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { createFoodAction, updateFoodAction } from '../../redux/actions/FoodAction'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from '../../consts/colors'
import { SIZES } from '../../consts/sizes'
import { FONTS } from '../../consts/fonts'
import { useFocusEffect } from "@react-navigation/native";

import * as ImagePicker from 'expo-image-picker';
import { async } from '@firebase/util';

const validationSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    description: yup.string().required().label("Description"),
    price: yup.number().required().label("Price"),
})

const FormCreateFood = (props) => {

    const params = props.route.params

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { loading } = useSelector(state => state.foods)

    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [price, setPrice] = React.useState()
    const [image, setImage] = React.useState(null)
    const [fileUpload, setFileUpload] = React.useState(null)

    const createFood = (values) => {
        const request = {
            name: name,
            description: description,
            price: parseInt(price),
            image: fileUpload ? {
                uri: fileUpload,
            } : image,
            userId: params?.item ? params?.item?.userId : params?.userId,
            warung: params?.item ? params?.item?.warung : params?.warung,
        }

        if (params?.item) {
            dispatch(updateFoodAction(params?.item?.id, request, navigation))
            navigation.goBack()
        } else {
            dispatch(createFoodAction(request, navigation))
            navigation.goBack()
        }
    }

    React.useEffect(() => {
        if (params?.item) {
            setName(params?.item?.name)
            setDescription(params?.item?.description)
            // price parse to string
            const pa = params?.item?.price.toString()
            setPrice(pa)
            setImage(params?.item?.image)
        }
    }, [])

    const initialValues = {
        name: params?.item?.name || name,
        description: params?.item?.description || description,
        price: params?.item?.price || price,
        image: params?.item?.image || image,
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFileUpload(result.uri);
        }
    };

    const deleteImage = () => {
        setFileUpload(null)
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        await createFood(values)
                    }}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched, setFieldValue, values }) => (
                        <>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    value={name || ''}
                                    onChangeText={(text) => {
                                        setName(text)
                                        setFieldValue("name", name)
                                        handleChange("name")
                                    }}
                                    onBlur={() => setFieldTouched("name")}
                                />
                                {touched.name && <Text style={styles.error}>{errors.name}</Text>}
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Description"
                                    value={description || ""}
                                    onChangeText={(text) => {
                                        setDescription(text)
                                        handleChange("description")
                                        setFieldValue("description", description)
                                    }}
                                    onBlur={() => setFieldTouched("description")}
                                />
                                {touched.description && <Text style={styles.error}>{errors.description}</Text>}
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    value={price || ""}
                                    onChangeText={(text) => {
                                        setPrice(text)
                                        handleChange("price")
                                        setFieldValue("price", price)
                                    }}
                                    onBlur={() => setFieldTouched("price")}
                                />
                                {touched.price && <Text style={styles.error}>{errors.price}</Text>}
                            </View>
                            <View style={styles.ImageContainer}>
                                {image || fileUpload ? (
                                    <TouchableOpacity onPress={deleteImage}>
                                        <View style={styles.containerDeleteImage}>
                                            <AntDesign name="delete" size={24} color="red" />
                                            <Text style={{ color: 'red' }}>Delete Image</Text>
                                        </View>
                                    </TouchableOpacity>
                                ): null}

                                {image || fileUpload ? <Image source={{ uri: image ? image : fileUpload  }} style={{ width: 200, height: 200 }} /> : null}
                                {!image && !fileUpload ? (
                                <TouchableOpacity onPress={pickImage}>
                                    <View style={{ width: 200, height: 50, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", borderRadius: SIZES.radius, marginTop: SIZES.padding * 2 }}>
                                        <Text>Upload Image</Text>
                                    </View>
                                </TouchableOpacity>
                                ) : null}
                            </View>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>{params?.item ? 'Update' : 'Create' }</Text>
                            </TouchableOpacity>
                        </>
                    )
                    }
                </Formik >
            </View >
        </KeyboardAwareScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding * 2,
    },
    inputContainer: {
        marginTop: SIZES.padding * 2,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.radius,
        height: 50,
        paddingHorizontal: SIZES.padding,
        color: COLORS.black,
        ...FONTS.body3,
    },
    error: {
        color: COLORS.red,
        ...FONTS.body4,
    },
    button: {
        height: 50,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.radius,
        marginTop: SIZES.padding * 2,
    },
    buttonText: {
        color: COLORS.white,
        ...FONTS.h3,
    },
    ImageContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: SIZES.padding * 2,
    },
    containerDeleteImage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: SIZES.padding * 2,
        marginBottom: SIZES.padding * 1,
    }
})

export default FormCreateFood