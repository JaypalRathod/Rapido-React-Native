import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { useWS } from '@/service/WSProvider'
import { rideStyles } from '@/styles/rideStyles';
import { commonStyles } from '@/styles/commonStyles';
import { vehicleIcons } from '@/utils/mapUtils';
import CustomText from '../shared/CustomText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { resetAndNavigate } from '@/utils/Helpers';

type VehicleType = 'bike' | 'auto' | 'cabEconomy' | 'cabPremium';

interface RideItem {
    _id: string,
    vehicle: VehicleType,
    pickup?: { address: string },
    drop?: { address: string },
    fare?: number,
    otp?: string,
    captain: any,
    status: string
}

const LiveTrackingSheet: FC<{ item: RideItem }> = ({ item }) => {

    const { emit } = useWS()

    return (
        <View>
            <View style={rideStyles.headerContainer}>
                <View style={commonStyles.flexRowGap}>
                    {item?.vehicle && (
                        <Image source={vehicleIcons[item?.vehicle]?.icon} style={rideStyles.rideIcon} />
                    )}
                    <View>
                        <CustomText>{item?.status === "START" ? "Captain near you" : item?.status === "ARRIVED" ? "HAPPY JOURNEY" : "WHOO.., Ride Complete"}</CustomText>

                        <CustomText>{item?.status === 'START' ? `OTP - ${item?.otp}` : ".."}</CustomText>
                    </View>
                </View>

                <CustomText fontSize={11} fontFamily='Medium' numberOfLines={1}>
                    +91 {item?.captain?.phone && item?.captain?.phone?.slice(0, 5) + " " + item?.captain?.phone?.slice(5)}
                </CustomText>
            </View>

            <View style={{ padding: 10 }}>
                <CustomText fontFamily='SemiBold' fontSize={12}>Location Details</CustomText>

                <View style={[commonStyles.flexRowGap, { marginVertical: 15, width: '90%' }]}>
                    <Image source={require('@/assets/icons/marker.png')} style={rideStyles.pinIcon} />
                    <CustomText fontSize={10} numberOfLines={2}>{item?.pickup?.address}</CustomText>
                </View>

                <View style={[commonStyles.flexRowGap, { width: '90%' }]}>
                    <Image source={require('@/assets/icons/drop_marker.png')} style={rideStyles.pinIcon} />
                    <CustomText fontSize={10} numberOfLines={2}>{item?.drop?.address}</CustomText>
                </View>

                <View style={{ marginVertical: 20 }}>
                    <View style={[commonStyles.flexRowBetween]}>
                        <View style={[commonStyles.flexRow]}>
                            <MaterialCommunityIcons name='credit-card' size={24} color={'black'} />
                            <CustomText style={{ marginLeft: 10 }} fontFamily='SemiBold' fontSize={12}>Payment</CustomText>
                        </View>

                        <CustomText fontFamily='Bold' fontSize={14}>₹ {item?.fare?.toFixed(2)}</CustomText>

                    </View>

                    <CustomText fontSize={10}>Payment via Cash</CustomText>
                </View>

            </View>

            <View style={rideStyles.bottomButtonContainer}>
                <TouchableOpacity style={rideStyles.cancelButton} onPress={() => emit('cancelRide', item?._id)}>
                    <CustomText style={rideStyles.cancelButtonText}>Cancel</CustomText>
                </TouchableOpacity>

                <TouchableOpacity style={rideStyles.backButton2} onPress={() => {
                    if (item?.status === 'COMPLETED') {
                        resetAndNavigate('/customer/home')
                        return
                    }
                }}>
                    <CustomText style={rideStyles.backButtonText}>Back</CustomText>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default LiveTrackingSheet