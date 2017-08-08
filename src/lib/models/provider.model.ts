export interface Provider {
    login: () => void
    logout: () => void
    forgotPassword?: () => void
}
