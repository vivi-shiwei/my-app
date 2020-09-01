import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as Google from 'expo-google-app-auth'
import { WebView } from 'react-native-webview'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import ProfileScreen from './profileScreen'

const IOS_CLIENT_ID = 'your-ios-client-id'

const ANDROID_CLIENT_ID = '395723880686-keb4n5r09p65qjobutf9i1e8p4dehg6i.apps.googleusercontent.com'

const LoginScreen = (props) => {
  const signInWithGoogle = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId: ANDROID_CLIENT_ID
    });
    if (type === 'success') {
      try {
        await Promise.all([
          AsyncStorage.setItem('user', JSON.stringify(user)),
          AsyncStorage.setItem('accessToken', JSON.stringify(accessToken))
        ])
        alert('已存儲 ' + 'user,' + await AsyncStorage.getItem('user') + ' 名字,' + await AsyncStorage.getItem('accessToken'))
        ProfileScreen()
        //   return (
        //     <WebView
        //   source={{
        //     uri: testUrl
        //   }}
        //   onMessage={(event) => {
        //     let data = JSON.parse(event.nativeEvent.data)
        //     let login = data['login']
        //     if (login === 'google') {
        //       LoginScreen()
        //     }
        //   }}
        // />
        //   )
      } catch (e) {
        return alert('存儲失敗')
      }
    }
  }
  return signInWithGoogle()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LoginScreen 