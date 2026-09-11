import { type AuthUser } from "@/store/slices/authSlice";
const authMapper = (user: any): AuthUser => {
    return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.username || "",
    }
}

export default authMapper;

