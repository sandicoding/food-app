import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const loginService = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user))
            })
            .catch((error) => {
                reject(error)
            });
    })
}

export const signupService = (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                localStorage.setItem("user", JSON.stringify(user))
            })
            .catch((error) => {
                reject(error)
            });
    })
}