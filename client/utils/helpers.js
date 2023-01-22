import { protectedRoutes } from "../consts/routes"

export const isProtectedRoute = (router) => {
    return protectedRoutes.some((item) => router.pathname.startsWith(item))
}
