
import React, { Component } from 'react'
import {
   View,
   Switch,
   StyleSheet
}
from 'react-native'

const styles = StyleSheet.create ({
      container: {
         alignItems: 'flex-start',
      }
   })
   
export default SwitchControl = (props) => {
   return (
      <View style = {styles.container}>
         <Switch
            onValueChange = {props.toggleswitch}
            value = {props.switchValue}/>
      </View>
   )
}