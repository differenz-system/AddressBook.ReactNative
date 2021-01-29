
import React from 'react'
import {View,Switch,StyleSheet,Text} from 'react-native'
import  {font}  from "../Constant";
import { useTheme } from '@react-navigation/native';

export default SwitchControl =(props, ref) => {
   const { colors } = useTheme();
   return (
      <View style = {styles.container}>
         <Text style={[styles.Text,{color:colors.text}]}>{props.HeaderTxt}</Text>
         <Switch onValueChange = {props.toggleswitch} value = {props.switchValue}/>
      </View>
   )
}
const styles = StyleSheet.create ({
   container: {
      flexDirection:'row',
      alignItems:'center'
   },
   Text:{ 
      fontSize: font.FONT_18 ,
      fontWeight:font.FONT_WEIGHT_600,
      marginRight:30,
   }
})