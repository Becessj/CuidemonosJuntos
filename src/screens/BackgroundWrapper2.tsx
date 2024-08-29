import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const BackgroundWrapper = ({ children }) => {
  return (
    <View style={styles.background}>
      <View style={styles.circle} />
      <View style={styles.overlay}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  circle: {
    width: screenWidth * 2 ,  // Doble del ancho de la pantalla para asegurar que solo se vea la mitad del círculo
    height: screenWidth,      // La altura será igual al ancho para que sea un círculo perfecto
    borderRadius: screenWidth, // Esto asegura que sea un círculo completo
    backgroundColor: '#7ed957',
    position: 'absolute',
    top: -screenWidth + 300,    // Mueve el círculo hacia arriba para que solo se vea la mitad
    left: -screenWidth / 10,   // Centra el círculo en la pantalla
  },
  overlay: {
    flex: 1,
    width: '100%',
  },
});

export default BackgroundWrapper;
