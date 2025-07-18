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
        <Link href="/game" style={styles.playButton}>Daily Puzzle</Link>
        <Link href="/game" style={styles.playButton}>Unlimited</Link>
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