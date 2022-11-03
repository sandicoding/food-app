
export const roleBased = () => {
    const role = localStorage.getItem("role");
    if (role === "user") {
        return true;
    }
    return false;
}
