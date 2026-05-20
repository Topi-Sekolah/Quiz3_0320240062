import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllHewan } from '../api/api';

export default function KambingScreen({ navigation }) {
  const [data, setData] = useState([]);

  // Auto refresh saat screen focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const json = await getAllHewan();
      // Filter hanya Kambing, sort by hargaHewan desc
      const filtered = json
        .filter(h => h.jenisHewan?.toLowerCase() === 'kambing')
        .sort((a, b) => (b.hargaHewan || 0) - (a.hargaHewan || 0));
      setData(filtered);
    } catch (e) {
      Alert.alert('Error', 'Gagal mengambil data');
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detail', { 
        id: item.idHewan, 
        mode: 'edit',
        data: item 
      })}
    >
      <Text style={styles.itemNumber}>{index + 1}</Text>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.pemilikHewan}</Text>
        <Text style={styles.itemSubtitle}>{item.kandangHewan}</Text>
        <Text style={styles.itemPrice}>Rp {item.hargaHewan?.toLocaleString('id-ID')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Category - Kambing</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.idHewan)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Tidak ada data Kambing</Text>
        }
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Information</Text>
        <Text style={styles.infoText}>
          Kambing sort by hargaHewan desc.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  backBtn: { fontSize: 24, marginRight: 12 },
  title: { fontSize: 18, fontWeight: 'bold' },
  list: { padding: 16 },
  item: { flexDirection: 'row', padding: 12, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e0e0e0' },
  itemNumber: { fontSize: 18, fontWeight: 'bold', marginRight: 12, color: '#666' },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  itemSubtitle: { fontSize: 14, color: '#666', fontStyle: 'italic', marginBottom: 4 },
  itemPrice: { fontSize: 14, color: '#E07B54', fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 32, fontSize: 14, color: '#999' },
  infoBox: { padding: 16, backgroundColor: '#f5f5f5', borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  infoTitle: { fontWeight: 'bold', marginBottom: 8 },
  infoText: { fontSize: 12, color: '#666', fontStyle: 'italic' },
});
