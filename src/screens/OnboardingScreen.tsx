import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const images = [
  require('../../assets/correct_agua.png'),
  require('../../assets/correct_botiquin1.png'),
  require('../../assets/correct_cuchilla.png'),
  require('../../assets/correct_linterna.png'),
  require('../../assets/correct_mantas.png'),
  require('../../assets/correct_noperecibles.png'),
  require('../../assets/correct_radio.png'),
  require('../../assets/correct_utiles.png'),
  require('../../assets/correct_agua.png'),
  require('../../assets/correct_cuchilla.png'),
  require('../../assets/correct_linterna.png'),
  require('../../assets/correct_mantas.png'),
  require('../../assets/correct_noperecibles.png'),
  require('../../assets/correct_radio.png'),

];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const fallAnimations = images.map(() => useRef(new Animated.Value(-200)).current);

  const handleDone = () => {
    navigation.navigate('GameScreen');
  };

  const handleSkip = () => {
    navigation.navigate('GameScreen');
  };

  useEffect(() => {
    const startAnimations = () => {
      Animated.stagger(200, fallAnimations.map(anim =>
        Animated.timing(anim, {
          toValue: screenHeight - 400, // Ajusta la posición final para que caigan en la mochila
          duration: 1001,
          useNativeDriver: true,
        })
      )).start();
    };

    startAnimations();
  }, []);

  const renderFallingImages = () => {
    const positions = [
      { left: screenWidth*0.5 - 230, top: -100 },  // Posición para la primera imagen
      { left: screenWidth*0.5 - 230, top: -200 },  // Posición para la segunda imagen
      { left: screenWidth*0.5 - 230, top: 0}, // Posición para la tercera imagen
      { left: screenWidth*0.5 - 200, top: 50 }, // Posición para la cuarta imagen
      { left: screenWidth*0.5 - 100, top: 50 },  // Posición para la quinta imagen
      { left: screenWidth*0.5 + 1, top: 50 }, // Posición para la sexta imagen
      { left: screenWidth*0.5 + 70, top: -40 }, // Posición para la séptima imagen
      { left: screenWidth*0.5 + 80, top: -120 }, // Posición para la octava imagen
      { left: screenWidth*0.5 - 220, top: -320 },  // Posición para la primera imagen
      { left: screenWidth*0.5 - 120, top: -360}, // Posición para la tercera imagen
      { left: screenWidth*0.5 - 35, top: -360 }, // Posición para la cuarta imagen
      { left: screenWidth*0.5 + 50, top: -330 },  // Posición para la quinta imagen
      { left: screenWidth*0.5 + 60, top: -250 }, // Posición para la sexta imagen
      { left: screenWidth*0.5 + 60, top: -180 }, // Posición para la séptima imagen
    
    ];

    return images.map((image, index) => {
      const { left, top } = positions[index];
      return (
        <Animated.Image
          key={index}
          source={image}
          style={[
            styles.fallingImage,
            { transform: [{ translateY: fallAnimations[index] }], left, top },
          ]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            image: <LottieView source={require('../../assets/paso1.json')} autoPlay loop style={styles.animation} />,
            title: '¡PREPÁRATE PARA SER UN SUPERHÉROE!',
            subtitle: '',
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.animationContainer}>
                {renderFallingImages()}
                <Image
                  source={require('../../assets/bag.png')} // Asegúrate de que la ruta sea correcta
                  style={styles.mochilaImage}
                />
              </View>
            ),
            title: 'Recuerda',
            subtitle: 'Ahora te convertirás en un superhéroe. Aprende a identificar los elementos importantes.',
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
          {
            backgroundColor: '#fff',
            image: <LottieView source={require('../../assets/paso2.json')} autoPlay loop style={styles.animation} />,
            title: '',
            subtitle: 'Arrastra los elementos correctos a la mochila de emergencias. ¡Diviértete!.',
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
        ]}
        onDone={handleDone}
        onSkip={handleSkip}
        showSkip
        bottomBarColor="#7ed957"
        bottomBarHeight={60}
        skipLabel="Saltar"
        doneLabel="¡Jugar!"
        bottomBarContainerStyles={styles.bottomBarContainer}
      />
      <View style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animationContainer: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.8,
    position: 'relative',
    alignItems: 'center',
  },
  fallingImage: {
    width: 70,
    height: 70,
    position: 'absolute',
  },
  mochilaImage: {
    width: 350,
    height: 350,
    position: 'absolute',
    bottom: screenWidth *0.45,
    zIndex: -1, // Asegúrate de que las imágenes caigan sobre la mochila
  },
  animation: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    borderRadius: 10,
    marginBottom: 20,
    bottom:100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    bottom: 120,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    bottom: 180,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  bottomBar: {
    height: 90,
  },
});

export default OnboardingScreen;
