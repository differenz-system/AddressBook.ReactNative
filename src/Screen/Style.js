import React from 'react';
import { StyleSheet, Dimensions} from 'react-native';
const { height, width } = Dimensions.get('window');
import  {Appcolors,font}  from "../Constant";
import {CommonFunction} from '../Config/Helper';

export default CommonStyle = StyleSheet.create({
    
    Splashcontainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Logincontainer:{
        padding:30,
    },
    FBView:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.60,
        shadowRadius: 4.65,
        elevation: 8,
        marginTop:CommonFunction.Measurement(10,15,15),
        borderRadius:25,
        backgroundColor:Appcolors.BLUE,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center'
    },
    FBButtonControl: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical:CommonFunction.Measurement(15,15,13),
    },
    FBfont:{ 
          fontSize:font.FONT_18, 
          color:Appcolors.WHITE,
          fontWeight:font.FONT_WEIGHT_600
    },
    AddCScrollView:{ 
        flex: 1, 
        justifyContent: 'center', 
    },
    Addcontainer: {
        flex: 1,
        padding:CommonFunction.Measurement(20,30,25),
    },
    AddMainView:{ 
        flex: 1, 
        flexDirection: 'column',
    },
    DSubMainView:{
        flex:1,
        padding:15
    },
    DSubsubView:{
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 8,
        flexDirection:'row',
        borderRadius:15,
    },
    DSubView1:{
        height:CommonFunction.Measurement(105,105,109),
        width:8,
    },
    DGradView:{ 
        height:font.ISIOS?'100%':'103%',
        justifyContent: 'center',
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,
        paddingVertical:12
    },
    DPressItem:{
        flex: 1,
        padding:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
    },
    DsubText:{ 
        paddingVertical:4, 
        fontSize:font.FONT_14 
    },
    DMainView:{ 
        paddingVertical:4, 
        fontWeight: 'bold',
        fontSize:font.FONT_22 
    },
    DGradHorizontalView:{ 
        justifyContent: 'center',
        paddingVertical:12
    },
    DContactChar:{
        fontSize:font.FONT_18,
        paddingHorizontal:5,
        fontWeight:font.FONT_WEIGHT_400
    },
    DMainRenderView:{ 
        flex: 1, 
        justifyContent: 'center' 
    },
    DStatusView:{ 
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    DStatusTxt:{ 
        fontWeight: 'bold',
        fontSize:font.FONT_20
    },
    DContactList:{
        marginTop:height/3.2,
        position:'absolute',
        zIndex:1,
        right:0
    },
    DContctView:{
        alignSelf:'flex-end',
        marginRight:15
    },
    DtouchList:{
        marginTop:5,
        marginBottom:5
    },
    DChar:{
        color:Appcolors.BLUE_CONTACT,
        fontWeight:'bold'
    },
    DlistScroll:{ 
        flex:1,
        marginBottom:CommonFunction.Measurement(5,20,5)
    },
    OrTxt:{ 
        marginTop:CommonFunction.Measurement(40,60,50),
        textAlign:'center',
        marginBottom:CommonFunction.Measurement(20,30,20),
        fontWeight:font.FONT_WEIGHT_600 
    },
    loginLoader:{
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute', 
        flex: 1, 
        left: 0, 
        top: 0, 
        right: 0, 
        bottom: 0,
    },
    LoginIndicator:{ 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        borderRadius: 25, 
        padding: 50 
    },
    FbImg:{
        height:42,
        width:42,
        alignSelf:'center'
    }
})
