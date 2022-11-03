
export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user))
            } else {
                resolve(false);
            }
        })
    })
}