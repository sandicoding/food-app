import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore/lite';


export const loginService = (email, password, navigation) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return user
            })
            .catch((error) => {
                reject(error)
            });
    })
}

export const signupService = (fullname, email, password, role, navigation) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const ref = doc(db, "users", result.user.uid)
                setDoc(ref, {
                    fullname: fullname,
                    email: email,
                    role: role
                }).then(() => {
                    navigation.replace("Login")
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            });
    })
}