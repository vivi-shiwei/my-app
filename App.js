import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ToastAndroid, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import LoginScreen from './screens/loginScreen'
// import ProfileScreen from './screens/profileScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { WebView } from 'react-native-webview'

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
    console.log(e)
    console.log('jsdklfjklsdjfsdf')
  }
}


const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if (value !== null) {
      return value
    }
  } catch (e) {
    // error reading value
    console.log(e)
    console.log('jsdklfjklsdjfsdf')
  }
  return null
}


// const MainNavigator = createSwitchNavigator({
//   Login: { screen: LoginScreen },
//   Profile: { screen: ProfileScreen }
// })

// const App = createAppContainer(MainNavigator)

// export default App


const App = () => {
  const [color, setColor] = useState('red')

  let myWebView;
  const runFirst = `
      setTimeout(()=>{ document.body.style.backgroundColor = 'red'; }, 2000);
      true;
    `;
  const butto = `
  setTimeout(()=>{ document.body.style.backgroundColor = 'blue';}, 2000);
      true;
    `;
  const changeBgWebviewhtml = () => {
    myWebView.injectJavaScript(runFirst)
  }

  useEffect(() => {
    // console.log('jsdklfjklsdjfsdf11111111')
    const getData = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'))
        const accessToken = JSON.parse(await AsyncStorage.getItem('accessToken'))
        // return alter('已取出' + (user != null ? JSON.parse(user) : null) + (accessToken != null ? JSON.parse(accessToken) : null))
        if (user != null && accessToken != null) {
          fetch('http://192.168.3.3:3000/api/mobile/auth/mobileGoogle')
            .then((response) => response.json())
            .then((json) => {
              return alert(json.movies);
            })
            .catch((error) => {
              console.error(error);
            });
          // fetch
          // next pages / api next api route
          // return alert('已取出' + 'email,' + user.email + ' 名字,' + user.givenName)
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
          //   />
          // )
          // value previously stored
        } else {
          alert('無數據')
          return null
        }
      } catch (e) {
        alert('錯誤')
        return null
        // error reading value
      }
    }
    getData()

    // const hello = async () => {
    //   await storeData('jsdklfjlsdkfjls123132132132')
    //   const result = await getData()
    //   alert(result)
    // }

    // hello()
  }, [])

  // async () => {
  //   try {
  //     const user = await AsyncStorage.getItem('user')
  //     const accessToken = await AsyncStorage.getItem('accessToken')
  //     if (user !== null && accessToken !== null) {
  //       alert('email,' + user.email + ' 名字,' + user.givenName)
  //       // value previously stored
  //     }
  //   } catch (e) {
  //     alert('無數據')
  //     return
  //     // error reading value
  //   }
  // }
  // setTimeout(() => {
  //   this.webref.injectJavaScript(butto);
  // }, 3000);

  // setTimeout(() => {
  //   this.webref.injectJavaScript(runFirst);
  // }, 3000);
  // getData()
  return (
    <View style={styles.container} >
      <Text>gerlgkrgk</Text>
      {/* <LoginScreen /> */}
      {/* <Button onPress={() => changeBgWebviewhtml()} title='appButton' /> */}
      <WebView
        ref={(r) => myWebView = r}
        source={{
          uri:
            'http://192.168.3.3:3000/mobile/login'
        }}
        // onLoadEnd={() => myWebView.postMessage('red')}
        onMessage={(event) => {
          let data = JSON.parse(event.nativeEvent.data)
          let login = data['login']
          if (login === 'google') {
            LoginScreen()
          }
        }}
      // injectJavaScript={butto}
      />
      {/* <WebView
        ref={(r) => myWebView = r}
        source={{
          uri:
            'http://192.168.3.3:3000/mobile/google/home'
        }}
        onMessage={(event) => {
          let data = JSON.parse(event.nativeEvent.data);
          let msg = data['msg'] + '=' + data['time'];
          ToastAndroid.show(msg, ToastAndroid.SHORT);
        }}
      /> */}
    </View>
  )
}

export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
