import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllHewan } from '../api/api';

export default function DashboardScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [totalEkor, setTotalEkor] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [hewanTerbanyak, setHewanTerbanyak] = useState({ jenis: '-', jumlah: 0 });
  const [hargaTermahal, setHargaTermahal] = useState({ pemilik: '-', harga: 0 });

  useEffect(() => {
    loadUser();
  }, []);

  // Auto refresh saat screen focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const loadUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setUsername(user || '');
    } catch (e) {
      console.log('Error loading user:', e);
    }
  };

  const fetchData = async () => {
    try {
      const json = await getAllHewan();
      setTotalEkor(json.length);
      
      // Total harga
      const total = json.reduce((sum, h) => sum + (h.hargaHewan || 0), 0);
      setTotalHarga(total);

      // Hewan terbanyak (group by jenis)
      const grouped = json.reduce((acc, h) => {
        const jenis = h.jenisHewan || 'Unknown';
        acc[jenis] = (acc[jenis] || 0) + 1;
        return acc;
      }, {});
      
      const maxJenis = Object.entries(grouped).reduce((max, [jenis, count]) => 
        count > max.jumlah ? { jenis, jumlah: count } : max
      , { jenis: '-', jumlah: 0 });
      setHewanTerbanyak(maxJenis);

      // Harga termahal
      const maxHarga = json.reduce((max, h) => 
        (h.hargaHewan || 0) > max.harga 
          ? { pemilik: h.pemilikHewan || '-', harga: h.hargaHewan || 0 }
          : max
      , { pemilik: '-', harga: 0 });
      setHargaTermahal(maxHarga);

    } catch (e) {
      Alert.alert('Error', 'Gagal mengambil data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farm Apps_062</Text>

      <Text style={styles.sectionTitle}>Dashboard</Text>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#4A90D9' }]}>
          <Text style={styles.statNum}>{totalEkor} Ekor</Text>
          <Text style={styles.statLabel}>Total Hewan</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E07B54' }]}>
          <Text style={styles.statNum}>Rp {totalHarga.toLocaleString('id-ID')}</Text>
          <Text style={styles.statLabel}>Total Harga</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#E07B54' }]}>
          <Text style={styles.statNum}>{hewanTerbanyak.jenis}</Text>
          <Text style={styles.statLabel}>{hewanTerbanyak.jumlah} Ekor Terbanyak</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#4A90D9' }]}>
          <Text style={styles.statNum}>Rp {hargaTermahal.harga.toLocaleString('id-ID')}</Text>
          <Text style={styles.statLabel}>Harga Termahal</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Feature</Text>
      <View style={styles.featureRow}>
        <TouchableOpacity style={styles.featureBtn} onPress={() => navigation.navigate('Sapi')}>
          <Text style={styles.featureText}>Sapi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureBtn} onPress={() => navigation.navigate('Domba')}>
          <Text style={styles.featureText}>Domba</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureBtn} onPress={() => navigation.navigate('Kambing')}>
          <Text style={styles.featureText}>Kambing</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Form Data</Text>
      <TouchableOpacity 
        style={styles.btnAdd} 
        onPress={() => navigation.navigate('Detail', { mode: 'add' })}
      >
        <Text style={styles.btnText}>+ Add Data</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Color Palettes</Text>
      <View style={styles.colorRow}>
        <View style={[styles.colorBox, { backgroundColor: '#51A8F7' }]}>
          <Text style={styles.colorLabel}>#51A8F7</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: '#FF5571' }]}>
          <Text style={styles.colorLabel}>#FF5571</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: '#C4E3F9' }]}>
          <Text style={styles.colorLabel}>#C4E3F9</Text>
        </View>
      </View>

      <Text style={styles.welcome}>Welcome {username}!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  statNum: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  statLabel: { color: '#fff', fontSize: 11 },
  featureRow: { flexDirection: 'row', gap: 8 },
  featureBtn: { flex: 1, backgroundColor: '#E0E0E0', padding: 12, borderRadius: 6, alignItems: 'center' },
  featureText: { fontSize: 13 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 8, fontSize: 13 },
  btnAdd: { backgroundColor: '#4A90D9', padding: 12, borderRadius: 6, alignItems: 'center', marginBottom: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  colorRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  colorBox: { flex: 1, padding: 8, borderRadius: 6, alignItems: 'center' },
  colorLabel: { color: '#fff', fontSize: 10 },
  welcome: { textAlign: 'center', marginVertical: 16, fontStyle: 'italic', fontSize: 14 },
});
