import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundWrapper2 from './BackgroundWrapper2';
import { ScrollView } from 'react-native-gesture-handler';
import OnboardingPrompt from './OnboardingPrompt';

const HomeBagGame = () => {
  const navigation = useNavigation();
  const bounceValue = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setIsModalVisible] = useState(false); // Cambiado a false por defecto

  useEffect(() => {
    // Animación de rebote
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10, // Mueve la mano hacia arriba
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0, // Regresa a la posición original
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceValue]);

  // Función para mostrar el modal de onboarding
  const showOnboardingPrompt = () => {
    setIsModalVisible(true);
  };

  return (
    <BackgroundWrapper2>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>¡PREPARATE YA!</Text>

          <TouchableOpacity style={styles.button} onPress={showOnboardingPrompt}>
            <View style={styles.titleContainer1}>
              <View style={styles.titleContainer}>
                <Image source={require('../../assets/mochilaninos.png')} style={styles.image} />
                <Text style={styles.title}>Aprende Jugando</Text>
              </View>
              {/* Icono de la mano con animación */}
              <Animated.View style={{ transform: [{ translateY: bounceValue }] }}>
                <Icon name="hand-o-up" size={30} color="red" style={styles.icon} />
              </Animated.View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BagScreen')}>
            <View style={styles.titleContainer1}>
              <View style={styles.titleContainer}>
                <Image source={require('../../assets/mochilaadultos.png')} style={styles.image} />
                <Text style={styles.title}>¿Preparaste tu MOCHILA?</Text>
              </View>
              {/* Icono de la mano con animación */}
              <Animated.View style={{ transform: [{ translateY: bounceValue }] }}>
                <Icon name="hand-o-up" size={30} color="red" style={styles.icon} />
              </Animated.View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReserveBoxScreen')}>
            <View style={styles.titleContainer1}>
              <View style={styles.titleContainer}>
                <Image source={require('../../assets/home3.png')} style={styles.image} />
                <Text style={styles.title}>Caja de Reserva</Text>
              </View>
              {/* Icono de la mano con animación */}
              <Animated.View style={{ transform: [{ translateY: bounceValue }] }}>
                <Icon name="hand-o-up" size={30} color="red" style={styles.icon} />
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <OnboardingPrompt visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </BackgroundWrapper2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -25,
  },
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 70,
    width: 1000,
    textAlign: 'center',
    // backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    position: 'absolute',
    right: -30,
    top: -55,
  },
  titleContainer: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  titleContainer1: {
    backgroundColor: '#eaeaea',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
  },
  icon: {
    marginTop: 10, // Espacio entre el texto y el ícono
  },
});

export default HomeBagGame;
