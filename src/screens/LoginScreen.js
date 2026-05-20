import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VALID_USERNAME = 'Adi';
const VALID_PASSWORD = '270306';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      try {
        await AsyncStorage.setItem('user', username);
        navigation.replace('Dashboard');
      } catch (error) {
        console.error('AsyncStorage error:', error);
        // Fallback: navigate tanpa save
        navigation.replace('Dashboard', { username });
      }
    } else {
      Alert.alert('Login Gagal', 'Username atau password salah!');
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farm Apps_062</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnClear} onPress={handleClear}>
          <Text style={styles.btnClearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Information</Text>
        <Text style={styles.infoText}>
          "All login user will be static and hard coded!"{'\n'}
          "use the AsyncStorage to keep user data"
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 14, marginBottom: 4, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    padding: 10, fontSize: 14
  },
  buttonRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  btnLogin: {
    flex: 1, backgroundColor: '#4A90D9', padding: 12,
    borderRadius: 6, alignItems: 'center'
  },
  btnClear: {
    flex: 1, backgroundColor: '#E0E0E0', padding: 12,
    borderRadius: 6, alignItems: 'center'
  },
  btnText: { fontWeight: 'bold', color: '#fff' },
  btnClearText: { fontWeight: 'bold', color: '#333' },
  infoBox: { marginTop: 24, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 6 },
  infoTitle: { fontWeight: 'bold', marginBottom: 4 },
  infoText: { fontSize: 12, color: '#555', fontStyle: 'italic' },
});
