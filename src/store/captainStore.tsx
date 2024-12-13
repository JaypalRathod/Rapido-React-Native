import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './Storage';

type CustomLocation = {
    latitude: number,
    longtitude: number,
    address: string,
    heading: number
} | null;

interface CaptionStoreProps {
    user: any;
    location: CustomLocation;
    onDuty: boolean;
    setUser: (data: any) => void;
    setOnDuty: (data: boolean) => void;
    setLocation: (data: CustomLocation) => void;
    clearCaptainData: () => void;
}

export const useCaptainStore = create<CaptionStoreProps>()(
    persist(
        (set) => ({
            user: null,
            location: null,
            onDuty: false,
            setUser: (data) => set({ user: data }),
            setLocation: (data) => set({ location: data }),
            setOnDuty: (data) => set({ onDuty: data }),
            clearCaptainData: () => set({ user: null, location: null, onDuty: false, }),
        }),
        {
            name: 'caption-store',
            partialize: (state) => ({
                user: state.user
            }),
            storage: createJSONStorage(() => mmkvStorage)
        }
    )
)