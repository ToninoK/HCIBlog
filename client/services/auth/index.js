import api from "../../pages/api";


export const login = async (data) => {
    const resp = await api.post("/users/login", data)
    return {
        status: resp.status,
        data: {
            accessToken: resp.data.access_token,
            username: resp.data.email,
            expiredAt: resp.data.expires_at,
        }
    }
}

export const logout = async () => {
    const resp = await api.get("/users/logout")
    return resp
}
