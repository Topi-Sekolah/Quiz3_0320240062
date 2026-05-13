import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import BASE_URL from '../api/api';

function HomeScreen({ navigation }) {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = () => {
    setLoading(true);
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => { setBuildings(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchAll);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.number}>{index + 1}</Text>
      <View style={styles.cardBody}>
        <Text style={styles.buildingName}>{item.buildingName}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>In The House Apps</Text>
      </View>
      <View style={styles.bodyRow}>
        <View style={styles.sideTab}>
          <View style={[styles.sideTabItem, styles.sideTabActive]}>
            <Text style={styles.sideTabTextActive}>HOME</Text>
          </View>
          <TouchableOpacity style={styles.sideTabItem} onPress={() => navigation.navigate('Apart')}>
            <Text style={styles.sideTabText}>RENT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.addRow}>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Detail', { building: null })}>
              <Text style={styles.addButtonText}>+ Add Data</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#1a73e8" style={{ marginTop: 30 }} />
          ) : (
            <FlatList
              data={buildings}
              keyExtractor={item => String(item.idBuilding)}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              ListEmptyComponent={<Text style={styles.empty}>Belum ada data.</Text>}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#fff', paddingVertical: 12, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  bodyRow: { flex: 1, flexDirection: 'row' },
  sideTab: { width: 52, borderRightWidth: 1, borderRightColor: '#ddd', backgroundColor: '#fff' },
  sideTabItem: { paddingVertical: 14, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  sideTabActive: { backgroundColor: '#1a5c8c' },
  sideTabText: { fontSize: 11, fontWeight: '600', color: '#333' },
  sideTabTextActive: { fontSize: 11, fontWeight: '700', color: '#fff' },
  mainContent: { flex: 1 },
  addRow: { alignItems: 'flex-end', paddingHorizontal: 12, paddingTop: 10, paddingBottom: 4 },
  addButton: { backgroundColor: '#e0e0e0', borderRadius: 4, paddingHorizontal: 12, paddingVertical: 5 },
  addButtonText: { color: '#333', fontSize: 12, fontWeight: '600' },
  list: { paddingHorizontal: 12, paddingBottom: 20 },
  card: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  number: { width: 22, fontSize: 13, fontWeight: 'bold', color: '#333', marginTop: 1 },
  cardBody: { flex: 1 },
  buildingName: { fontSize: 13, fontWeight: 'bold', color: '#222', textDecorationLine: 'underline' },
  price: { fontSize: 11, color: '#666', marginTop: 1 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 40 },
});

export default HomeScreen;
