import { login as apiLogin } from "."
import Cookies from "js-cookie"

export const useLogin = () => {
    const login = async (data) => {
        const resp = await apiLogin(data)
        if (resp.status == 200) {
            Cookies.set("currentUser", JSON.stringify(resp.data))
        }
        return resp;
    }
    return { login }
}
