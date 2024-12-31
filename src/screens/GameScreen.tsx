import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withSpring } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const OnboardingScreen = () => {
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  // Maneja la navegación y guarda el estado del onboarding
  const handleNextPage = async () => {
    if (translateX.value >= 2 * width) {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true'); // Marcar que el onboarding ya se completó
      navigation.replace('MyAddress'); // Ir a la pantalla de dirección
    } else {
      translateX.value += width;
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedStyle]}>
        <View style={styles.page}>
          <Image source={require('../../assets/page1.jpg')} style={styles.image} />
          <Text style={styles.text}>Spend money abroad, and track your expenses</Text>
        </View>
        <View style={styles.page}>
          <Image source={require('../../assets/page2.jpg')} style={styles.image} />
          <Text style={styles.text}>Save and organize all your expenses in one place</Text>
        </View>
        <View style={styles.page}>
          <Image source={require('../../assets/page3.jpg')} style={styles.image} />
          <Text style={styles.text}>Start planning your next trip with ease</Text>
        </View>
      </Animated.View>
      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((index) => {
            const dotStyle = useAnimatedStyle(() => {
              const scale = withSpring(translateX.value === index * width ? 1.5 : 1);
              const opacity = interpolate(
                translateX.value,
                [index * width - width, index * width, index * width + width],
                [0.3, 1, 0.3]
              );
              return { transform: [{ scale }], opacity };
            });
            return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
          })}
        </View>
        <TouchableOpacity onPress={handleNextPage} style={styles.button}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slider: {
    flexDirection: 'row',
    width: width * 3,
    height: '75%',
  },
  page: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#555',
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default OnboardingScreen;
