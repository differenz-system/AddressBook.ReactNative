import React from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions, Appearance } from 'react-native';
import { AppColors, font } from "../Constant";
const { width, height } = Dimensions.get('window')
import { useTheme } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';

DataViewComponent = (props, ref) => {
   
    const { colors } = useTheme();
    const colorScheme = Appearance.getColorScheme();
    return (
        <View style={{ marginVertical: hp('2') }}>
            <Text style={[styles.HeadrTxt, { color: colors.text }]}>{props.HeaderTxt}</Text>
            <View style={[styles.TextInputView, { shadowColor: colorScheme == 'dark' ? AppColors.WHITE : AppColors.BLACK, backgroundColor: colors.background }]}>
                <TextInput
                    ref={props.innerRef}
                    underlineColorAndroid="transparent"
                    placeholder={props.placeholder}
                    placeholderTextColor={AppColors.DARK_GRAY}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}
                    returnKeyType={props.returnKeyType}
                    secureTextEntry={props.secureTextEntry}
                    returnKeyLabel={props.returnKeyLabel}
                    numberOfLines={props.numberOfLines}
                    multiline={props.multiline}
                    maxLength={props.maxLength}
                    maxHeight={props.maxHeight}
                    onSubmitEditing={props.onSubmitEditing}
                    onFocus={props.onFocus}
                    style={[styles.TextInputTxt, { backgroundColor: colors.background, color: colors.text, }]}
                    blurOnSubmit={props.blurOnSubmit}
                    value={props.value}
                    autoCapitalize={props.autoCapitalize}
                    onContentSizeChange={props.onContentSizeChange}
                    onEndEditing={props.onEndEditing}
                    ellipsizeMode='head'
                />
            </View>
        </View>
    )
}

export default DataView = React.forwardRef((props, ref) => {
    return (<DataViewComponent innerRef={ref} {...props} />);
});

const styles = StyleSheet.create({
    TextInputView: {
        flexDirection: 'row',
        borderColor: AppColors.DDARK_GREEN,
        borderRadius: 8,
        borderWidth: hp('0.15'),
        marginBottom: hp('1'),
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 8,

    },
    TextInputTxt: {
        flex: 1,
        fontSize: font.FONT_18,
        paddingHorizontal: 5,
        borderRadius: 8,
        paddingVertical: hp('1.2'),
    },
    HeadrTxt: {
        marginBottom: hp('1'),
        fontSize: font.FONT_18,
        fontWeight: font.FONT_WEIGHT_600,
    }
})