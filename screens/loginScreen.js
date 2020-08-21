import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

import * as Google from 'expo-google-app-auth'

const IOS_CLIENT_ID = 'your-ios-client-id'

const ANDROID_CLIENT_ID = '395723880686-keb4n5r09p65qjobutf9i1e8p4dehg6i.apps.googleusercontent.com'

const LoginScreen = (props) => {
  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        success: ['profile', 'email']
      })

      if (result.type === 'success') {
        console.log('LoginScreen.js', result.user.givenName)
        props.navigation.navigate('Profile', {
          username: result.user.givenName
        })
        return result.accessToken
      } else {
        return { cancelled: true }
      }
    } catch (error) {
      console.log('LoginScreen.js', error)
      return { error: true }
    }
  }
  return (
    <View style={styles.container}>
      <Button title='Login with Google' onPress={signInWithGoogle}></Button>
    </View>
  )
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