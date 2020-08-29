import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import * as Google from 'expo-google-app-auth'

const IOS_CLIENT_ID = 'your-ios-client-id'

const ANDROID_CLIENT_ID = '395723880686-keb4n5r09p65qjobutf9i1e8p4dehg6i.apps.googleusercontent.com'

const LoginScreen = (props) => {
  const signInWithGoogle = async () => {
    // const { type, accessToken, user } = await Google.logInAsync({
    //   androidClientId: ANDROID_CLIENT_ID
    // });

    const user = {
      givenName: 'I',
      email: 'iefje@gmail.com'
    }
    const accessToken = {
      givenName: 'I',
      gmail: 'iefje@gmail.com'
    }
    const type = 'success'
    if (type === 'success') {
      try {
        await Promise.all([
          AsyncStorage.setItem('user', JSON.stringify(user)),
          AsyncStorage.setItem('accessToken', JSON.stringify(accessToken))
        ])
        // alert('已存儲 ' + 'user,' + await AsyncStorage.getItem('user') + ' 名字,' + user.givenName)
        // return (
        //   <WebView
        //     ref={(r) => myWebView = r}
        //     source={{
        //       uri:
        //         'http://192.168.3.3:3000/mobile/google/home'
        //     }}
        //     // onLoadEnd={() => myWebView.postMessage('red')}
        //     onMessage={(event) => {
        //       let data = JSON.parse(event.nativeEvent.data)
        //       let login = data['login']
        //       if (login === 'google') {
        //         LoginScreen()
        //       }
        //     }}
        //   // injectJavaScript={butto}
        //   />
        // )
      } catch (e) {
        return alert('存儲失敗')
      }
    }
  }
  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await Google.logInAsync({
  //       androidClientId: ANDROID_CLIENT_ID,
  //       success: ['profile', 'email']
  //     })

  //     if (result.type === 'success') {
  //       console.log('LoginScreen.js', result.user.givenName)
  //       console.log('LoginScreen.js', result.user)
  //       props.navigation.navigate('Profile', {
  //         username: result.user.givenName,
  //         email: result.user.email
  //       })
  //       let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //   headers: { Authorization: `Bearer ${accessToken}` },
  // });
  //       return result.accessToken
  //     } else {
  //       return { cancelled: true }
  //     }
  //   } catch (error) {
  //     console.log('LoginScreen.js', error)
  //   }
  // }
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