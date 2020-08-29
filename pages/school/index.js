import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { WebView } from 'react-native-webview'

const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcom</Text>
      <Text>ProfileScreen</Text>
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

export default ProfileScreen