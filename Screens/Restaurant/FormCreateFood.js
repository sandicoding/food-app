import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { MaterialIcons as Icon, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { createFoodAction } from '../../redux/actions/FoodAction'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import COLORS from '../../consts/colors'
import { SIZES } from '../../consts/sizes'
import { FONTS } from '../../consts/fonts'

import * as ImagePicker from 'expo-image-picker';

const validationSchema = yup.object().shape({
    name: yup.string().required().label("Name"),
    description: yup.string().required().label("Description"),
    price: yup.number().required().label("Price"),
})

const FormCreateFood = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { loading } = useSelector(state => state.foods)

    const [image, setImage] = React.useState(null)

    const createFood = (values) => {
        dispatch(createFoodAction(values))
        navigation.goBack()
    }

    const onChangeUploadImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            setImage(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const deleteImage = () => {
        setImage(null)
    }

    console.log(image)

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Formik
                    initialValues={{ name: "", description: "", price: "", image: "" }}
                    onSubmit={(values) => createFood(values)}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                        <>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    onChangeText={handleChange("name")}
                                    onBlur={() => setFieldTouched("name")}
                                />
                                {touched.name && <Text style={styles.error}>{errors.name}</Text>}
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Description"
                                    onChangeText={handleChange("description")}
                                    onBlur={() => setFieldTouched("description")}
                                />
                                {touched.description && <Text style={styles.error}>{errors.description}</Text>}
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    onChangeText={handleChange("price")}
                                    onBlur={() => setFieldTouched("price")}
                                />
                                {touched.price && <Text style={styles.error}>{errors.price}</Text>}
                            </View>
                            <View style={styles.ImageContainer}>
                                {image && (
                                    <TouchableOpacity onPress={deleteImage}>
                                        <View style={styles.containerDeleteImage}>
                                            <AntDesign name="delete" size={24} color="red" />
                                            <Text style={{ color: 'red' }}>Delete Image</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}

                                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                                {!image && (
                                <TouchableOpacity onPress={pickImage}>
                                    <View style={{ width: 200, height: 50, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", borderRadius: SIZES.radius, marginTop: SIZES.padding * 2 }}>
                                        <Text>Upload Image</Text>
                                    </View>
                                </TouchableOpacity>
                                )}
                            </View>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Create</Text>
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