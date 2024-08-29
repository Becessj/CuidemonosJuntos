import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Button, Switch, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';


const ChecklistScreen = ({ route }) => {
  const { title } = route.params;
  const [checklist, setChecklist] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const checklists = {
    'Artículos generales por familia': [
      { id: '1', text: 'Agua embotellada', completed: false },
      { id: '2', text: 'Alimentos no perecederos', completed: false },
    ],
    'Artículos básicos por persona para 24 horas': [
      { id: '3', text: 'Ropa', completed: false },
      { id: '4', text: 'Comida', completed: false },
    ],
    'Según edades': [
      { id: '5', text: 'Pañales para bebés', completed: false },
      { id: '6', text: 'Juguetes para niños', completed: false },
    ],
    'Necesidades específicas': [
      { id: '7', text: 'Medicamentos', completed: false, expirationDate: null },
      { id: '8', text: 'Lentes de contacto', completed: false, expirationDate: null },
    ],
    'Otros': [
      { id: '9', text: 'Linterna', completed: false },
      { id: '10', text: 'Baterías', completed: false },
    ],
    'Otros 2': [
      { id: '11', text: 'Linterna', completed: false },
      { id: '12', text: 'Baterías', completed: false },
    ],
  };

  useEffect(() => {
    const loadChecklist = async () => {
      const savedChecklist = await AsyncStorage.getItem(title);
      if (savedChecklist) {
        setChecklist(JSON.parse(savedChecklist));
      } else {
        setChecklist(checklists[title] || []);
      }
    };
    loadChecklist();
  }, [title]);

  const toggleItem = (index) => {
    setChecklist(prevChecklist => {
      const newChecklist = [...prevChecklist];
      const item = newChecklist[index];
      item.completed = !item.completed;

      // Eliminar la fecha de vencimiento si el switch está desactivado
      if (!item.completed) {
        item.expirationDate = null;
      }

      AsyncStorage.setItem(title, JSON.stringify(newChecklist));
      return newChecklist;
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    if (currentItemIndex !== null) {
      setChecklist(prevChecklist => {
        const newChecklist = [...prevChecklist];
        newChecklist[currentItemIndex].expirationDate = currentDate.toISOString();
        AsyncStorage.setItem(title, JSON.stringify(newChecklist));
        return newChecklist;
      });
    }
  };

  const openDatePicker = (index) => {
    setCurrentItemIndex(index);
    setDate(checklist[index].expirationDate ? new Date(checklist[index].expirationDate) : new Date());
    setShowDatePicker(true);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.checklistItem}>
      <Text style={styles.checklistText}>{item.text}</Text>
      {title === 'Necesidades específicas' && (
        <>
          <TouchableOpacity onPress={() => openDatePicker(index)}>
            <Text style={styles.dateText}>
              {item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : 'Seleccionar fecha'}
            </Text>
          </TouchableOpacity>
        </>
      )}
      <Switch
        value={item.completed}
        onValueChange={() => toggleItem(index)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={checklist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <FlatList
              data={checklist}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  checklistText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ChecklistScreen;
