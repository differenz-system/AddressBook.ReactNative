import {Platform,Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
const { height, width } = Dimensions.get("window")
let deviceModal=DeviceInfo.getModel()

let Condtion= (deviceModal=='iPhone 8' 
|| deviceModal=='iPhone 8 Plus' 
|| deviceModal=='iPhone 7' 
|| deviceModal=='iPhone 7 Plus' 
|| deviceModal=='iPhone 6' 
|| deviceModal=='iPhone 6s' 
|| deviceModal=='iPhone 6 Plus' 
|| deviceModal=='iPhone 6s Plus'
|| deviceModal=='iPhone 5s' 
|| deviceModal=='iPhone 5' 
|| deviceModal=='iPhone 5C' 
|| deviceModal=='iPhone SE'
|| deviceModal=='iPhone SE 2')

let IsIos=(Platform.OS=='ios')

export const font ={
   
    FONT_WEIGHT_400:'400',
    FONT_WEIGHT_200:'200',
    FONT_WEIGHT_600:'600',
    FONT_WEIGHT_800:'800',
   
    DEVICE_TYPE: IsIos? 2 : 3,
    CONDITION:Condtion,
    ISIOS:IsIos,
       
    FONT_10: 10 ,
    FONT_12: 12 ,
    FONT_14: 14 ,
    FONT_16: 16 ,
    FONT_18: 18 ,
    FONT_20: 20 ,
    FONT_22: 22 ,
    FONT_25: 25 ,
}