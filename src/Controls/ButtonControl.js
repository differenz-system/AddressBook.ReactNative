import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { AppColors, font } from "../Constant";
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement'
const { width, height } = Dimensions.get('window')

export default class ButtonControl extends React.Component {

    render = () => {
        return (
            <View style={styles.View}>
                <LinearGradient
                    useAngle={true}
                    angle={90}
                    colors={[AppColors.LIGHT_GREEN, AppColors.DARK_GREEN, AppColors.DDARK_GREEN]}
                    style={styles.ButtonControl}>
                    <TouchableOpacity onPress={this.props.ButtonPress}>
                        <Text style={styles.font}>{this.props.ButtonTitle}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    View: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.60,
        shadowRadius: 4.65,
        elevation: 8,
        marginTop: hp('2'),
    },
    ButtonControl: {
        marginTop: hp('1'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        paddingVertical: hp('1.5'),
    },
    font: {
        fontSize: font.FONT_18,
        color: AppColors.WHITE,
        fontWeight: font.FONT_WEIGHT_600
    },
})
