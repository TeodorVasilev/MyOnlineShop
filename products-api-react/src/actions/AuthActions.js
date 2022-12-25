export function setAuthState (value) {
    return {type: 'AuthState', payload: value}
}

export function setUser (value) {
    return {type: 'User', payload: value}
}