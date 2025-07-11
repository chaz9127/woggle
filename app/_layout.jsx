import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

import { Colors } from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.dark
  return (
    <>
    <StatusBar value="auto" />
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{title: 'Home'}} />
        <Stack.Screen name="game" options={{title: 'Woggle'}} />
    </Stack>
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})