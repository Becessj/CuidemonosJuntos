import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundWrapper2 from './BackgroundWrapper2';

const HomeBagGame = () => {
  const navigation = useNavigation();

  return (
    <BackgroundWrapper2>
      <View style={styles.container}>
      <Text style={styles.header}>Diviértete con estos elementos</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OnboardingScreen')}>
            <Image source={require('../../assets/mochilaninos.png')} style={styles.image} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>¿Quieres jugar?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BagScreen')}>
            <Image source={require('../../assets/mochilaadultos.png')} style={styles.image} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>¿Estás preparado ante un SISMO?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReserveBoxScreen')}>
            <Image source={require('../../assets/home3.png')} style={styles.image} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Caja de Reserva</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundWrapper2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#dde433',
    borderRadius: 10,
    padding:5
   
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  titleContainer: {
    backgroundColor: '#c9d226', // Fondo gris
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign:'center'
  },
});

export default HomeBagGame;
