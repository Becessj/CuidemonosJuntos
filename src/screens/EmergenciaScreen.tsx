import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from 'react-native';
import * as Linking from 'expo-linking';
import BackgroundWrapper2 from './BackgroundWrapper2';
import { DATAEMERGENCIA } from '../data/dataemergencia'; // Ajusta la ruta según tu estructura de carpetas

const EmergenciaScreen = () => {
  // Función para realizar la llamada
  const makeCall = (number: string) => {
    const url = `tel:${number}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No se pudo realizar la llamada');
    });
  };

  return (
    <BackgroundWrapper2>
    <View style={styles.container}>
      <Text style={styles.title}>Números de Emergencia</Text>
      <FlatList
        data={DATAEMERGENCIA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => makeCall(item.number)}
          >
            <Image source={item.illustration} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.itemNumber}>{item.number}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent} // Estilo para el contenido de la lista
      />
    </View>
    </BackgroundWrapper2>
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
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemNumber: {
    fontSize: 30,
    color: '#007BFF',
    fontWeight: 'bold'
  },
  listContent: {
    paddingBottom: 100, // Ajusta este valor según el tamaño de tu barra de pestañas
  },
});

export default EmergenciaScreen;
