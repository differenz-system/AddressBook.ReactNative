import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import { AppColors, font } from "../Constant";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';

export default CommonStyle = StyleSheet.create({

    Splashcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Logincontainer: {
        padding: 30,
    },
    FBView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.60,
        shadowRadius: 4.65,
        elevation: 8,
        marginTop: hp('2'),
        borderRadius: hp('4'),
        backgroundColor: AppColors.BLUE,
        padding: hp('0.4'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    FBButtonControl: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('1'),
    },
    FBfont: {
        fontSize: font.FONT_18,
        color: AppColors.WHITE,
        fontWeight: font.FONT_WEIGHT_600
    },
    AddCScrollView: {
        flex: 1,
        justifyContent: 'center',
    },
    Addcontainer: {
        flex: 1,
        padding: hp('2'),
    },
    AddMainView: {
        flex: 1,
        flexDirection: 'column',
    },
    DSubMainView: {
        flex: 1,
        padding: hp('2')
    },
    DSubsubView: {
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 8,
        flexDirection: 'row',
        width: wp('92'),
        alignSelf: 'center',
        borderRadius: hp('2'),
        marginVertical: hp('2')
    },
    DSubView1: {
        width: wp('3'),
    },
    DGradView: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: hp('2'),
        flexDirection: 'row',
    },
    DPressItem: {
        marginLeft: font.IS_IOS ? wp('3') : wp('3'),
        paddingLeft: wp('2'),
        paddingVertical: hp('0.6'),
        borderTopRightRadius: hp('2'),
        borderBottomRightRadius: hp('2'),
    },
    DsubText: {
        paddingVertical: 4,
        fontSize: font.FONT_14
    },
    DMainView: {
        paddingVertical: 4,
        fontWeight: 'bold',
        fontSize: font.FONT_22
    },
    DGradHorizontalView: {
        justifyContent: 'center',
        paddingVertical: hp('2')
    },
    DContactChar: {
        fontSize: font.FONT_18,
        paddingHorizontal: 5,
        fontWeight: font.FONT_WEIGHT_400
    },
    DMainRenderView: {
        flex: 1,
        justifyContent: 'center'
    },
    DStatusView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    DStatusTxt: {
        fontWeight: 'bold',
        fontSize: font.FONT_20
    },
    DContactList: {
        top: hp('20'),
        position: 'absolute',
        zIndex: 1,
        right: 0
    },
    DContctView: {
        alignSelf: 'flex-end',
        marginRight: wp('5')
    },
    DtouchList: {
        marginTop: 5,
        marginBottom: 5
    },
    DChar: {
        color: AppColors.BLUE_CONTACT,
        fontWeight: 'bold'
    },
    DlistScroll: {
        flex: 1,
        marginBottom: hp('2')
    },
    OrTxt: {
        textAlign: 'center',
        fontWeight: font.FONT_WEIGHT_600,
        marginTop: hp('2')
    },
    loginLoader: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: hp('23'),
        left: 0,
        right: 0,
    },
    LoginIndicator: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: hp('3'),
        padding: hp('5')
    },
    FbImg: {
        height: 42,
        width: 42,
        alignSelf: 'center'
    },
    SearchView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 8,
        marginTop: hp('-3.5'),
        height: hp('6'),
        width: '80%',
        backgroundColor: AppColors.WHITE,
        borderRadius: hp('4'),
        alignSelf: 'center',
        zIndex: 100,
    },
    TextInputTxt: {
        flex: 1,
        fontSize: font.FONT_18,
        color: AppColors.BLACK_FONT,
        paddingHorizontal: hp('1'),
        borderRadius: hp('4'),
        marginHorizontal: wp('2'),
    },
    BGImg: {
        width: '100%',
        height: hp('30'),
        borderBottomLeftRadius: hp('4'),
        borderBottomRightRadius: hp('4')
    },
    LImgTouch: {
        position: 'absolute',
        left: 0,
        marginLeft: wp('3'),
        marginTop: hp('6'),
        tintColor: AppColors.WHITE
    },
    LImg: {
        width: wp('8'),
        height: wp('8'),
        tintColor: AppColors.WHITE
    },
    RImgTouch: {
        position: 'absolute',
        right: 0,
        marginRight: wp('3'),
        marginTop: hp('6'),
        tintColor: AppColors.WHITE
    },
    RImg: {
        width: wp('8'),
        height: wp('8'),
        tintColor: AppColors.WHITE
    },
    HeaderTxt: {
        position: 'absolute',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: hp('13'),
        fontWeight: font.FONT_WEIGHT_600,
        fontSize: font.FONT_25,
        color: AppColors.WHITE,
    },

})
