import { Platform, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {RFValue} from '../Utils/RFValueData'
let deviceModal = DeviceInfo.getModel()
const { height, width } = Dimensions.get("window")

let Condtion = (deviceModal == 'iPhone 8'
    || deviceModal == 'iPhone 8 Plus'
    || deviceModal == 'iPhone 7'
    || deviceModal == 'iPhone 7 Plus'
    || deviceModal == 'iPhone 6'
    || deviceModal == 'iPhone 6s'
    || deviceModal == 'iPhone 6 Plus'
    || deviceModal == 'iPhone 6s Plus'
    || deviceModal == 'iPhone 5s'
    || deviceModal == 'iPhone 5'
    || deviceModal == 'iPhone 5C'
    || deviceModal == 'iPhone SE'
    || deviceModal == 'iPhone SE 2')


export const font = {

    FONT_WEIGHT_400: '400',
    FONT_WEIGHT_200: '200',
    FONT_WEIGHT_600: '600',
    FONT_WEIGHT_800: '800',

    CONDITION: Condtion,
    IS_IOS: Platform.OS == 'ios',

    FONT_10: RFValue(10),
    FONT_12: RFValue(12),
    FONT_14: RFValue(14),
    FONT_16: RFValue(16),
    FONT_18: RFValue(18),
    FONT_20: RFValue(20),
    FONT_22: RFValue(22),
    FONT_25: RFValue(25),
}