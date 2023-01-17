import { logout as apiLogout } from "."
import Cookies from "js-cookie"

export const useLogout = () => {
    const logout = async () => {
        Cookies.remove("currentUser")
        resp = await apiLogout()
    }
    return { logout }
}