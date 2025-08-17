import api  from "../Services/api";

export const signup = async (userData) => {
    try {
        const response = await api.post("/api/auth/register", userData);
        return response.data;

    } catch (error) {
        throw new Error(error.response?.data?.error || "Signup Failed");
    }
};

export const login = async (userData) => {
    try {
        const response = await api.post("/api/auth/login", userData);
        console.log(response.data)
        return response.data;
        
    } catch (error) {
        throw new Error(error.response?.data?.error || "Login Failed");
    }
};


export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
};
