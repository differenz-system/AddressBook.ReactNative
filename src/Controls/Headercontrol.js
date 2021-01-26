import React from 'react';
import {TouchableOpacity,Image,View,Text,StyleSheet,Dimensions} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {font,colors,string,icon} from '../Constant';
import {CommonFunction} from '../Config/Helper';
const { height, width } = Dimensions.get("window")

function HeaderView (props) {
       
        return (
        <View style={styles.Container}>
            <Image source={icon.BACKGROUND} style={styles.BGImg}/>
            <TouchableOpacity onPress={props.LeftImgPress} style={styles.LImgTouch}>  
                <Image source={props.LeftImage} style={styles.LImg}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.RightImgPress} style={styles.RImgTouch}>
                <Image source={props.RightImage} style={styles.RImg}/>
            </TouchableOpacity>
            <Text style={styles.HeaderTxt}>{props.Headertxt}</Text>

            {props.SerchView ?    
            <View style={styles.SerchView}>
                  <TextInput
                      ref={props.innerRef}
                      underlineColorAndroid="transparent"
                      placeholder={string.SEARCH}
                      placeholderTextColor={colors.DARK_GRAY}
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
                      style={styles.TextInputTxt}
                      blurOnSubmit={props.blurOnSubmit}
                      value={props.value}
                      autoCapitalize={props.autoCapitalize}
                      onContentSizeChange={props.onContentSizeChange}
                      onEndEditing={props.onEndEditing}
                      ellipsizeMode='head'
                  />
            </View>: undefined} 
    </View>
      )
  }

export default HeaderView;
const styles=StyleSheet.create({
   
    Container:{
        backgroundColor:'white',
    },
    BGImg:{
        width:'100%',
        height:CommonFunction.Measurement(180,230,200),
        borderBottomLeftRadius:29,
        borderBottomRightRadius:29
    },
    LImgTouch:{
        position:'absolute',
        left:0,
        marginLeft:15,
        width:30,
        height:30,
        marginTop:CommonFunction.Measurement(30,50,30),
        tintColor:colors.WHITE
    },
    LImg:{
        position:'absolute',
        left:0,
        width:CommonFunction.Measurement(25,30,30),
        height:CommonFunction.Measurement(25,30,30),
        tintColor:colors.WHITE
    },
    RImgTouch:{
        position:'absolute',
        right:0,
        marginRight:15,
        width:30,
        height:30,
        marginTop:CommonFunction.Measurement(30,50,30),
        tintColor:colors.WHITE
    },
    RImg:{
        position:'absolute',
        right:0,
        width:CommonFunction.Measurement(25,30,30),
        height:CommonFunction.Measurement(25,30,30),
        tintColor:colors.WHITE
    },
    HeaderTxt:{
        position:'absolute',
        alignSelf:'center',
        textAlign:'center',
        marginTop:CommonFunction.Measurement(80,110,90),
        fontWeight:font.FONT_WEIGHT_600,
        fontSize:font.FONT_25,
        color:colors.WHITE,
    },
    SerchView:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 8,
        position:'absolute',
        bottom:-20,
        height:50,
        width:'80%',
       backgroundColor:colors.WHITE,
       borderRadius:30,
       alignSelf:'center'
    },
    TextInputTxt:{
        flex:1,
        fontSize:font.FONT_18,
        color:colors.BLACK_FONT,
        paddingTop :0,
        paddingVertical:0,
        paddingHorizontal:5,
        borderRadius:5,
        marginTop:5,
        marginBottom:5,
        marginLeft:15,
        marginRight:15,
    },
   
})