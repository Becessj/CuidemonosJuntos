import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Componente de OnboardingPrompt
const OnboardingPrompt = ({ visible, onClose, isFirstPrompt }) => {
  const navigation = useNavigation();

  const handleNo = () => {
    onClose();
    if (isFirstPrompt) {
      // Si es la primera vez, muestra un nuevo modal con título e imagen
      setSecondPromptVisible(true);
    } else {
      // Si no es la primera vez, continua al juego
      navigation.navigate('GameScreen');
    }
  };

  const handleYes = () => {
    onClose();
    // Si acepta en la primera ocasión, navega a OnboardingScreen
    navigation.navigate('OnboardingScreen');
  };

  // Estado para controlar la visibilidad del segundo modal
  const [secondPromptVisible, setSecondPromptVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      setSecondPromptVisible(false); // Ocultar el segundo modal cuando el primer modal se cierra
    }
  }, [visible]);

  return (
    <>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>¡Hola, amigo!</Text>
            <Text style={styles.message}>¿Te gustaría aprender cómo jugar antes de empezar?</Text>

            <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={handleYes}>
              <Text style={styles.buttonText}>¡Sí, enséñame!</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.noButton]} onPress={handleNo}>
              <Text style={styles.buttonText}>No, ¡ya sé!</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Segundo Modal con título, imagen y texto */}
      <Modal
        transparent={true}
        visible={secondPromptVisible}
        animationType="slide"
        onRequestClose={() => setSecondPromptVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Información Adicional</Text>
            <Image source={require('../../assets/linterna.png')} style={styles.image} />
            <Text style={styles.message}>Aquí tienes más información antes de comenzar.</Text>

            <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={() => navigation.navigate('GameScreen')}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setSecondPromptVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#ffeb3b',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#4caf50',
  },
  noButton: {
    backgroundColor: '#f44336',
  },
  continueButton: {
    backgroundColor: '#2196F3', // Color para el botón de continuar
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {

    position: 'absolute',
    top: 1, // Ajusta la distancia desde la parte superior
    right: 10, // Ajusta la distancia desde la derecha
    backgroundColor: 'transparent', // O el color que desees
    zIndex: 1, //
  },
  closeButtonText: {
    fontSize: 24,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default OnboardingPrompt;
