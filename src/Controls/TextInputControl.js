import React from 'react';
import { View, TextInput,StyleSheet,Text,Dimensions} from 'react-native';
import {Appcolors,font}  from "../Constant";
import {CommonFunction} from '../Config/Helper';
const {width,height} = Dimensions.get('window')
import { useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';
DataViewComponent =(props, ref) => {
    const { colors } = useTheme();
    const scheme=useColorScheme();
      return (
        <View style={{marginVertical:CommonFunction.Measurement(10,10,5)}}>
        <Text style={[styles.HeadrTxt,{color:colors.text}]}>{props.HeaderTxt}</Text>
        <View style={[styles.TextInputView,{shadowColor:scheme=='dark'? Appcolors.WHITE:Appcolors.BLACK,backgroundColor:colors.background}]}> 
            <TextInput
                ref={props.innerRef}
                underlineColorAndroid="transparent"
                placeholder={props.placeholder}
                placeholderTextColor={Appcolors.DARK_GRAY}
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
                style={[styles.TextInputTxt,{backgroundColor:colors.background,color:colors.text,}]}
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

const styles=StyleSheet.create({
    TextInputView:{
        flexDirection:'row',
        borderColor:Appcolors.DDARK_GREEN,
        borderRadius:8,
        borderWidth:CommonFunction.Measurement(1.5,1.5,1.8),
        marginBottom:CommonFunction.Measurement(8,15,18),
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 8,
        
    },
    TextInputTxt:{
        flex:1,
        fontSize:font.FONT_18,
        
        paddingHorizontal:5,
        borderRadius:8,
        paddingVertical: CommonFunction.Measurement(12,10,10),
    },
    HeadrTxt:{ 
        marginBottom:CommonFunction.Measurement(12,20,10),
        fontSize: font.FONT_18 ,
        fontWeight:font.FONT_WEIGHT_600,
    }
})