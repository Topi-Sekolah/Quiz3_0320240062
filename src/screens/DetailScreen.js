// src/screens/DetailScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView, SafeAreaView,
} from 'react-native';
import BASE_URL from '../api/api';

export default function DetailScreen({ navigation, route }) {
  const existingBuilding = route.params?.building || null;

  const [buildingName, setBuildingName] = useState(
    existingBuilding ? existingBuilding.buildingName : ''
  );
  const [buildingType, setBuildingType] = useState(
    existingBuilding ? String(existingBuilding.buildingType) : ''
  );
  const [location, setLocation] = useState(
    existingBuilding ? existingBuilding.location : ''
  );
  const [buildingArea, setBuildingArea] = useState(
    existingBuilding ? String(existingBuilding.buildingArea) : ''
  );
  const [price, setPrice] = useState(
    existingBuilding ? String(existingBuilding.price) : ''
  );

  // ── CREATE ──────────────────────────────────────────────────
  const handleCreate = () => {
    if (!buildingName || !buildingType || !location || !buildingArea) {
      Alert.alert('Perhatian', 'Semua field harus diisi!');
      return;
    }
    if (buildingType !== '1' && buildingType !== '2') {
      Alert.alert('Perhatian', 'Building Type harus 1 (Apartment) atau 2 (House)');
      return;
    }

    const body = {
      buildingName,
      buildingType,
      location,
      buildingArea: parseInt(buildingArea),
      // price dihitung otomatis di backend
    };

    fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(res => {
        if (res.status === 201) return res.json();
        throw new Error('Gagal membuat data');
      })
      .then(() => {
        Alert.alert('Sukses', 'Data berhasil ditambahkan!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      })
      .catch(err => Alert.alert('Error', err.message));
  };

  // ── DELETE ──────────────────────────────────────────────────
  const handleDelete = () => {
    if (!existingBuilding) {
      Alert.alert('Info', 'Tidak ada data yang dipilih untuk dihapus.');
      return;
    }
    Alert.alert(
      'Konfirmasi Hapus',
      `Yakin ingin menghapus "${existingBuilding.buildingName}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            fetch(`${BASE_URL}/${existingBuilding.idBuilding}`, { method: 'DELETE' })
              .then(res => {
                if (res.ok) {
                  Alert.alert('Sukses', 'Data berhasil dihapus!', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                  ]);
                } else {
                  Alert.alert('Error', 'Gagal menghapus data.');
                }
              })
              .catch(() => Alert.alert('Error', 'Koneksi gagal.'));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header dengan back arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>In The House Apps</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>

        {/* Building Name */}
        <Text style={styles.label}>Building Name</Text>
        <TextInput
          style={styles.input}
          value={buildingName}
          onChangeText={setBuildingName}
          placeholder=""
        />

        {/* Building Type */}
        <Text style={styles.label}>Building Type</Text>
        <TextInput
          style={styles.input}
          value={buildingType}
          onChangeText={setBuildingType}
          placeholder=""
          keyboardType="numeric"
        />

        {/* Location */}
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder=""
        />

        {/* Building Area */}
        <Text style={styles.label}>Building Area</Text>
        <TextInput
          style={styles.input}
          value={buildingArea}
          onChangeText={setBuildingArea}
          placeholder=""
          keyboardType="numeric"
        />

        {/* Price */}
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder=""
          keyboardType="numeric"
          editable={false}  // readonly, dihitung otomatis
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.btnCreate, existingBuilding && styles.btnDisabled]} 
            onPress={handleCreate}
            disabled={existingBuilding !== null}
          >
            <Text style={[styles.btnCreateText, existingBuilding && styles.btnDisabledText]}>+ Add Data</Text>
          </TouchableOpacity>
          {existingBuilding && (
            <TouchableOpacity style={styles.btnDelete} onPress={handleDelete}>
              <Text style={styles.btnDeleteText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  backBtn: { marginRight: 10 },
  backArrow: { fontSize: 18, color: '#333' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },

  form: { padding: 18 },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222',
    marginTop: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 28,
    gap: 10,
  },
  btnCreate: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    paddingVertical: 11,
    alignItems: 'center',
  },
  btnCreateText: { color: '#333', fontWeight: '600', fontSize: 13 },
  btnDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
  btnDisabledText: {
    color: '#999',
  },

  btnDelete: {
    flex: 1,
    backgroundColor: '#e53935',
    borderRadius: 4,
    paddingVertical: 11,
    alignItems: 'center',
  },
  btnDeleteText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});