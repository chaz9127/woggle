import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

const pads = [{color: 'red', glow: ''}, {color: 'blue', glow: ''}, {color: 'orange', glow: ''}, {color: 'yellow', glow: ''}];

export default function Game() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {pads.map((pad, index) => (
          <Pressable
            key={index}
            onPressIn={() => setActiveIndex(index)}
            onPressOut={() => setActiveIndex(null)}
            style={[
              styles.cell,
              { backgroundColor: pad.color },
              activeIndex === index && {
                boxShadow: `0 0 10px 2px ${pad.color}`
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // vertically center
    alignItems: 'center',     // horizontally center
    backgroundColor: '#000',
  },
  grid: {
    width: 200,
    height: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 12,
  },
  glow: {
    boxShadow: '0 0 15px 2px #48abe0'
  },
});