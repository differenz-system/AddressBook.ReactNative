import React from 'react';
import {TouchableOpacity,Image,View,Text,StyleSheet,Dimensions} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {font,AppColors,string,icon} from '../Constant';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';
const { height, width } = Dimensions.get("window")

function HeaderView (props) {
       
        return (
        <View>
            <Image source={icon.BACKGROUND} style={styles.BGImg}/>
            
            <TouchableOpacity onPress={props.LeftImgPress} style={styles.LImgTouch}>  
                <Image source={props.LeftImage} style={styles.LImg} resizeMode={'contain'}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.RightImgPress} style={styles.RImgTouch}>
                <Image source={props.RightImage} style={styles.RImg} resizeMode={'contain'}/>
            </TouchableOpacity>
           
            <Text style={styles.HeaderTxt}>{props.Headertxt}</Text>

            
    </View>
      )
  }

export default HeaderView;
const styles=StyleSheet.create({
    BGImg:{
        width:'100%',
        height:hp('30'),
        borderBottomLeftRadius:hp('4'),
        borderBottomRightRadius:hp('4')
    },
    LImgTouch:{
        position:'absolute',
        left:0,
        marginLeft:wp('3'),
        marginTop:hp('6'),
        tintColor:AppColors.WHITE
    },
    LImg:{
        width:wp('8'),
        height:wp('8'),
        tintColor:AppColors.WHITE
    },
    RImgTouch:{
        position:'absolute',
        right:0,
        marginRight:wp('3'),
        marginTop:hp('6'),
        tintColor:AppColors.WHITE
    },
    RImg:{
        width:wp('8'),
        height:wp('8'),
        tintColor:AppColors.WHITE
    },
    HeaderTxt:{
        position:'absolute',
        alignSelf:'center',
        textAlign:'center',
        marginTop:hp('13'),
        fontWeight:font.FONT_WEIGHT_600,
        fontSize:font.FONT_25,
        color:AppColors.WHITE,
    },
   
   
})