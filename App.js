import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ToastAndroid, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import * as Google from 'expo-google-app-auth'

// import LoginScreen from './screens/loginScreen'
// import ProfileScreen from './screens/profileScreen'


import { WebView } from 'react-native-webview'

const IOS_CLIENT_ID = 'your-ios-client-id'

const ANDROID_CLIENT_ID = '395723880686-keb4n5r09p65qjobutf9i1e8p4dehg6i.apps.googleusercontent.com'

const App = () => {


  const [testUrl, setTestUrl] = useState('http://192.168.3.3:3000/mobile/login')

  const [session, setSession] = useState('')
  const [sessionSig, setSessionSig] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  let myWebView

  // let session = null
  // let sessionSig = null
  // const runFirst = `
  //     document.body.style.backgroundColor = 'red';
  //     true;
  //   `;
  // const butto = `
  // setTimeout(()=>{ document.body.style.backgroundColor = 'blue';}, 2000);
  //     true;
  //   `;

  // setTimeout(() => {
  //   this.webref.injectJavaScript(runFirst);
  // }, 3000);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'))
        const accessToken = JSON.parse(await AsyncStorage.getItem('accessToken'))
        if (user != null && accessToken != null) {
          setTestUrl('http://192.168.3.3:3000/mobile/notifications')
        } else {
          setTestUrl('http://192.168.3.3:3000/mobile/login')
        }
      } catch (e) {
        return setTestUrl('http://192.168.3.3:3000/mobile/login')
      }
    }
    getData()
  }, [])

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
        alert(await AsyncStorage.getItem('user'))
        let u = await fetch("http://192.168.3.3:3000/api/mobile/auth/mobileGoogle", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              user: await AsyncStorage.getItem('user'),
              accessToken: await AsyncStorage.getItem('accessToken')
            }
          )
        })
          .then((response) => response.json())
        alert('已存儲 ' + 'user,' + u.session + ' 名字,' + u.sessionSig)
        if (u) {
          setSession(u.session)
          setSessionSig(u.sessionSig)
          setIsLogin(true)
          setTestUrl('http://192.168.3.3:3000/mobile/notifications')
        }
        else setTestUrl('http://192.168.3.3:3000/mobile/login')
      } catch (e) {
        return alert('存儲失敗')
      }
    }
  }

  const runFirst = `
    ddd='pp'
    window.sendMessage = '${session}';
    window.sessionSig = '${sessionSig}';
    true;
  `;
  const run = `
  document.body.style.backgroundColor = 'blue';
  true;
`;
  setTimeout(() => {
    this.webref.injectJavaScript(runFirst);
  }, 3000);

  // const run = () => {
  //   myWebView.postMessage(session)
  // }

  return (
    <>
      {
        !isLogin && (
          <View style={styles.container} >
            <WebView
              ref={(r) => (this.webref = r)}
              // injectedJavaScript='ddd="pp";function hideHead(){ window.session = "blue";};hideHead();'
              source={{ uri: testUrl }}
              javaScriptEnabled={true}
              onMessage={(event) => {
                let data = JSON.parse(event.nativeEvent.data)
                let login = data['login']
                if (login === 'google') {
                  signInWithGoogle()
                }
              }}
            />
          </View>
        )
      }
      {
        !!isLogin && (
          <View style={styles.container} >
            <WebView
              // ref={el => this.webView = el}
              source={{
                uri: testUrl
              }}
              //               injectedJavaScript={`(function(){
              // window.session = 'fsfsfefdfd';
              // window.sessionSig = 'dffdsfsdfsd'; 
              //               })()`}
              injectedJavaScript='ddd="pp";function hideHead(){ document.body.style.backgroundColor = "blue";};hideHead();'
              javaScriptEnabled={true}
              onMessage={(event) => {
                let data = JSON.parse(event.nativeEvent.data)
                let login = data['login']
                if (login === 'google') {
                  signInWithGoogle()
                }
              }}
            />
          </View>
        )
      }
    </>
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
