import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo } from 'react'
import { useCaptainStore } from '@/store/captainStore';
import { acceptRideOffer } from '@/service/rideService';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import { orderStyles } from '@/styles/captainStyles';
import { commonStyles } from '@/styles/commonStyles';
import { calculateDistance, vehicleIcons } from '@/utils/mapUtils';
import CustomText from '../shared/CustomText';
import { Ionicons } from '@expo/vector-icons';
import CounterButton from './CounterButton';

type VehicleType = 'bike' | 'auto' | 'cabEconomy' | 'cabPremium';

interface RideItem {
    _id: string,
    vehicle: VehicleType,
    pickup?: { address: string, latitude: number, longitude: number },
    drop?: { address: string, latitude: number, longitude: number },
    fare?: number,
    distance?: number,
}


const CaptainRidesItem: FC<{ item: RideItem, removeIt: () => void }> = ({ item, removeIt }) => {

    const { location } = useCaptainStore()

    const acceptRide = async () => {
        acceptRideOffer(item?._id);
    }

    return (
        <Animated.View style={orderStyles.container}
            entering={FadeInLeft.duration(500)}
            exiting={FadeOutRight.duration(500)}
        >
            <View style={commonStyles.flexRowBetween}>
                <View style={commonStyles.flexRow}>
                    {item.vehicle && (
                        <Image source={vehicleIcons![item.vehicle]?.icon} style={orderStyles.rideIcon} />
                    )}
                    <CustomText style={{ textTransform: 'capitalize' }} fontSize={11}>
                        {item?.vehicle}
                    </CustomText>
                </View>

                <CustomText fontSize={11} fontFamily='SemiBold'>
                    #RID{item?._id?.slice(0.5).toUpperCase()}
                </CustomText>
            </View>

            <View style={orderStyles.locationsContainer}>
                <View style={orderStyles.flexRowBase}>
                    <View>
                        <View style={orderStyles.pickupHollowCircle} />
                        <View style={orderStyles.continuousLine} />
                    </View>
                    <View style={orderStyles.infoText}>
                        <CustomText fontSize={11} numberOfLines={1} fontFamily='SemiBold'>
                            {item?.pickup?.address?.slice(0, 10)}
                        </CustomText>
                        <CustomText fontSize={9.5} numberOfLines={2} fontFamily='Medium' style={orderStyles.label}>
                            {item?.pickup?.address}
                        </CustomText>
                    </View>
                </View>

                <View style={orderStyles.flexRowBase}>
                    <View style={orderStyles.pickupHollowCircle} />
                    <View style={orderStyles.continuousLine} />
                    <View style={orderStyles.infoText}>
                        <CustomText fontSize={11} numberOfLines={1} fontFamily='SemiBold'>
                            {item?.drop?.address?.slice(0, 10)}
                        </CustomText>
                        <CustomText fontSize={9.5} numberOfLines={2} fontFamily='Medium' style={orderStyles.label}>
                            {item?.drop?.address}
                        </CustomText>
                    </View>
                </View>

            </View>

            <View style={[commonStyles.flexRowGap]}>
                <View>
                    <CustomText fontFamily='Medium' fontSize={9} style={orderStyles.label}>
                        Pickup
                    </CustomText>

                    <CustomText fontSize={11} fontFamily='SemiBold'>
                        {location && calculateDistance(item?.pickup?.latitude, item?.pickup?.longitude, location?.latitude, location?.longtitude).toFixed(2) || "--"} km
                    </CustomText>
                </View>

                <View style={orderStyles.borderLine}>
                    <CustomText fontSize={9} fontFamily='Medium' style={orderStyles.label}>
                        Drop
                    </CustomText>
                    <CustomText fontSize={9} fontFamily='Medium' style={orderStyles.label}>
                        {item?.distance?.toFixed(2)} Km
                    </CustomText>
                </View>

            </View>

            <View style={orderStyles.flexRowEnd}>
                <TouchableOpacity>
                    <Ionicons name='close-circle' size={24} color={'black'} />
                </TouchableOpacity>

                <CounterButton onCountdownEnd={removeIt} initialCount={12} onPress={acceptRide} title={'Accept'} />
            </View>

        </Animated.View>
    )
}

export default memo(CaptainRidesItem)