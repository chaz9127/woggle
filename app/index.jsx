import React from 'react'
import { StyleSheet, Text, View, Image, useColorScheme } from 'react-native'
import  { Link } from 'expo-router'
import { Colors } from '../constants/Colors'
import Logo from '../assets/img/logo.png'

const Home = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.dark
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.header}>Woggle</Text>
        <View style={styles.logoBorder}>
          <Image source={Logo} />
        </View>
        <View style={styles.card.bg}>
          <View style={styles.card}>
            <Text style={styles.card.header}>Your Best</Text>
            <Text style={styles.card.body}>0</Text>
          </View>
        </View>
        <View style={styles.card.bg}>
          <View style={styles.card}>
            <Text style={styles.card.header}>World's Best</Text>
            <Text style={styles.card.body}>0</Text>
          </View>
        </View>
        <Link href="/game" style={styles.playButton}>Play</Link>
      </View>
    </View>
  )
}

export default Home

const borderRadius = 24
const marginTop = 24

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'rgb(227, 227, 225)',
    height: '100%'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  logoBorder: {
    borderRadius: borderRadius,
    overflow: 'hidden'
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: ''
  },
  card: {
    bg: {
      width: "100%",
      borderRadius: borderRadius/2,
      overflow: 'hidden',
      marginTop,
      backgroundColor: "rgb(199, 199, 199)"
    },
    header: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      display: 'block',
      paddingTop: 8,
      paddingBottom: 8,
      backgroundColor: 'blue'
    },
    body: {
      textAlign: 'center',
      fontSize: 32,
    }
  },
  playButton: {
    display: 'inline-block',
    padding: 8,
    marginTop,
    overflow: 'hidden',
    borderRadius: borderRadius/2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    textAlign: 'center'
  }
});