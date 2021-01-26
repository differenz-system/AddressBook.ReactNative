import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions}from 'react-native'
import  {colors,font}  from "../Constant";
import {CommonFunction} from '../Config/Helper';
const {width,height} = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient';
export default class ButtonControl extends React.Component {
    
    render = () => {
        return (
            <View style={styles.View}>
            <LinearGradient 
            useAngle={true}
            angle={90}
            colors={[colors.LIGHT_GREEN,colors.DARK_GREEN,colors.DDARK_GREEN]} 
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
    View:{
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.60,
      shadowRadius: 4.65,
      elevation: 8,
      marginTop:15,
    },
    ButtonControl: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:25,
        paddingVertical:CommonFunction.Measurement(15,15,13),
    },
    font:{ 
        fontSize:font.FONT_18, 
        color:colors.WHITE,
        fontWeight:font.FONT_WEIGHT_600
    },
})
