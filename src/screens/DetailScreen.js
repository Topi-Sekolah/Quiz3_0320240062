import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert
} from 'react-native';
import { getHewanById, updateHewan, deleteHewan, createHewan } from '../api/api';

export default function DetailScreen({ route, navigation }) {
  const { id, mode, data: itemData } = route.params || {};
  const isEditMode = mode === 'edit';
  const isAddMode = mode === 'add';

  const [pemilik, setPemilik] = useState('');
  const [jenis, setJenis] = useState('');
  const [kandang, setKandang] = useState('');
  const [berat, setBerat] = useState('');

  useEffect(() => {
    if (isEditMode && itemData) {
      // Load dari data yang dikirim via navigation
      setPemilik(itemData.pemilikHewan || '');
      setJenis(itemData.jenisHewan || '');
      setKandang(itemData.kandangHewan || '');
      setBerat(String(itemData.beratHewan || ''));
    }
  }, [itemData]);

  const handleAddData = async () => {
    if (!pemilik || !jenis || !kandang || !berat) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }
    try {
      await createHewan({
        pemilikHewan: pemilik,
        jenisHewan: jenis,
        kandangHewan: kandang,
        beratHewan: parseInt(berat),
      });
      Alert.alert('Success', 'Data berhasil ditambahkan');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Gagal menambahkan data');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteHewan(id);
      Alert.alert('Success', 'Data berhasil dihapus');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Gagal menghapus data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Farm Apps_XXX</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Pemilik</Text>
        <TextInput
          style={styles.input}
          value={pemilik}
          onChangeText={setPemilik}
          placeholder="Nama pemilik"
        />

        <Text style={styles.label}>Jenis Hewan</Text>
        <TextInput
          style={styles.input}
          value={jenis}
          onChangeText={setJenis}
          placeholder="Sapi/Domba/Kambing"
          editable={!isEditMode}
        />

        <Text style={styles.label}>Kandang</Text>
        <TextInput
          style={styles.input}
          value={kandang}
          onChangeText={setKandang}
          placeholder="Nomor kandang"
        />

        <Text style={styles.label}>Berat (kg)</Text>
        <TextInput
          style={styles.input}
          value={berat}
          onChangeText={setBerat}
          placeholder="Berat dalam kg"
          keyboardType="numeric"
          editable={!isEditMode}
        />

        {isEditMode && itemData && (
          <>
            <Text style={styles.label}>Harga (Auto-calculated)</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={`Rp ${itemData.hargaHewan?.toLocaleString('id-ID')}`}
              editable={false}
            />
          </>
        )}

        {isAddMode ? (
          <TouchableOpacity style={styles.btnAdd} onPress={handleAddData}>
            <Text style={styles.btnText}>+ Add Data</Text>
          </TouchableOpacity>
        ) : isEditMode ? (
          <TouchableOpacity style={styles.btnDelete} onPress={handleDelete}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backBtn: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  btnAdd: {
    backgroundColor: '#4A90D9',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  btnDelete: {
    backgroundColor: '#FF0000',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
