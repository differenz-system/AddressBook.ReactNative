import React from 'react';
import { View, TextInput,StyleSheet,Text,Dimensions} from 'react-native';
import  {colors,font}  from "../Constant";
import {CommonFunction} from '../Config/Helper';
import { useTheme } from '@react-navigation/native';
const {width,height} = Dimensions.get('window')

class DataViewComponent extends React.Component {
    
    render() {
      return (
        <View style={{marginVertical:CommonFunction.Measurement(10,10,5)}}>
        <Text style={styles.HeadrTxt}>{this.props.HeaderTxt}</Text>
        <View style={styles.TextInputView}> 
            <TextInput
                ref={this.props.innerRef}
                underlineColorAndroid="transparent"
                placeholder={this.props.placeholder}
                placeholderTextColor={colors.DARK_GRAY}
                keyboardType={this.props.keyboardType}
                onChangeText={this.props.onChangeText}
                returnKeyType={this.props.returnKeyType}
                secureTextEntry={this.props.secureTextEntry}
                returnKeyLabel={this.props.returnKeyLabel}
                numberOfLines={this.props.numberOfLines}
                multiline={this.props.multiline}
                maxLength={this.props.maxLength}
                maxHeight={this.props.maxHeight}
                onSubmitEditing={this.props.onSubmitEditing}
                onFocus={this.props.onFocus}
                style={[styles.TextInputTxt,this.props.dataInputStyle]}
                blurOnSubmit={this.props.blurOnSubmit}
                value={this.props.value}
                autoCapitalize={this.props.autoCapitalize}
                onContentSizeChange={this.props.onContentSizeChange}
                onEndEditing={this.props.onEndEditing}
                ellipsizeMode='head'
            />
         </View>
     </View>
      )
    }
  }
const DataView = React.forwardRef((props, ref) => {
    return (<DataViewComponent innerRef={ref} {...props} />);
});
export default DataView;
const styles=StyleSheet.create({
   
    TextInputView:{
        flexDirection:'row',
        borderColor:colors.DDARK_GREEN,
        borderRadius:8,
        backgroundColor:colors.WHITE,
        borderWidth:CommonFunction.Measurement(1.5,1.5,1.8),
        marginBottom:CommonFunction.Measurement(8,15,18),
        paddingVertical: CommonFunction.Measurement(12,10,10),
        shadowColor: "#000",
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
        color:colors.BLACK_FONT,
        paddingTop :0,
        paddingVertical:0,
        paddingHorizontal:5,
    },
    HeadrTxt:{ 
        marginBottom:CommonFunction.Measurement(12,20,10),
        fontSize: font.FONT_18 ,
        fontWeight:font.FONT_WEIGHT_600
    }
})