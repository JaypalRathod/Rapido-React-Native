import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { authStyles } from '@/styles/authStyles'
import { commonStyles } from '@/styles/commonStyles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomText from '@/components/shared/CustomText';

const Auth = () => {

    const [phone, setPhone] = useState('')

    return (
        <SafeAreaView style={authStyles.container}>
            <ScrollView contentContainerStyle={authStyles.container}>

                <View style={commonStyles.flexRowBetween}>
                    <Image source={require('../../assets/images/logo_t.png')} style={authStyles.logo} />
                    <TouchableOpacity style={authStyles.flexRowGap}>
                        <MaterialIcons name="help" size={18} color={'grey'} />
                        <CustomText fontFamily='Medium' variant='h7'>Help</CustomText>
                    </TouchableOpacity>
                </View>

                <CustomText fontFamily='Medium' variant='h6'>
                    Whats your number ?
                </CustomText>

                <CustomText fontFamily='Regular' variant='h7'>
                    Enter your phone number to proceed
                </CustomText>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Auth