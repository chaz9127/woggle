import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const letterOptions = ['T', 'W', 'Y', 'R', 'E', 'N', 'P', 'H', 'G', 'S', 'C', 'R', 'O', 'N', 'S', 'E'];

export default function Game() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {letterOptions.map((letter, idx) => (
          <Pressable key={idx} style={styles.cell}>
            <Text style={styles.letter}>{letter}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: 200,
    height: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 45,
    height: 45,
    margin: 2,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  letter: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});