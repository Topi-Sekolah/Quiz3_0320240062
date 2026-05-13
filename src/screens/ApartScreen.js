// src/screens/ApartScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, SafeAreaView,
} from 'react-native';
import BASE_URL from '../api/api';

export default function ApartScreen({ navigation }) {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApartments = () => {
    setLoading(true);
    fetch(`${BASE_URL}/type/1`)
      .then(res => res.json())
      .then(data => { setApartments(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchApartments);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { building: item })}
    >
      <Text style={styles.number}>{index + 1}</Text>
      <View style={styles.cardBody}>
        <Text style={styles.buildingName}>{item.buildingName}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>In The House Apps</Text>
      </View>

      {/* Body: sidebar kiri + konten utama */}
      <View style={styles.bodyRow}>

        {/* Sidebar Tab Kiri */}
        <View style={styles.sideTab}>
          {/* HOME */}
          <TouchableOpacity
            style={styles.sideTabItem}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.sideTabText}>HOME</Text>
          </TouchableOpacity>
          {/* RENT aktif */}
          <View style={[styles.sideTabItem, styles.sideTabActive]}>
            <Text style={styles.sideTabTextActive}>RENT</Text>
          </View>
        </View>

        {/* Konten Utama */}
        <View style={styles.mainContent}>
          {/* List Apartment */}
          {loading ? (
            <ActivityIndicator size="large" color="#1a73e8" style={{ marginTop: 30 }} />
          ) : (
            <FlatList
              data={apartments}
              keyExtractor={item => String(item.idBuilding)}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              ListEmptyComponent={
                <Text style={styles.empty}>Tidak ada data Apartment.</Text>
              }
            />
          )}

          {/* Bottom Tab Apart | House */}
          <View style={styles.bottomTab}>
            {/* Apart aktif */}
            <View style={[styles.bottomBtn, styles.bottomBtnActive]}>
              <Text style={styles.bottomBtnTextActive}>Apart</Text>
            </View>
            <TouchableOpacity
              style={styles.bottomBtn}
              onPress={() => navigation.navigate('House')}
            >
              <Text style={styles.bottomBtnText}>House</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },

  // Body row: sidebar + main
  bodyRow: {
    flex: 1,
    flexDirection: 'row',
  },

  // Sidebar kiri
  sideTab: {
    width: 52,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    backgroundColor: '#fff',
  },
  sideTabItem: {
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  sideTabActive: {
    backgroundColor: '#1a5c8c',
  },
  sideTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  sideTabTextActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },

  // Konten utama
  mainContent: { flex: 1 },

  list: { paddingHorizontal: 12, paddingBottom: 20, paddingTop: 6 },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  number: { width: 22, fontSize: 13, fontWeight: 'bold', color: '#333', marginTop: 1 },
  cardBody: { flex: 1 },
  buildingName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    textDecorationLine: 'underline',
  },
  location: { fontSize: 11, color: '#777', marginTop: 1 },

  empty: { textAlign: 'center', color: '#aaa', marginTop: 40 },

  bottomTab: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  bottomBtn: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  bottomBtnActive: { backgroundColor: '#555' },
  bottomBtnText:       { color: '#333', fontWeight: '600', fontSize: 13 },
  bottomBtnTextActive: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
