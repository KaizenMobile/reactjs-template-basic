import API from './APIUtils'

export function login(email: string, password: string) {
    return API.post('/signin', {email, password});
}