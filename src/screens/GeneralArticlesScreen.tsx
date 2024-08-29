import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Button, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import BackgroundWrapper from './BackgroundWrapper';

const categoryImageSource = {
  communication: require('../../assets/comunicacion.png'),
  hygiene: require('../../assets/higiene.png'),
  firstAidKit: require('../../assets/kit.png'),
  miscellaneous: require('../../assets/herramientas.png'),
  pets: require('../../assets/perro.png'),
};

const initialChecklists = {
  Comunicación: [
    { id: '1', text: 'Pilas', completed: false },
    { id: '2', text: 'Linterna a pilas', completed: false },
    { id: '3', text: 'Silbato', completed: false },
    { id: '4', text: 'Lapicero', completed: false },
  ],
  Higiene: [
    { id: '1', text: 'Gel antibacterial', completed: false },
    { id: '2', text: 'Pañitos húmedos', completed: false },
    { id: '3', text: 'Papel higiénico', completed: false },
  ],
  'Botiquín de primeros auxilios': [
    { id: '1', text: 'Preservativos', completed: false },
    { id: '2', text: 'Jeringa', completed: false },
    { id: '3', text: 'Gasas', completed: false },
  ],
  Diversos: [
    { id: '1', text: 'Velas', completed: false },
    { id: '2', text: 'Caja de fósforos', completed: false },
    { id: '3', text: 'Mapa de la zona', completed: false },
  ],
  'Mascotas o perros guía': [
    { id: '1', text: 'Comida de mascotas', completed: false },
    { id: '2', text: 'Agua adicional', completed: false },
  ],
};

const GeneralArticlesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentChecklist, setCurrentChecklist] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');

  const categories = [
    { title: 'Comunicación', image: categoryImageSource.communication },
    { title: 'Higiene', image: categoryImageSource.hygiene },
    { title: 'Botiquín de primeros auxilios', image: categoryImageSource.firstAidKit },
    { title: 'Diversos', image: categoryImageSource.miscellaneous },
    { title: 'Mascotas o perros guía', image: categoryImageSource.pets },
  ];

  useEffect(() => {
    const initializeChecklists = async () => {
      for (const title in initialChecklists) {
        const savedChecklist = await AsyncStorage.getItem(title);
        if (!savedChecklist) {
          await AsyncStorage.setItem(title, JSON.stringify(initialChecklists[title]));
        }
      }
    };
    initializeChecklists();
  }, []);

  const openModal = async (title: string) => {
    setCurrentTitle(title);
    const savedChecklist = await AsyncStorage.getItem(title);
    if (savedChecklist) {
      setCurrentChecklist(JSON.parse(savedChecklist));
    } else {
      setCurrentChecklist(initialChecklists[title]);
    }
    setModalVisible(true);
  };

  const toggleItem = (index: number) => {
    setCurrentChecklist((prevChecklist) => {
      const newChecklist = [...prevChecklist];
      newChecklist[index].completed = !newChecklist[index].completed;
      AsyncStorage.setItem(currentTitle, JSON.stringify(newChecklist)); // Save updated checklist
      return newChecklist;
    });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openModal(item.title)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Image source={item.image} style={styles.cardImage} />
      </View>
    </TouchableOpacity>
  );

  const renderChecklistItem = ({ item, index }) => (
    <View style={styles.checklistItem}>
      <Text style={styles.checklistText}>{item.text}</Text>
      <Switch
        value={item.completed}
        onValueChange={() => toggleItem(index)}
      />
    </View>
  );

  return (
    <BackgroundWrapper>
    <View style={styles.container}>
      <Text style={styles.title}>Artículos generales por familia</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.title}
        numColumns={2} // Mostrar en dos columnas
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentTitle}</Text>
            <FlatList
              data={currentChecklist}
              renderItem={renderChecklistItem}
              keyExtractor={(item) => item.id}
            />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'column', // Cambiar a columna
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
  },
  cardImage: {
    width: 60, // Ajustar tamaño según sea necesario
    height: 60, // Ajustar tamaño según sea necesario
    borderRadius: 30,
    marginTop: 10, // Separar de texto
  },
  cardContent: {
    flexDirection: 'column', // Cambiar a columna
    alignItems: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Centrado del texto
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
});

export default GeneralArticlesScreen;
