import { MMKV } from 'react-native-mmkv'


export const tokenStorage = new MMKV({
    id: 'token_storage',
    encryptionKey: "SomeSecureKey123"
})

export const storage = new MMKV({
    id: 'user_storage',
    encryptionKey: "SomeSecureKey123"
})

export const mmkvStorage = {
    setItem: (key: string, val: string) => {
        storage.set(key, val)
    },
    getItem: (key: string) => {
        const value = storage.getString(key)
        return value ?? null;
    },
    removeItem: (key: string) => {
        storage.delete(key)
    }
}