import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import DeliveryToggle from './DeliveryToggle';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const OrdersHeader = () => {
  const [note, setNote] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tempNote, setTempNote] = useState<string>('');

  const handleChangeAddress = () => {
    console.log('Change Address button pressed');
  };

  const handleAddNote = () => {
    setModalVisible(true);
  };

  const saveNote = () => {
    setNote(tempNote);
    setModalVisible(false);
    setTempNote('');
  };

  return (
    <View>
      {/* Delivery Toggle */}
      <DeliveryToggle />

      {/* Address Section */}
      <Text style={styles.headerText}>Delivery Address</Text>
      <Text style={styles.addressTitle}>Anas Ibnamar</Text>
      <Text style={styles.addressDetails}>
        Route Sidi Yahya, Hay el Messaoudi Villa 23
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleChangeAddress}>
          <Ionicons name="create-outline" size={16} color="#242424" />
          <Text style={styles.iconButtonText}>Edit Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleAddNote}>
          <MaterialIcons name="note-add" size={16} color="#242424" />
          <Text style={styles.iconButtonText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      {/* Display Note */}
      {note && <Text style={styles.noteText}>Note: {note}</Text>}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Note Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Note</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your note here"
              value={tempNote}
              onChangeText={setTempNote}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#A2A2A2" />
              <Button title="Save" onPress={saveNote} color="#C67C4E" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrdersHeader;

const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 28,
    marginTop: 28,
    color: '#242424',
    fontSize: 18,
    fontFamily: 'Sora-SemiBold',
  },
  addressTitle: {
    marginHorizontal: 28,
    marginTop: 12,
    color: '#242424',
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
    marginBottom: 8,
  },
  addressDetails: {
    marginHorizontal: 28,
    color: '#A2A2A2',
    fontSize: 12,
    fontFamily: 'Sora-SemiBold',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 28,
    marginBottom: 12,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  iconButtonText: {
    color: '#242424',
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
    marginLeft: 8,
  },
  noteText: {
    marginHorizontal: 28,
    marginTop: 8,
    color: '#A2A2A2',
    fontSize: 12,
    fontFamily: 'Sora-Regular',
  },
  divider: {
    marginHorizontal: 48,
    borderBottomWidth: 1,
    borderColor: '#D1D1D1',
    marginVertical: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Sora-SemiBold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    fontFamily: 'Sora-Regular',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
