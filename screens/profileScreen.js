import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { WebView } from 'react-native-webview'

const ProfileScreen = (props) => {
  return (
    // <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcom,{props.navigation.getParam('username')},百度</Text>
    <WebView source={{ uri: 'https://www.google.com/' }} style={{ marginTop: 20 }} />
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