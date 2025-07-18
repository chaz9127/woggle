import React, { useState, useRef, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';

import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';

const GRID_SIZE = 5;
const TOTAL_TIME = 15; // 3 minutes in seconds
const letterOptions = [
  "e", "qu", "a", "r", "t",
  "l", "o", "s", "n", "m",
  "d", "i", "p", "g", "b",
  "u", "c", "y", "h", "k",
  "z", "v", "x", "f", "w"
];
const acceptableWords = ['elduzvxfwkbmt', 'ten', 'tens', 'soil', 'song', 'son', 'went', 'sent', 'net', 'arch', 'ray', 'quart', 'pile', 'lie', 'oil'];

export default function Game() {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [usedIndices, setUsedIndices] = useState(new Set());
  const [wordBank, setWordBank] = useState([]);
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current); // clear old if any
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };



  const isAdjacent = (lastIndex, newIndex) => {
    if (lastIndex === null) return true;
    const lastRow = Math.floor(lastIndex / GRID_SIZE);
    const lastCol = lastIndex % GRID_SIZE;
    const newRow = Math.floor(newIndex / GRID_SIZE);
    const newCol = newIndex % GRID_SIZE;
    return Math.abs(lastRow - newRow) <= 1 && Math.abs(lastCol - newCol) <= 1;
  };

  const handlePress = (index) => {
    if (timeLeft === 0) return; // prevent input after time's up
    const lastIndex = selectedIndices[selectedIndices.length - 1] ?? null;
    if (index === lastIndex) {
      const newIdxArray = [...selectedIndices];
      newIdxArray.pop();
      setSelectedIndices(newIdxArray);
    } else if (selectedIndices.includes(index)) {
      return;
    } else if (isAdjacent(lastIndex, index)) {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleAddWord = () => {
    const word = selectedIndices.map(i => letterOptions[i]).join('').toLowerCase();
    if (acceptableWords.includes(word)) {
      if (!wordBank.includes(word)) {
        setWordBank([...wordBank, word]);

        // Update usedIndices
        setUsedIndices(prev => new Set([...prev, ...selectedIndices]));
      }
      setSelectedIndices([]);
    } else {
      triggerErrorFeedback();
    }
  };

  const handleResetGame = () => {
    setSelectedIndices([]);
    setWordBank([]);
    setTimeLeft(TOTAL_TIME);
    setUsedIndices(new Set())
    startTimer(); // restart the timer
  };


  const handleClear = () => {
    setSelectedIndices([]);
  }

  const handleShare = () => {
    const allLettersUsed = wordBank.join('').toUpperCase().split('');
    const totalCells = letterOptions.length;
    const usedArray = Array.from(usedIndices);
    const usedCount = usedArray.length;

    const percentage = Math.round((usedCount / totalCells) * 100);

    let grid = '';
    for (let i = 0; i < totalCells; i++) {
      if (i % GRID_SIZE === 0 && i !== 0) grid += '\n';
      grid += usedIndices.has(i) ? '🟩' : '⬛️';
    }

    const message = `🧠 Woggle #1: ${allLettersUsed.length + usedCount}\n${grid}`;

    Clipboard.setStringAsync(message);
    alert('Score copied to clipboard!');
  };

  const triggerErrorFeedback = () => {
    setError(true);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setError(false), 2000);
  };

  const currentWord = selectedIndices.map(i => letterOptions[i]).join('');
  const progressPercent = (timeLeft / TOTAL_TIME) * 100;

  return (
    <View style={styles.container}>
      {/* Timer Bar */}
      <View style={styles.timerBarBackground}>
        <View style={[styles.timerBarFill, { width: `${progressPercent}%` }]} />
      </View>
      <Text style={styles.timerText}>{`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</Text>

      <View style={styles.grid}>
        {letterOptions.map((letter, idx) => {
          const isSelected = selectedIndices.includes(idx);
          return (
            <Pressable
              key={idx}
              style={[styles.cell, isSelected && styles.selectedCell]}
              onPress={() => handlePress(idx)}
            >
              <Text style={styles.letter}>{letter}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.word}>{currentWord}</Text>
      <View style={styles.controls}>
        {timeLeft > 0 ? <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
          <Pressable
            style={[styles.addLetterButton, error && styles.errorButton]}
            onPress={handleAddWord}
            disabled={timeLeft === 0}
          >
            <Text style={styles.buttonText}>
              Add
            </Text>
          </Pressable>
        </Animated.View>
        : <Pressable
            style={[styles.addLetterButton, styles.greenButton]}
            onPress={handleShare}
          >
            <Text style={styles.buttonText}>
              Share
            </Text>
          </Pressable>
        }

        <Pressable
          style={styles.addLetterButton}
          onPress={handleClear}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
        <Pressable
          style={styles.addLetterButton}
          onPress={handleResetGame}
        >
          <Text style={styles.buttonText}>Reset Game</Text>
        </Pressable>
      </View>
      <View style={styles.wordBank}>
        {wordBank.map((word, i) => (
          <View key={i} style={styles.wordItem}>
            <Text style={styles.score}>{word}</Text>
            <Text style={styles.score}>{word.length}</Text>
          </View>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  timerBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
    overflow: 'hidden',
  },
  timerBarFill: {
    height: 10,
    backgroundColor: '#00b894',
  },
  timerText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '500',
  },
  grid: {
    marginTop: 20,
    width: 250,
    height: 250,
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
  selectedCell: {
    backgroundColor: '#6c5ce7',
  },
  letter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  },
  word: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '600',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    minWidth: 200,
    textAlign: 'center',
  },
  addLetterButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#0984e3',
    borderRadius: 20,
  },
  errorButton: {
    backgroundColor: '#d63031',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  wordBank: {
    marginTop: 30,
    display: 'flex',
    minWidth: 100
  },
  wordItem: {
    fontSize: 18,
    color: '#2d3436',
    marginVertical: 2,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 20
  },
  greenButton: {
    backgroundColor: 'green'
  }
});
