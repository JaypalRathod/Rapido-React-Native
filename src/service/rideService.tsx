import { Alert } from "react-native"
import { appAxios } from "./apiInterceptor"
import { router } from "expo-router"
import { resetAndNavigate } from "@/utils/Helpers"


interface coords {
    latitude: number,
    longitude: number,
    address: string
}

export const createRide = async (payload: {
    vehicle: 'bike' | 'auto' | 'cabEconomy' | 'cabPremium',
    pickup: coords,
    drop: coords
}) => {
    try {
        const res = await appAxios.post(`/ride/create`, payload)
        router.navigate({
            pathname: '/customer/liveRide',
            params: {
                id: res?.data?.ride?._id
            }
        })
    } catch (error) {
        Alert.alert("Oh no!, there was an error");
        console.log("Error: create Ride: " + error)
    }
}

export const getMyRides = async (isCustomer: boolean = true) => {
    try {
        const res = await appAxios.get(`/ride/rides`)
        const filterRides = res.data.rides?.filter((ride: any) => ride?.status != 'COMPLETED')
        if (filterRides.length > 0) {
            router.navigate({
                pathname: isCustomer ? '/customer/liveRide' : '/captain/liveRide',
                params: {
                    id: filterRides![0]?.id,
                }
            })
        }
    } catch (error) {
        Alert.alert("Oh no!, there was an error");
        console.log("Error: Get My Ride: " + error)
    }
}

export const acceptRideOffer = async (rideId: string) => {
    try {
        const res = await appAxios.patch(`/ride/accept/${rideId}`)
        resetAndNavigate({
            pathname: '/captain/liveRide',
            params: { id: rideId }
        })
    } catch (error) {
        Alert.alert("Oh no!, there was an error");
        console.log("Error: acceptRideOffer: " + error)
    }
}

export const updateRideStatus = async (rideId: string, status: string) => {
    try {
        const res = await appAxios.patch(`/ride/update/${rideId}`, { status })
        return true;
    } catch (error) {
        Alert.alert("Oh no!, there was an error");
        console.log("Error: updateRideStatus: " + error);
        return false;
    }
}