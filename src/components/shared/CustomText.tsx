import { Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@/utils/Constants';

const fontSizes = {
    h1: 24, h2: 22, h3: 20, h4: 18, h5: 16, h6: 14, h7: 10, h8: 9,
}

const CustomText: FC<CustomTextProps> = ({
    variant = 'h6',
    fontFamily = 'Regular',
    fontSize,
    style,
    children,
    numberOfLines,
    ...props
}) => {

    return (
        <Text
            style={[
                styles.text,
                { fontSize: RFValue(fontSize ? fontSize : fontSizes[variant]), fontFamily: `NotoSans-${fontFamily}` },
                style
            ]}
            numberOfLines={numberOfLines ? numberOfLines : undefined}
            {...props}
        >
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',
        color: Colors.text
    }
})

export default CustomText