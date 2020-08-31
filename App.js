import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ToastAndroid, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import fetch from 'isomorphic-unfetch'

import LoginScreen from './screens/loginScreen'
import ProfileScreen from './screens/profileScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { WebView } from 'react-native-webview'
// const MainNavigator = createSwitchNavigator({
//   Login: { screen: LoginScreen }
// })

// const App = createAppContainer(MainNavigator)

// export default App
let apolloClient = null

function initApolloClient(...args) {
  if (!apolloClient) {
    apolloClient = createApolloClient(...args)
  }

  return apolloClient
}

function createApolloClient(initialState = {}, { getCookies }) {
  const httpLink = createHttpLink({
    uri: 'https://stem.to/graphql',
    credentials: 'include',
    fetch
  })

  const authLink = setContext((request, { headers }) => {
    const cookie = getCookies()
    return {
      headers: {
        ...headers,
        cookie
      }
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  return new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache().restore(initialState),
    credentials: 'include'
  })
}

const App = () => {
  let myWebView
  let userId
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

  const [testUrl, setTestUrl] = useState('http://192.168.3.3:3000/mobile/login')

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('user'))
        const accessToken = JSON.parse(await AsyncStorage.getItem('accessToken'))
        if (user != null && accessToken != null) {
          let u = await fetch("http://192.168.3.3:3000/api/mobile/auth/mobileGoogle", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                user: user,
                accessToken: accessToken
              }
            )
          })
            .then((response) => response.json())
            .then((json) => {
              this.apolloClient = initApolloClient(
                {},
                {
                  getCookies: () => {
                    console.log(json)
                    if (json && json.session && json.sessionSig) {
                      setTestUrl('http://192.168.3.3:3000/mobile/notifications')
                      return `session=${json.session};session.sig=${json.sessionSig}`
                    }
                    return ''
                  }
                }
              )
            })
          if (u) {

            alert(u)
            userId = u
            setTestUrl('http://192.168.3.3:3000/mobile/notifications')
          }
        } else {
          setTestUrl('http://192.168.3.3:3000/mobile/login')
        }
      } catch (e) {
        return setTestUrl('http://192.168.3.3:3000/mobile/login')
      }
    }
    getData()
  }, [])

  return (
    <View style={styles.container} >
      <WebView
        // ref={(r) => (this.webref = r)}
        source={{
          uri: testUrl
        }}
        // onLoadEnd={() => myWebView.postMessage(userId)}
        onMessage={(event) => {
          let data = JSON.parse(event.nativeEvent.data)
          let login = data['login']
          if (login === 'google') {
            LoginScreen()
          }
        }}
      />
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
