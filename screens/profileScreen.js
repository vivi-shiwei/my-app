import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { WebView } from 'react-native-webview'

const ProfileScreen = (props) => {
  return (
    // <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcom,{props.navigation.getParam('email')}</Text>
    <WebView source={{ uri: 'http://192.168.3.3:3000/mobile/notifications' }} style={{ marginTop: 20 }} />
    // <WebView source={{ uri: `https://phone-school.vercel.app/${props.navigation.getParam('email')}` }} style={{ marginTop: 20 }} />
    // <WebView source={{ uri: 'https://school-next.macau.school/school/[schoolId]/notifications' }} style={{ marginTop: 20 }} />

    //    <Text>ProfileScreen</Text>
    //  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcom,{props.navigation.getParam('username')}</Text>
    //  <Button title='Sign Out' onPress={() => props.navigation.navigate('Login')}></Button>
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

export default ProfileScreen